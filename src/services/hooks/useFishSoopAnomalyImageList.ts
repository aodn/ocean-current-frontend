import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProductID } from '@/types/product';
import { fetchImageListByProductId } from '@/services/imageList';
import { sharedQueryConfig } from '@/configs/query';
import { parseFishSoopAnomalyImageList, FishSoopAnomalyEntry } from '@/utils/fish-soop-utils/fishSoopAnomaly';

const FISHSOOP_ANOMALY_PRODUCTS: ProductID[] = ['fishSOOP-quarterlyAnomalies', 'fishSOOP-depthAnomalies'];

/**
 * Fetches and parses the raw anomaly image list for a FishSOOP anomaly product.
 * These products are region-less, so the list is fetched without a region param
 * and the region/quarter/layer axes are parsed from the filenames.
 */
const useFishSoopAnomalyImageList = (productId: ProductID) => {
  const enabled = FISHSOOP_ANOMALY_PRODUCTS.includes(productId);

  const { data, isLoading } = useQuery({
    queryKey: ['fishSoopAnomalyImageList', productId],
    queryFn: () => fetchImageListByProductId(productId),
    enabled,
    ...sharedQueryConfig,
  });

  const entries = useMemo<FishSoopAnomalyEntry[]>(() => (data ? parseFishSoopAnomalyImageList(data) : []), [data]);

  return { entries, isLoading: enabled && isLoading };
};

export default useFishSoopAnomalyImageList;
