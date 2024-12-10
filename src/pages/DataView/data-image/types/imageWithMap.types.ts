// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ArgoTagMapArea } from '@/types/argo';
import { ImageMapArea } from '@/types/dataImage';

export interface InteractiveImageWithMapProps<T extends ImageMapArea> {
  src: string;
  alt: string;
  originalAreas: T[];
  // dateString: string;
  onAreaClick?: (area: T) => void;
  onImageLoad?: (originalHeight: number) => void;
}
