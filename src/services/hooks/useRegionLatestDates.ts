import { useQueries, useQuery, UseQueryResult } from '@tanstack/react-query';
import { ProductID } from '@/types/product';
import { fetchRegionLatestDatesByProductId } from '@/services/imageList';
import { LatestRegionDatesResponse } from '@/types/imageList';

export const regionLatestDatesKeys = {
  all: ['regionLatestDates'] as const,
  byProductId: (productId: ProductID) => [...regionLatestDatesKeys.all, productId] as const,
};

export const regionLatestDatesOptions = (productId: ProductID, enabled: boolean = true) => ({
  queryKey: regionLatestDatesKeys.byProductId(productId),
  queryFn: () => fetchRegionLatestDatesByProductId(productId),
  staleTime: 2 * 60 * 60 * 1000,
  gcTime: 6 * 60 * 60 * 1000,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
  enabled,
});

export const useRegionLatestDates = (productId: ProductID, enabled?: boolean) => {
  return useQuery<LatestRegionDatesResponse>(regionLatestDatesOptions(productId, enabled));
};

export const useMultipleRegionLatestDates = (productIds: ProductID[], enabled?: boolean) => {
  return useQueries<LatestRegionDatesResponse[]>({
    queries: productIds.map((id) => regionLatestDatesOptions(id, enabled)),
  }) as UseQueryResult<LatestRegionDatesResponse, Error>[];
};
