import { MapImageAreas } from './dataImage';

export type TidalCurrentsImageDataPoints = MapImageAreas & {
  type: 'region' | 'point';
};
