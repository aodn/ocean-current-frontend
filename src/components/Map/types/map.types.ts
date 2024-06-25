import { BoundingBoxCoords } from '@/types/map';

export interface Region {
  region: string;
  title: string;
  coords: BoundingBoxCoords;
}

export interface BasicMapProps {
  children?: React.ReactNode;
  id?: string;
  mapStyle?: string;
  style?: React.CSSProperties;
  fullScreenControl?: boolean;
  navigationControl?: boolean;
}
