import { describe, it, expect } from 'vitest';
import { categories } from './categories';
import type { MarkerData } from '../types';

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
        category.markers.forEach((marker: MarkerData, index) => {
          expect(marker, `Marker at index ${index} missing lat`).toHaveProperty('lat');
          expect(marker, `Marker at index ${index} missing lng`).toHaveProperty('lng');
          // icon is optional now as it can be defined by category
          // expect(marker).toHaveProperty('popupHtml'); // Optional depending on usage

          expect(typeof marker.lat).toBe('number');
          expect(typeof marker.lng).toBe('number');
          
          if (marker.icon !== undefined) {
             expect(['number', 'string']).toContain(typeof marker.icon);
          }
        });
      });

      it('marker coordinates should be within reasonable bounds', () => {
        // Assuming the map extent is [0, -8192, 8192, 0]
        category.markers.forEach((marker: MarkerData, index) => {
          expect(marker.lat, `Marker at index ${index} lat out of bounds`).toBeLessThanOrEqual(0);
          expect(marker.lat, `Marker at index ${index} lat out of bounds`).toBeGreaterThanOrEqual(-8192);
          expect(marker.lng, `Marker at index ${index} lng out of bounds`).toBeGreaterThanOrEqual(0);
          expect(marker.lng, `Marker at index ${index} lng out of bounds`).toBeLessThanOrEqual(8192);
        });
      });
    });
  });
});
