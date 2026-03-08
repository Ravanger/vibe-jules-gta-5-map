export interface MarkerData {
  lat: number;
  lng: number;
  popupHtml: string;
  icon?: number | string;
  title?: string;
  image_url?: string;
  lightbox_group?: string;
  copy_url?: string;
}

export type CategoryGroup = 'Locations' | 'Activities' | 'Entertainment' | 'Services' | 'Collectibles' | 'Places' | 'Items' | 'Quests' | 'Online' | 'Mysteries' | 'Other';

export interface CategoryDefinition {
  id: string;
  name: string;
  group: CategoryGroup;
  iconId?: string;
  color?: string;
  markers: MarkerData[];
  visible: boolean;
}
