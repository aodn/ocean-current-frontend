import { BoundingBox } from './map';

export interface ImageParameter {
  imageWidth: number;
  imageHeight: number;
  imageBounds: BoundingBox;
}

/*  
  Map image types
*/

export type MapImageDataPoints = {
  shape: string;
  coords: number[];
  href: string;
  alt: string;
  name: string;
  type: 'text' | 'region' | 'plot';
};
