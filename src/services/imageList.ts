import { CurrentMetersPlotsResponse, ImageListResponse, LatestRegionDatesResponse } from '@/types/imageList';
import { ProductID } from '@/types/product';
import { getApiProductId, getApiRegionCode } from '@/configs/products';
import { CurrentMetersDeploymentPlotNames } from '@/types/currentMeters';
import apiClient from './httpClient';

const fetchImageListByProductIdAndRegion = async (productId: ProductID, region: string) => {
  const apiProductId = getApiProductId(productId);
  const apiRegion = getApiRegionCode(region, productId);

  if (!region) throw new Error('Region is required');

  const queryParams = new URLSearchParams();
  queryParams.set('region', apiRegion);

  const response = await apiClient.get<ImageListResponse[]>(`/metadata/image-list/${apiProductId}?${queryParams}`);
  return response.data;
};

const fetchCurrentMetersPlotsList = async (plotName: CurrentMetersDeploymentPlotNames) => {
  const response = await apiClient.get<CurrentMetersPlotsResponse>(`/metadata/image-list/current-meters/${plotName}`);
  return response.data;
};

const fetchRegionLatestDatesByProductId = async (productId: ProductID) => {
  const response = await apiClient.get<LatestRegionDatesResponse>(`/metadata/latest-dates/${productId}`);
  return response.data;
};

const fetchTidalCurrentsMonthPlotsByPoint = async (pointId: string) => {
  const response = await apiClient.get<ImageListResponse[]>(
    `/metadata/image-list/tidalCurrents-monthplots?region=${pointId}`,
  );
  return response.data;
};

export {
  fetchImageListByProductIdAndRegion,
  fetchCurrentMetersPlotsList,
  fetchRegionLatestDatesByProductId,
  fetchTidalCurrentsMonthPlotsByPoint,
};
