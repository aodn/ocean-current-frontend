import { BoundingBox } from '@/types/map';

export interface Region {
  code: string;
  title: string;
  coords: BoundingBox;
}

export interface BasicMapProps {
  children?: React.ReactNode;
  id?: string;
  mapStyle?: string;
  isMiniMap?: boolean;
  style?: React.CSSProperties;
  fullScreenControl?: boolean;
  navigationControl?: boolean;
}
