import { ArgoTagMapArea } from '@/types/argo';

export interface ImageWithMapProps {
  src: string;
  alt: string;
  originalCoords: ArgoTagMapArea[];
  dateString: string;
}
