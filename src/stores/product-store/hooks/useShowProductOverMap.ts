import { useArgoProductValidQueryParams, useQueryParams } from '@/hooks';
import { isProductAvailableInRegion } from '@/utils/region-utils/region';
import useProductStore from '../productStore';
import useProductCheck from './useProductCheck';

export const useShowProductOverMap = (): boolean => {
  const { isArgo, isSurfaceWavesBuoyTimeseries } = useProductCheck();
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

  if (!region || !useProductId) {
    return false;
  }

  return isProductAvailableInRegion(useProductId, region);
};
