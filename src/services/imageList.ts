import { ImageListResponse } from '@/types/imageList';
import { ProductID } from '@/types/product';
import { getApiProductId } from '@/configs/products';
import apiClient from './httpClient';

const fetchImageListByProductIdAndRegion = async (productId: ProductID, region: string) => {
  const apiProductId = getApiProductId(productId);

  if (!region) throw new Error('Region is required');

  const queryParams = new URLSearchParams();
  queryParams.set('region', region);

  const response = await apiClient.get<ImageListResponse[]>(`/metadata/image-list/${apiProductId}?${queryParams}`);
  return response;
};

export { fetchImageListByProductIdAndRegion };
