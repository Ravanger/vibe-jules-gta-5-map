import L from 'leaflet';

export interface MapConfig {
  mapExtent: [number, number, number, number];
  mapMinZoom: number;
  mapMaxZoom: number;
  mapMaxResolution: number;
  tileExtent: [number, number, number, number];
}

export function createCrs(config: MapConfig) {
  const mapMinResolution = Math.pow(2, config.mapMaxZoom) * config.mapMaxResolution;
  const crs = L.extend({}, L.CRS.Simple) as any;
  crs.transformation = new L.Transformation(1, -config.tileExtent[0], -1, config.tileExtent[3]);
  crs.scale = function (r: number) {
    return Math.pow(2, r) / mapMinResolution;
  };
  crs.zoom = function (r: number) {
    return Math.log(r * mapMinResolution) / Math.LN2;
  };
  return crs;
}

export function getMapBounds(crs: any, config: MapConfig) {
  return [
    crs.unproject(L.point(config.mapExtent[2], config.mapExtent[3])),
    crs.unproject(L.point(config.mapExtent[0], config.mapExtent[1]))
  ];
}
