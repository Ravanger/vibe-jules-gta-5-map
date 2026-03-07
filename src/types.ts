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

export interface CategoryDefinition {
  id: string;
  name: string;
  iconUrl: string | ((m: MarkerData) => string);
  iconSize?: [number, number];
  iconAnchor?: [number, number];
  markers: MarkerData[];
  visible: boolean;
}
