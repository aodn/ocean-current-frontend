import { useProductValidQueryParams, useQueryParams } from '@/hooks';
import { isProductAvailableInRegion } from '@/utils/region-utils/region';
import useProductStore from '../productStore';
import useProductCheck from './useProductCheck';

export function useProductAvailableRegion(): boolean {
  const { isArgo, isCurrentMeters, isEACMooringArray, isSealCtdTags, isSurfaceWaves } = useProductCheck();
  const { isArgoValid } = useProductValidQueryParams();

  const { getQueryParamsByKey } = useQueryParams();
  let region = getQueryParamsByKey('region');
  const useProductId = useProductStore((state) => state.productParams.productId);
  if (useProductId === 'argo') region = 'AU';
  if (!region || !useProductId) {
    return false;
  }
  return (
    isProductAvailableInRegion(region, useProductId) ||
    isEACMooringArray ||
    (isArgo && isArgoValid) ||
    isCurrentMeters ||
    isSealCtdTags ||
    isSurfaceWaves
  );
}
