import { describe, it, expect } from 'vitest';
import markers from './markers.json';

describe('Markers Data', () => {
  it('should have an array of markers', () => {
    expect(Array.isArray(markers)).toBe(true);
    expect(markers.length).toBeGreaterThan(0);
  });

  it('each marker should have required properties', () => {
    markers.forEach((marker, index) => {
      expect(marker, `Marker at index ${index} missing lat`).toHaveProperty('lat');
      expect(marker, `Marker at index ${index} missing lng`).toHaveProperty('lng');
      expect(marker, `Marker at index ${index} missing icon`).toHaveProperty('icon');
      expect(marker, `Marker at index ${index} missing popupHtml`).toHaveProperty('popupHtml');

      expect(typeof marker.lat).toBe('number');
      expect(typeof marker.lng).toBe('number');
      // icon can be a number or string
      expect(['number', 'string']).toContain(typeof marker.icon);
      expect(typeof marker.popupHtml).toBe('string');
    });
  });

  it('marker coordinates should be within reasonable bounds', () => {
    // Assuming the map extent is [0, -8192, 8192, 0]
    markers.forEach((marker, index) => {
      expect(marker.lat, `Marker at index ${index} lat out of bounds`).toBeLessThanOrEqual(0);
      expect(marker.lat, `Marker at index ${index} lat out of bounds`).toBeGreaterThanOrEqual(-8192);
      expect(marker.lng, `Marker at index ${index} lng out of bounds`).toBeGreaterThanOrEqual(0);
      expect(marker.lng, `Marker at index ${index} lng out of bounds`).toBeLessThanOrEqual(8192);
    });
  });
});
