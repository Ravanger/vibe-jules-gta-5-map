import type { CategoryDefinition } from '../types';
import storage from './storage';

/**
 * The inner record uses the marker index (as a string) as the key.
 */
export type CategoryProgress = Record<string, boolean>;

export interface ProgressState {
  version: number;
  collected: Record<string, CategoryProgress>;
  settings: {
    hideCollected: boolean;
    visibleCategories: Record<string, boolean>;
  };
}

export interface ProgressBackend {
  load(): ProgressState | null;
  save(state: ProgressState): void;
}

/**
 * A backend implementation that uses our central storage utility.
 */
export class AppStorageBackend implements ProgressBackend {
  private readonly key: string;

  constructor(key = 'gta5map:progress:v2') {
    this.key = key;
  }

  load(): ProgressState | null {
    return storage.get<ProgressState>(this.key);
  }

  save(state: ProgressState): void {
    storage.set(this.key, state);
  }
}

type ProgressListener = (state: ProgressState) => void;

export class UserProgressStore {
  private state: ProgressState;
  private readonly totals: Record<string, number> = {};
  private readonly backend: ProgressBackend;
  private readonly listeners: Set<ProgressListener> = new Set();

  constructor(categories: CategoryDefinition[], backend: ProgressBackend) {
    this.backend = backend;
    categories.forEach(cat => {
      this.totals[cat.id] = cat.markers.length;
    });
    this.state = this.initialiseState(categories, backend.load());
    this.backend.save(this.state);
  }

  private initialiseState(categories: CategoryDefinition[], loaded: ProgressState | null): ProgressState {
    const next: ProgressState = {
      version: 2,
      collected: {},
      settings: {
        hideCollected: loaded?.settings?.hideCollected ?? false,
        visibleCategories: loaded?.settings?.visibleCategories ?? {}
      }
    };

    const source = loaded?.collected ?? {};

    categories.forEach(cat => {
      const existing = source[cat.id] ?? {};
      next.collected[cat.id] = { ...existing };
      
      // If visibility wasn't saved, use the default from the category definition
      if (next.settings.visibleCategories[cat.id] === undefined) {
        next.settings.visibleCategories[cat.id] = cat.visible;
      }
    });

    return next;
  }

  private emit(): void {
    const snapshot = this.getState();
    this.listeners.forEach(listener => listener(snapshot));
  }

  getState(): ProgressState {
    // Deep clone to avoid external mutation
    return JSON.parse(JSON.stringify(this.state));
  }

  isCollected(categoryId: string, index: number): boolean {
    const cat = this.state.collected[categoryId];
    if (!cat) return false;
    return !!cat[String(index)];
  }

  setCollected(categoryId: string, index: number, collected: boolean): void {
    let cat = this.state.collected[categoryId];
    if (!cat) {
      cat = {};
      this.state.collected[categoryId] = cat;
    }
    
    const key = String(index);
    if (!!cat[key] === collected) return;
    
    if (collected) {
      cat[key] = true;
    } else {
      delete cat[key];
    }

    this.backend.save(this.state);
    this.emit();
  }

  isHideCollected(): boolean {
    return this.state.settings.hideCollected;
  }

  setHideCollected(hide: boolean): void {
    if (this.state.settings.hideCollected === hide) return;
    this.state.settings.hideCollected = hide;
    this.backend.save(this.state);
    this.emit();
  }

  isCategoryVisible(categoryId: string): boolean {
    return this.state.settings.visibleCategories[categoryId] ?? false;
  }

  setCategoryVisible(categoryId: string, visible: boolean): void {
    if (this.state.settings.visibleCategories[categoryId] === visible) return;
    this.state.settings.visibleCategories[categoryId] = visible;
    this.backend.save(this.state);
    this.emit();
  }

  clearCategory(categoryId: string): void {
    if (this.state.collected[categoryId]) {
      this.state.collected[categoryId] = {};
      this.backend.save(this.state);
      this.emit();
    }
  }

  clearAll(): void {
    let changed = false;
    for (const key in this.state.collected) {
      if (Object.keys(this.state.collected[key]).length > 0) {
        this.state.collected[key] = {};
        changed = true;
      }
    }
    if (changed) {
      this.backend.save(this.state);
      this.emit();
    }
  }

  getCategoryProgress(categoryId: string): { collected: number; total: number } {
    const cat = this.state.collected[categoryId] ?? {};
    const total = this.totals[categoryId] ?? 0;
    const collected = Object.values(cat).filter(v => v === true).length;
    return { collected, total };
  }

  getOverallProgress(): { collected: number; total: number } {
    let collectedCount = 0;
    let totalCount = 0;
    for (const key in this.totals) {
      totalCount += this.totals[key];
      const cat = this.state.collected[key] ?? {};
      collectedCount += Object.values(cat).filter(v => v === true).length;
    }
    return { collected: collectedCount, total: totalCount };
  }

  subscribe(listener: ProgressListener): () => void {
    this.listeners.add(listener);
    // Immediately notify with current state so subscribers can render initial UI
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }
}

