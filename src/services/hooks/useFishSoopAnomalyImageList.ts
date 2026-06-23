import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProductID } from '@/types/product';
import { fetchImageListByProductId } from '@/services/imageList';
import { sharedQueryConfig } from '@/configs/query';
import { parseFishSoopAnomalyImageList, FishSoopAnomalyEntry } from '@/utils/fish-soop-utils/fishSoopAnomaly';

const FISHSOOP_ANOMALY_PRODUCTS: ProductID[] = [
  'fishSOOP-quarterlyAnomalies',
  'fishSOOP-averageAnomalies',
  'fishSOOP-depthAnomalies',
];

const useFishSoopAnomalyImageList = (productId: ProductID) => {
  const enabled = FISHSOOP_ANOMALY_PRODUCTS.includes(productId);

  // The Average Anomalies overview reuses the quarterly `anom2/` list, which holds
  // the `tanom_avg_p<N>.gif` entries; sharing the query key reuses the cache.
  const fetchProductId: ProductID =
    productId === 'fishSOOP-averageAnomalies' ? 'fishSOOP-quarterlyAnomalies' : productId;

  const { data, isLoading } = useQuery({
    queryKey: ['fishSoopAnomalyImageList', fetchProductId],
    queryFn: () => fetchImageListByProductId(fetchProductId),
    enabled,
    ...sharedQueryConfig,
  });

  const entries = useMemo<FishSoopAnomalyEntry[]>(() => (data ? parseFishSoopAnomalyImageList(data) : []), [data]);

  return { entries, isLoading: enabled && isLoading };
};

export default useFishSoopAnomalyImageList;
