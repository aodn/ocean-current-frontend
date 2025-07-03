import { ImageArea } from './dataImage';

export interface BuoyTag {
  x: number;
  y: number;
  sz: number;
  title: string;
  url: string;
}

export interface BuoyTagsResponse {
  tagFile: string;
  tags: BuoyTag[];
}

export interface BuoyTagMapArea extends ImageArea {
  title: string;
}
