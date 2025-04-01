export interface VideoPlayerOutletContext {
  showVideo: boolean;
  loading: boolean;
}

export type UrlType = 'map' | 'product';

export enum ProductPath {
  SEAL_CTD = 'seal-ctd',
  SEAL_CTD_TAGS = 'seal-ctd-tags',
}
