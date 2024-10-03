import { BoundingBox } from './map';

export interface ImageParameter {
  imageWidth: number;
  imageHeight: number;
  imageBounds: BoundingBox;
}

export type AreaShape = 'rect' | 'circle' | 'poly';

export interface ImageMapArea {
  shape: 'rect' | 'circle' | 'poly';
  coords: number[];
  title: string;
  href?: string;
  alt?: string;
}
