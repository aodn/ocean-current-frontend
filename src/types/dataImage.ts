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

type MapImageDataPoints = {
  shape: string;
  coords: number[];
  href: string;
  alt: string;
  name: string;
  type: 'text' | 'region' | 'plot';
};

export type CurrentMetersImageDataPoints = MapImageDataPoints & {
  code?: CurrentMetersRegion;
};
