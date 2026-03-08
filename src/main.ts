import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'glightbox/dist/css/glightbox.min.css';
import './css/style.css';
import './css/L.Control.MousePosition.css';

import './js/L.Control.MousePosition';
import './js/leaflet-hash';

import ClipboardJS from 'clipboard';
import GLightbox from 'glightbox';

import { createCrs, getMapBounds, type MapConfig } from './utils/mapUtils';
import { MarkerManager } from './utils/MarkerManager';
import { LayerSidebar } from './utils/LayerSidebar';
import { categories } from './data/categories';
import { AppStorageBackend, UserProgressStore } from './utils/UserProgressStore';

const config: MapConfig = {
  mapExtent: [0, -8192, 8192, 0],
  mapMinZoom: 1,
  mapMaxZoom: 6,
  mapMaxResolution: 0.25,
  tileExtent: [0, -8192, 8192, 0]
};

const mapElement = document.getElementById('map');

if (mapElement) {
  const crs = createCrs(config);

  const map = new L.Map('map', {
    maxZoom: config.mapMaxZoom,
    minZoom: config.mapMinZoom,
    crs: crs
  });

  // @ts-ignore
  window.map = map;

  L.tileLayer('/images/{z}/{x}/{y}.png', {
    minZoom: config.mapMinZoom,
    maxZoom: config.mapMaxZoom,
    tileSize: 512,
    noWrap: true,
    // @ts-ignore
    tms: false
  }).addTo(map);

  map.fitBounds(getMapBounds(crs, config));

  // @ts-ignore
  L.control.mousePosition().addTo(map);
  // @ts-ignore
  new L.Hash(map);

  const progressBackend = new AppStorageBackend();
  const progressStore = new UserProgressStore(categories, progressBackend);

  // Initialize Marker Manager — adds markers to layer groups
  const markerManager = new MarkerManager(map);
  markerManager.setHideCollected(progressStore.isHideCollected());

  categories.forEach(category => {
    markerManager.addCategory(category);
    
    // Restore saved visibility
    const isVisible = progressStore.isCategoryVisible(category.id);
    if (isVisible) {
      markerManager.showLayer(category.id);
    } else {
      markerManager.hideLayer(category.id);
    }

    markerManager.syncCategoryCollected(category.id, (index) => progressStore.isCollected(category.id, index));
  });

  // Keep marker manager in sync with settings
  progressStore.subscribe((state) => {
    markerManager.setHideCollected(state.settings.hideCollected);
  });

  // Initialize custom Layer Sidebar (replaces L.control.layers)
  new LayerSidebar(markerManager, categories, progressStore);

  // Initialize Clipboard with success feedback
  const clipboard = new ClipboardJS('.copy');

  const copySvgIcon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
      </svg>`;

  clipboard.on('success', (e) => {
    const btn = e.trigger as HTMLButtonElement;
    btn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg><span class="text-xs font-medium">Copied!</span>`;
    btn.setAttribute('aria-label', 'Copied! Location coordinates copied to clipboard');
    btn.classList.add('bg-green-600', 'text-white');
    btn.classList.remove('bg-gray-700/50', 'text-gray-400', 'hover:bg-blue-500', 'hover:text-white');

    setTimeout(() => {
      btn.innerHTML = copySvgIcon;
      btn.setAttribute('aria-label', 'Copy location coordinates');
      btn.classList.remove('bg-green-600', 'text-white');
      btn.classList.add('bg-gray-700/50', 'text-gray-400', 'hover:bg-blue-500', 'hover:text-white');
    }, 2000);

    e.clearSelection();
  });

  // Initialize GLightbox
  const lightbox = GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true,
    autoplayVideos: true
  });

  map.on('popupopen', (event) => {
    lightbox.reload();
    document.querySelectorAll<HTMLButtonElement>('button.copy').forEach(btn => {
      if (!btn.getAttribute('aria-label')) {
        btn.setAttribute('aria-label', 'Copy location coordinates');
      }
    });

    const popup = event.popup;
    const content = popup.getElement();
    if (!content) return;

    const popupRoot = content.querySelector('.popup-root') as HTMLElement;
    if (!popupRoot) return;

    const progressToggle = popupRoot.querySelector<HTMLButtonElement>('[data-progress-toggle]');
    const categoryId = popupRoot.dataset.categoryId;
    const indexAttr = popupRoot.dataset.markerIndex;

    if (!progressToggle || !categoryId || indexAttr == null) return;

    const markerIndex = Number.parseInt(indexAttr, 10);
    const updateToggle = () => {
      const collected = progressStore.isCollected(categoryId, markerIndex);
      progressToggle.dataset.collected = String(collected);
      progressToggle.textContent = collected ? 'Collected' : 'Mark as collected';
      progressToggle.setAttribute('aria-pressed', String(collected));
      markerManager.markCollected(categoryId, markerIndex, collected);
    };

    updateToggle();

    progressToggle.addEventListener('click', () => {
      const current = progressStore.isCollected(categoryId, markerIndex);
      progressStore.setCollected(categoryId, markerIndex, !current);
      updateToggle();
    });
  });
}
