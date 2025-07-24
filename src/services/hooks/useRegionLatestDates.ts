import { useQuery } from '@tanstack/react-query';
import { ProductID } from '@/types/product';
import { fetchRegionLatestDatesByProductId } from '@/services/imageList';
import { LatestRegionDatesResponse } from '@/types/imageList';

export const regionLatestDatesKeys = {
  all: ['regionLatestDates'] as const,
  byProductId: (productId: ProductID) => [...regionLatestDatesKeys.all, productId] as const,
};

export const regionLatestDatesOptions = (productId: ProductID) => ({
  queryKey: regionLatestDatesKeys.byProductId(productId),
  queryFn: () => fetchRegionLatestDatesByProductId(productId),
  staleTime: 2 * 60 * 60 * 1000,
  gcTime: 6 * 60 * 60 * 1000,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
});

const useRegionLatestDates = (productId: ProductID) => {
  return useQuery<LatestRegionDatesResponse>(regionLatestDatesOptions(productId));
};

export default useRegionLatestDates;
