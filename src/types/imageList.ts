import { CurrentMetersPlotPath } from '@/constants/currentMeters';

interface ImageFile {
  name: string;
}

interface ImageListResponse {
  path: string;
  productId: string;
  region: string;
  files: ImageFile[];
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

export type { ImageFile, ImageListResponse, CurrentMetersPlotsResponse };
