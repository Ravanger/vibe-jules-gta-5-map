import { describe, it, expect, beforeEach } from 'vitest';
import storage from './storage';

describe('storage utility', () => {
  beforeEach(() => {
    storage.clearAll();
  });

  it('sets and gets simple values', () => {
    storage.set('test-string', 'hello');
    expect(storage.get<string>('test-string')).toBe('hello');

    storage.set('test-number', 123);
    expect(storage.get<number>('test-number')).toBe(123);

    storage.set('test-boolean', true);
    expect(storage.get<boolean>('test-boolean')).toBe(true);
  });

  it('sets and gets complex objects (automatic serialization)', () => {
    const obj = { a: 1, b: [1, 2, 3], c: { d: 'test' } };
    storage.set('test-obj', obj);
    
    const retrieved = storage.get<typeof obj>('test-obj');
    expect(retrieved).toEqual(obj);
    expect(retrieved?.c.d).toBe('test');
  });

  it('returns null for non-existent keys', () => {
    expect(storage.get('non-existent')).toBe(null);
  });

  it('removes specific items', () => {
    storage.set('to-remove', 'value');
    expect(storage.get('to-remove')).toBe('value');
    
    storage.remove('to-remove');
    expect(storage.get('to-remove')).toBe(null);
  });

  it('clears all items', () => {
    storage.set('k1', 'v1');
    storage.set('k2', 'v2');
    
    storage.clearAll();
    
    expect(storage.get('k1')).toBe(null);
    expect(storage.get('k2')).toBe(null);
  });

  it('handles null values correctly', () => {
    storage.set('test-null', null);
    expect(storage.get('test-null')).toBe(null);
  });
});
