import { describe, it, expect } from 'vitest';
import { createCrs, getMapBounds, type MapConfig } from './mapUtils';
import L from 'leaflet';

describe('mapUtils', () => {
  const config: MapConfig = {
    mapExtent: [0, -8192, 8192, 0],
    mapMinZoom: 1,
    mapMaxZoom: 6,
    mapMaxResolution: 0.25,
    tileExtent: [0, -8192, 8192, 0]
  };

  it('should create CRS with correct transformation', () => {
    const crs = createCrs(config);
    expect(crs.transformation).toBeDefined();
    // Simple verification of transformation logic
    const point = L.point(0, 0);
    const transformed = crs.transformation.transform(point, 1);
    expect(transformed.x).toBe(0);
    expect(transformed.y).toBe(0);
  });

  it('should scale correctly based on zoom', () => {
    const crs = createCrs(config);
    // mapMinResolution = 2^6 * 0.25 = 16
    // scale(r) = 2^r / 16
    expect(crs.scale(4)).toBe(Math.pow(2, 4) / 16); // 16/16 = 1
    expect(crs.scale(1)).toBe(Math.pow(2, 1) / 16); // 2/16 = 0.125
  });

  it('should calculate zoom correctly from scale', () => {
    const crs = createCrs(config);
    // zoom(scale) = log2(scale * 16)
    expect(crs.zoom(1)).toBe(4);
    expect(crs.zoom(0.125)).toBe(1);
  });

  it('should calculate map bounds correctly', () => {
    const crs = createCrs(config);
    const bounds = getMapBounds(crs, config);
    
    // config.mapExtent: [0, -8192, 8192, 0]
    // crs.unproject(L.point(8192, 0)) -> Top Right
    // crs.unproject(L.point(0, -8192)) -> Bottom Left
    
    expect(bounds).toHaveLength(2);
    expect(bounds[0].lat).toBeCloseTo(0);
    expect(bounds[0].lng).toBeCloseTo(8192);
    expect(bounds[1].lat).toBeCloseTo(-8192);
    expect(bounds[1].lng).toBeCloseTo(0);
  });
});
