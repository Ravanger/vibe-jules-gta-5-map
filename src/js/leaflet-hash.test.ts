import { describe, it, expect } from 'vitest';
import L from 'leaflet';
import './leaflet-hash';

describe('L.Hash', () => {
  it('should parse hash correctly', () => {
    const hash = '#4/-123.45/678.90';
    const parsed = (L as any).Hash.parseHash(hash);
    
    expect(parsed).toBeDefined();
    expect(parsed.zoom).toBe(4);
    expect(parsed.center.lat).toBe(-123.45);
    expect(parsed.center.lng).toBe(678.90);
  });

  it('should return false for invalid hash', () => {
    expect((L as any).Hash.parseHash('#invalid')).toBe(false);
    expect((L as any).Hash.parseHash('#4/-123.45')).toBe(false); // Missing lng
    expect((L as any).Hash.parseHash('#zoom/lat/lng')).toBe(false); // Non-numeric
  });

  it('should format hash correctly', () => {
    const mockMap = {
      getCenter: () => ({ lat: -123.456, lng: 789.012 }),
      getZoom: () => 4
    };
    
    const formatted = (L as any).Hash.formatHash(mockMap as any);
    // Precision for zoom 4: log2(4)/LN2 is about 2
    expect(formatted).toMatch(/^#4\/-123.4[0-9]*\/789.0[0-9]*$/);
  });
});
