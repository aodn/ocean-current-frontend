import { CurrentMetersRegion } from '@/constants/currentMeters';
import { BoundingBox } from './map';

export interface ImageParameter {
  imageWidth: number;
  imageHeight: number;
  imageBounds: BoundingBox;
}

/*  
  Map image types
*/

export type MapImageAreas = {
  shape: string;
  coords: number[];
  href: string;
  alt: string;
  name: string;
  type: 'text' | 'region' | 'plot' | 'point' | 'graph' | 'seal-tag';
  code?: CurrentMetersRegion;
};
