import { CurrentMetersPlotPath } from '@/constants/currentMeters';

interface ImageFile {
  name: string;
}

interface ImageListResponse {
  path: string;
  productId: string;
  region: string;
  files: ImageFile[];
  depth?: string;
}

interface DepthData {
  depth: CurrentMetersPlotPath;
  path: string;
  files: string[];
}

interface CurrentMetersPlotsResponse {
  productId: string;
  region: string;
  depthData: DepthData[];
}

export interface RegionLatestDate {
  region: string;
  latestDate: string;
  path: string;
}

interface LatestRegionDatesResponse {
  productId: string;
  regionLatestDates: RegionLatestDate[];
}

export type { ImageFile, ImageListResponse, CurrentMetersPlotsResponse, LatestRegionDatesResponse };
