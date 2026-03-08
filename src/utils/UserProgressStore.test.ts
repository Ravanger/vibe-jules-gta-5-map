import { describe, it, expect } from 'vitest';
import type { CategoryDefinition, MarkerData } from '../types';
import { AppStorageBackend, UserProgressStore, type ProgressState, type ProgressBackend } from './UserProgressStore';
import storage from './storage';

/**
 * A simple in-memory backend for testing store logic without global side effects.
 */
class MockBackend implements ProgressBackend {
  private state: ProgressState | null;
  constructor(state: ProgressState | null = null) {
    this.state = state;
  }
  load() { return this.state; }
  save(s: ProgressState) { this.state = s; }
}

const makeCategory = (id: string, total: number): CategoryDefinition => {
  const markers: MarkerData[] = new Array(total).fill(null).map((_, idx) => ({
    lat: idx,
    lng: idx,
    popupHtml: `<div>Marker ${idx}</div>`
  }));

  return {
    id,
    name: id,
    group: 'Collectibles',
    iconUrl: '/icon.png',
    markers,
    visible: true
  };
};

describe('UserProgressStore', () => {
  it('initialises with all markers uncollected', () => {
    const backend = new MockBackend();
    const categories = [makeCategory('cat1', 3)];

    const store = new UserProgressStore(categories, backend);

    expect(store.isCollected('cat1', 0)).toBe(false);
    expect(store.isCollected('cat1', 1)).toBe(false);
    expect(store.isCollected('cat1', 2)).toBe(false);

    const { collected, total } = store.getCategoryProgress('cat1');
    expect(collected).toBe(0);
    expect(total).toBe(3);
  });

  it('tracks collected markers and reports progress', () => {
    const backend = new MockBackend();
    const categories = [makeCategory('cat1', 4)];

    const store = new UserProgressStore(categories, backend);
    store.setCollected('cat1', 1, true);
    store.setCollected('cat1', 3, true);

    expect(store.isCollected('cat1', 0)).toBe(false);
    expect(store.isCollected('cat1', 1)).toBe(true);
    expect(store.isCollected('cat1', 3)).toBe(true);

    const catProgress = store.getCategoryProgress('cat1');
    expect(catProgress.collected).toBe(2);
    expect(catProgress.total).toBe(4);

    const overall = store.getOverallProgress();
    expect(overall.collected).toBe(2);
    expect(overall.total).toBe(4);
  });

  it('persists and reloads from backend', () => {
    const backend = new MockBackend();
    const categories = [makeCategory('cat1', 2)];

    const first = new UserProgressStore(categories, backend);
    first.setCollected('cat1', 0, true);

    const baked = backend.load();
    expect(baked).not.toBeNull();

    const second = new UserProgressStore(categories, backend);
    expect(second.isCollected('cat1', 0)).toBe(true);
    expect(second.isCollected('cat1', 1)).toBe(false);
  });

  it('interacts with the real storage utility (AppStorageBackend)', () => {
    const key = 'test:app-storage:v2';
    storage.remove(key); // Start clean
    const backend = new AppStorageBackend(key);
    const categories = [makeCategory('real-cat', 1)];

    const first = new UserProgressStore(categories, backend);
    first.setCollected('real-cat', 0, true);

    const second = new UserProgressStore(categories, backend);
    expect(second.isCollected('real-cat', 0)).toBe(true);

    storage.remove(key);
  });

  it('handles category length changes gracefully', () => {
    const backend = new MockBackend();
    const originalCats = [makeCategory('cat1', 2)];

    const first = new UserProgressStore(originalCats, backend);
    first.setCollected('cat1', 0, true);

    const raw = backend.load();
    expect(raw?.collected.cat1['0']).toBe(true);

    const updatedCats = [makeCategory('cat1', 3)];
    const second = new UserProgressStore(updatedCats, backend);

    expect(second.isCollected('cat1', 0)).toBe(true);
    expect(second.isCollected('cat1', 1)).toBe(false);
    expect(second.isCollected('cat1', 2)).toBe(false);
  });

  it('notifies subscribers on change', () => {
    const backend = new MockBackend();
    const categories = [makeCategory('cat1', 2)];

    const store = new UserProgressStore(categories, backend);
    const events: ProgressState[] = [];

    store.subscribe((state) => {
      events.push(state);
    });

    store.setCollected('cat1', 1, true);

    expect(events.length).toBeGreaterThanOrEqual(2);
    const latest = events[events.length - 1];
    expect(latest.collected.cat1['1']).toBe(true);
  });

  it('manages settings like hideCollected', () => {
    const backend = new MockBackend();
    const categories = [makeCategory('cat1', 2)];

    const store = new UserProgressStore(categories, backend);
    expect(store.isHideCollected()).toBe(false);

    store.setHideCollected(true);
    expect(store.isHideCollected()).toBe(true);

    const second = new UserProgressStore(categories, backend);
    expect(second.isHideCollected()).toBe(true);
  });
});

