import { useProductValidQueryParams, useQueryParams } from '@/hooks';
import { isProductAvailableInRegion } from '@/utils/region-utils/region';
import useProductStore from '../productStore';
import useProductCheck from './useProductCheck';

export function useProductAvailableRegion(): boolean {
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
    isProductAvailableInRegion(region, useProductId) ||
    isEACMooringArray ||
    isCurrentMeters ||
    isSealCtdTags ||
    isSurfaceWaves
  );
}
