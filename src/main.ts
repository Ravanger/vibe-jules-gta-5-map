import L from 'leaflet';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import 'lightbox2/dist/css/lightbox.min.css';
import './css/L.Control.MousePosition.css';

// Import local plugins
import './js/L.Control.MousePosition';
import './js/leaflet-hash';

import ClipboardJS from 'clipboard';
import $ from 'jquery';
// @ts-ignore
import 'lightbox2';

import markersData from './data/markers.json';
import { createCrs, getMapBounds, type MapConfig } from './utils/mapUtils';

// Set up jQuery globally for Lightbox2
(window as any).jQuery = $;
(window as any).$ = $;

const config: MapConfig = {
  mapExtent: [0, -8192, 8192, 0],
  mapMinZoom: 1,
  mapMaxZoom: 6,
  mapMaxResolution: 0.25,
  tileExtent: [0, -8192, 8192, 0]
};

const mapElement = document.getElementById("map");

if (mapElement) {
  const crs = createCrs(config);

  const map = new L.Map("map", {
    maxZoom: config.mapMaxZoom,
    minZoom: config.mapMinZoom,
    crs: crs
  });

  // @ts-ignore
  window.map = map;

  L.tileLayer("/images/{z}/{x}/{y}.png", {
    minZoom: config.mapMinZoom,
    maxZoom: config.mapMaxZoom,
    tileSize: 512,
    attribution: 'Created by <a href="https://github.com/Mo45">Kirill Krasin</a>. &copy; <a href="https://rockstarhub.ru">RockstarHub.ru</a>',
    noWrap: true,
    // @ts-ignore
    tms: false
  }).addTo(map);

  map.fitBounds(getMapBounds(crs, config));

  // @ts-ignore
  L.control.mousePosition().addTo(map);
  // @ts-ignore
  new L.Hash(map);

  // Markers
  const NumMarker = L.Icon.extend({
    options: {
      iconSize: [32, 37],
      iconAnchor: [16, 37]
    }
  });

  markersData.forEach(m => {
    const icon = new (NumMarker as any)({
      iconUrl: `/images/markers/marker_${m.icon}.png`
    });
    
    L.marker([m.lat, m.lng], { icon })
      .addTo(map)
      .bindPopup(m.popupHtml);
  });

  // Initialize Clipboard
  new ClipboardJS('.copy');
}
