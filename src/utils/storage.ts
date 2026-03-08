import store from 'store';

/**
 * A simple storage interface that abstracts away the underlying storage mechanism.
 * Uses store.js for robust cross-browser support and automatic serialization.
 */
export default {
  /**
   * Saves a value to storage.
   */
  set(key: string, value: any): void {
    try {
      store.set(key, value);
    } catch (e) {
      console.warn(`Failed to save to storage for key "${key}":`, e);
    }
  },

  /**
   * Retrieves a value from storage.
   */
  get<T>(key: string): T | null {
    try {
      const value = store.get(key);
      return value === undefined ? null : value;
    } catch (e) {
      console.warn(`Failed to read from storage for key "${key}":`, e);
      return null;
    }
  },

  /**
   * Removes an item from storage.
   */
  remove(key: string): void {
    store.remove(key);
  },

  /**
   * Clears all items from storage handled by store.js.
   */
  clearAll(): void {
    store.clearAll();
  }
};
