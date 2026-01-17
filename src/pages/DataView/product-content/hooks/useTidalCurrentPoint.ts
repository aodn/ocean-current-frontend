import { AnyProductID, isTidalCurrents } from '@/types/product';
import { useUrlParams } from './useUrlParams';

export function useTidalCurrentPoint(productId: AnyProductID) {
  const { hasSelectedParams } = useUrlParams();
  const isPointSelected = hasSelectedParams.point;

  const isTidalCurrentsPointSelected = isTidalCurrents(productId) && isPointSelected;
  return { isTidalCurrentsPointSelected };
}
