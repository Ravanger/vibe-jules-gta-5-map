import { describe, it, expect } from 'vitest';
import { categories } from './categories';

describe('Categories Data', () => {
  it('should have an array of categories', () => {
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
  });

  categories.forEach(category => {
    describe(`Category: ${category.name}`, () => {
      it('should have an ID and markers', () => {
        expect(category).toHaveProperty('id');
        expect(category).toHaveProperty('name');
        expect(Array.isArray(category.markers)).toBe(true);
        expect(category.markers.length).toBeGreaterThan(0);
      });

      it('each marker should have required properties', () => {
        category.markers.forEach((marker: any, index: number) => {
          expect(marker, `Marker at index ${index} missing lat`).toHaveProperty('lat');
          expect(marker, `Marker at index ${index} missing lng`).toHaveProperty('lng');
          
          expect(typeof marker.lat).toBe('number');
          expect(typeof marker.lng).toBe('number');
        });
      });

      it('should have an icon mapping or be using group default', () => {
        // We don't strictly require iconId because it can fallback to group icon
        if (category.iconId) {
          expect(typeof category.iconId).toBe('string');
        }
      });

      it('marker coordinates should be within reasonable bounds', () => {
        category.markers.forEach((marker: any, index: number) => {
          expect(marker.lat, `Marker at index ${index} lat out of bounds`).toBeLessThanOrEqual(100000);
          expect(marker.lat, `Marker at index ${index} lat out of bounds`).toBeGreaterThanOrEqual(-100000);
          expect(marker.lng, `Marker at index ${index} lng out of bounds`).toBeGreaterThanOrEqual(-100000);
          expect(marker.lng, `Marker at index ${index} lng out of bounds`).toBeLessThanOrEqual(100000);
        });
      });
    });
  });
});
