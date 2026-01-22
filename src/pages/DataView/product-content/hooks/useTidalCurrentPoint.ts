import { AnyProductID, isTidalCurrents } from '@/types/product';
import { useUrlParams } from './useUrlParams';

export function useTidalCurrentPoint(productId: AnyProductID) {
  const { hasSelectedParams, urlParams } = useUrlParams();
  const selectedPoint = urlParams.point;
  const isPointSelected = hasSelectedParams.point;

  const isTidalCurrentsPointSelected = isTidalCurrents(productId) && isPointSelected;
  return { isTidalCurrentsPointSelected, selectedPoint };
}
