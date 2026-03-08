import L from 'leaflet';
import type { CategoryDefinition } from '../types';

export class MarkerManager {
  private map: L.Map;
  private layerMap: Map<string, L.LayerGroup> = new Map();
  private visibleMap: Map<string, boolean> = new Map();
  private markerIndexMap: Map<string, L.Marker[]> = new Map();
  private collectedStates: Map<string, Set<number>> = new Map();
  private hideCollected = false;

  constructor(map: L.Map) {
    this.map = map;
  }

  setHideCollected(hide: boolean): void {
    if (this.hideCollected === hide) return;
    this.hideCollected = hide;
    
    // Update visibility for all existing markers
    this.markerIndexMap.forEach((markers, categoryId) => {
      const collectedSet = this.collectedStates.get(categoryId) || new Set();
      markers.forEach((marker, index) => {
        this.updateMarkerVisibility(marker, categoryId, collectedSet.has(index));
      });
    });
  }

  addCategory(category: CategoryDefinition): void {
    const layerGroup = L.layerGroup();
    const iconSize = category.iconSize || [32, 32];
    const iconAnchor = category.iconAnchor || [16, 16];
    const markers: L.Marker[] = [];
    const collectedSet = this.collectedStates.get(category.id) || new Set();

    category.markers.forEach((m, index) => {
      const iconUrl = typeof category.iconUrl === 'function'
        ? category.iconUrl(m)
        : category.iconUrl;

      const icon = L.icon({
        iconUrl,
        iconSize: iconSize as L.PointTuple,
        iconAnchor: iconAnchor as L.PointTuple,
        popupAnchor: [0, -iconAnchor[1]],
        className: collectedSet.has(index) ? 'marker--collected' : ''
      });

      const popupHtml = `
        <div class="popup-root" data-category-id="${category.id}" data-marker-index="${index}">
          <div class="popup-inner">
            ${m.popupHtml}
          </div>
          <button type="button" class="progress-toggle-btn" data-progress-toggle="true" aria-pressed="false">
            Mark as collected
          </button>
        </div>`;

      const marker = L.marker([m.lat, m.lng], { icon })
        .bindPopup(popupHtml);

      // Only add to layer group if not hidden
      const isCollected = collectedSet.has(index);
      if (!(this.hideCollected && isCollected)) {
        marker.addTo(layerGroup);
      }

      markers.push(marker);
    });

    this.layerMap.set(category.id, layerGroup);
    this.markerIndexMap.set(category.id, markers);
    this.visibleMap.set(category.id, category.visible);
    if (category.visible) layerGroup.addTo(this.map);
  }

  private updateMarkerVisibility(marker: L.Marker, categoryId: string, collected: boolean): void {
    const layerGroup = this.layerMap.get(categoryId);
    if (!layerGroup) return;

    const shouldHide = this.hideCollected && collected;
    const isCurrentlyOnLayer = layerGroup.hasLayer(marker);

    if (shouldHide && isCurrentlyOnLayer) {
      layerGroup.removeLayer(marker);
    } else if (!shouldHide && !isCurrentlyOnLayer) {
      marker.addTo(layerGroup);
    }
    
    // Also ensure CSS class is correct
    const el = marker.getElement();
    if (el) {
      el.classList.toggle('marker--collected', collected);
    }
    
    // Always update options so it persists even if re-added to map
    const icon = marker.options.icon as L.Icon;
    if (icon && icon.options) {
      icon.options.className = collected ? 'marker--collected' : '';
    }
  }

  showLayer(id: string): void {
    const layer = this.layerMap.get(id);
    if (layer && !this.map.hasLayer(layer)) layer.addTo(this.map);
    this.visibleMap.set(id, true);
  }

  hideLayer(id: string): void {
    const layer = this.layerMap.get(id);
    if (layer) this.map.removeLayer(layer);
    this.visibleMap.set(id, false);
  }

  isVisible(id: string): boolean {
    return this.visibleMap.get(id) ?? false;
  }

  markCollected(categoryId: string, index: number, collected: boolean): void {
    const markers = this.markerIndexMap.get(categoryId);
    if (!markers || index < 0 || index >= markers.length) return;
    
    let set = this.collectedStates.get(categoryId);
    if (!set) {
      set = new Set();
      this.collectedStates.set(categoryId, set);
    }

    if (collected) {
      set.add(index);
    } else {
      set.delete(index);
    }

    this.updateMarkerVisibility(markers[index], categoryId, collected);
  }

  syncCategoryCollected(categoryId: string, isCollected: (index: number) => boolean): void {
    const markers = this.markerIndexMap.get(categoryId);
    if (!markers) return;
    
    let set = this.collectedStates.get(categoryId);
    if (!set) {
      set = new Set();
      this.collectedStates.set(categoryId, set);
    }

    markers.forEach((marker, index) => {
      const collected = isCollected(index);
      if (collected) {
        set!.add(index);
      } else {
        set!.delete(index);
      }
      this.updateMarkerVisibility(marker, categoryId, collected);
    });
  }
}

