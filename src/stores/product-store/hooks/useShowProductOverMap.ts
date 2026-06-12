import { useArgoProductValidQueryParams, useQueryParams } from '@/hooks';
import { isProductAvailableInRegion } from '@/utils/region-utils/region';
import useProductStore from '../productStore';
import useProductCheck from './useProductCheck';

export const useShowProductOverMap = (): boolean => {
  const { isArgo, isSurfaceWavesBuoyTimeseries, isFishSoopProfiles, isFishSoopAnomaly } = useProductCheck();
  const { isArgoValid } = useArgoProductValidQueryParams();

  const { getQueryParamsByKey } = useQueryParams();
  const region = getQueryParamsByKey('region');
  const useProductId = useProductStore((state) => state.productParams.productId);

  if (isSurfaceWavesBuoyTimeseries) {
    return true;
  }

  if (isArgo) {
    return isArgoValid;
  }

  // FishSOOP anomaly products are region-less; their region/quarter/layer
  // selection lives in the sidebar filters, not the URL region param.
  if (isFishSoopAnomaly) {
    return true;
  }

  // FishSOOP profiles defaults to the Au-scope finder map when no region is selected
  if (isFishSoopProfiles && useProductId) {
    return isProductAvailableInRegion(useProductId, region || 'Au');
  }

  if (!region || !useProductId) {
    return false;
  }

  return isProductAvailableInRegion(useProductId, region);
};
