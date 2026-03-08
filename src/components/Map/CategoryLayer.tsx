import React, { useMemo, useCallback } from 'react';
import { LayerGroup, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { CategoryDefinition, MarkerData } from '../../types';
import { useProgressStore } from '../../store/useProgressStore';
import { MarkerPopup } from './MarkerPopup';
import { GROUP_META, CATEGORY_ICONS } from '../../data/icons';

interface Props {
  category: CategoryDefinition;
  visible: boolean;
}

const MemoizedMarker: React.FC<{
  marker: MarkerData;
  category: CategoryDefinition;
  index: number;
  isCollected: boolean;
  icon: L.DivIcon;
}> = React.memo(({ marker, category, index, isCollected, icon }) => {
  return (
    <Marker
      position={[marker.lat, marker.lng]}
      icon={icon}
    >
      <Popup className="gta-popup">
        <MarkerPopup 
          marker={marker} 
          category={category} 
          index={index} 
          isCollected={isCollected} 
        />
      </Popup>
    </Marker>
  );
});

export const CategoryLayer: React.FC<Props> = React.memo(({ category, visible }) => {
  const hideFound = useProgressStore(state => state.settings.hideFound);
  const collectedMarkers = useProgressStore(state => state.collected[category.id]);

  const getIcon = useCallback((isCollected: boolean) => {
    const meta = GROUP_META[category.group] || { color: '#94a3b8', path: '' };
    const iconPath = (category.iconId && CATEGORY_ICONS[category.iconId]) || meta.path;
    const iconColor = category.color || meta.color;
    
    const className = `marker-icon-wrapper ${isCollected ? 'marker--collected' : ''}`;
    
    const svgHtml = `
      <div class="marker-pin" data-category-id="${category.id}" style="background-color: ${iconColor}; border-color: #ffffff;">
        <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="${iconPath}" />
        </svg>
      </div>
    `;

    return L.divIcon({
      html: svgHtml,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
      className
    });
  }, [category.group, category.iconId, category.color]);

  // Pre-calculate icons for collected and uncollected states
  const activeIcon = useMemo(() => getIcon(false), [getIcon]);
  const collectedIcon = useMemo(() => getIcon(true), [getIcon]);

  if (!visible) return null;

  return (
    <LayerGroup>
      {category.markers.map((marker, index) => {
        const isCollected = !!(collectedMarkers && collectedMarkers[String(index)]);
        if (hideFound && isCollected) return null;

        const icon = isCollected ? collectedIcon : activeIcon;

        return (
          <MemoizedMarker
            key={`${category.id}-${index}`}
            marker={marker}
            category={category}
            index={index}
            isCollected={isCollected}
            icon={icon}
          />
        );
      })}
    </LayerGroup>
  );
});
