import { ImageListResponse } from '@/types/imageList';
import apiClient from './httpClient';

const getImageListByProductIdAndRegion = async (productId: string, region: string) => {
  const response = await apiClient.get<ImageListResponse>(`/metadata/image-list/${productId}/${region}`);
  return response.data;
};

export { getImageListByProductIdAndRegion };
