import { useProductValidQueryParams, useQueryParams } from '@/hooks';
import { isProductAvailableInRegion } from '@/utils/region-utils/region';
import useProductStore from '../productStore';
import useProductCheck from './useProductCheck';

export const useShowProductOverMap = (): boolean => {
  const { isArgo, isCurrentMeters, isEACMooringArray, isSealCtdTags, isSurfaceWaves } = useProductCheck();
  const { isArgoValid } = useProductValidQueryParams();

  const { getQueryParamsByKey } = useQueryParams();
  const region = getQueryParamsByKey('region');
  const useProductId = useProductStore((state) => state.productParams.productId);

  if (isArgo) {
    return isArgoValid;
  }

  if (!region || !useProductId) {
    return false;
  }

  return (
    isProductAvailableInRegion(useProductId, region) ||
    isEACMooringArray ||
    isCurrentMeters ||
    isSealCtdTags ||
    isSurfaceWaves
  );
};
