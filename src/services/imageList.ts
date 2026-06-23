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

/**
 * Image list for region-less products (e.g. the FishSOOP anomaly products,
 * declared `regionRequired: false` in the API — it rejects a region param).
 */
const fetchImageListByProductId = async (productId: ProductID) => {
  const apiProductId = getApiProductId(productId);

  const response = await apiClient.get<ImageListResponse[]>(`/metadata/image-list/${apiProductId}`);
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
  fetchImageListByProductId,
  fetchCurrentMetersPlotsList,
  fetchRegionLatestDatesByProductId,
  fetchTidalCurrentsMonthPlotsByPoint,
};
