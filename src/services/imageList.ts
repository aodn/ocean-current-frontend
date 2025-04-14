import { CurrentMetersPlotsResponse, ImageListResponse } from '@/types/imageList';
import { ProductID } from '@/types/product';
import { getApiProductId } from '@/configs/products';
import { CurrentMetersDeploymentPlotNames } from '@/types/currentMeters';
import apiClient from './httpClient';

const fetchImageListByProductIdAndRegion = async (productId: ProductID, region: string) => {
  const apiProductId = getApiProductId(productId);

  if (!region) throw new Error('Region is required');

  const queryParams = new URLSearchParams();
  queryParams.set('region', region);

  const response = await apiClient.get<ImageListResponse[]>(`/metadata/image-list/${apiProductId}?${queryParams}`);
  return response;
};

const fetchCurrentMetersPlotsList = async (plotName: CurrentMetersDeploymentPlotNames) => {
  const response = await apiClient.get<CurrentMetersPlotsResponse>(`/metadata/image-list/current-meters/${plotName}`);
  return response.data;
};

export { fetchImageListByProductIdAndRegion, fetchCurrentMetersPlotsList };
