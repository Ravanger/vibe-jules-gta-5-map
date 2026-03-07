import L from 'leaflet';
import type { CategoryDefinition } from '../types';

export class MarkerManager {
  private map: L.Map;
  private layers: { [id: string]: L.LayerGroup } = {};

  constructor(map: L.Map) {
    this.map = map;
  }

  addCategory(category: CategoryDefinition): void {
    const layerGroup = L.layerGroup();
    
    const iconSize = category.iconSize || [32, 32];
    const iconAnchor = category.iconAnchor || [16, 16];

    category.markers.forEach(m => {
      const iconUrl = typeof category.iconUrl === 'function' 
        ? category.iconUrl(m) 
        : category.iconUrl;

      const icon = L.icon({
        iconUrl,
        iconSize: iconSize as L.PointTuple,
        iconAnchor: iconAnchor as L.PointTuple,
        popupAnchor: [0, -iconAnchor[1]] // Popup appears above the icon
      });

      L.marker([m.lat, m.lng], { icon })
        .bindPopup(m.popupHtml)
        .addTo(layerGroup);
    });

    this.layers[category.name] = layerGroup; // Use name for Layer Control display

    if (category.visible) {
      layerGroup.addTo(this.map);
    }
  }

  getLayersMap(): { [name: string]: L.LayerGroup } {
    return this.layers;
  }
}
