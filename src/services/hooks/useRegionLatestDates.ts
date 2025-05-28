import { useQuery } from '@tanstack/react-query';
import { ProductID } from '@/types/product';
import { fetchRegionLatestDatesByProductId } from '@/services/imageList';

const useRegionLatestDates = (productId: ProductID) => {
  return useQuery({
    queryKey: ['regionLatestDates', productId],
    queryFn: () => fetchRegionLatestDatesByProductId(productId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

export default useRegionLatestDates;
