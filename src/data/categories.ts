import type { CategoryDefinition, MarkerData } from '../types';
import playingCards from './categories/playing_cards.json';

export const categories: CategoryDefinition[] = [
  {
    id: 'playing_cards',
    name: 'Playing Cards',
    iconUrl: (m: MarkerData) => `/images/markers/marker_${m.icon}.png`,
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    markers: playingCards as MarkerData[],
    visible: true
  }
];
