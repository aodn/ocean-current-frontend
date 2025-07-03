import { CurrentMetersRegion } from '@/constants/currentMeters';
import { BoundingBox } from './map';

export interface ImageParameter {
  imageWidth: number;
  imageHeight: number;
  imageBounds: BoundingBox;
}

export type ImageAreaType = 'text' | 'region' | 'plot' | 'point' | 'graph' | 'seal-tag';

export interface ImageArea {
  shape: 'circle' | 'rect' | 'poly';
  coords: number[];
  href: string;
  alt: string;
}

/*
  Map image types
*/

export interface MapImageAreas extends ImageArea {
  name: string;
  type: ImageAreaType;
  code?: CurrentMetersRegion;
}
