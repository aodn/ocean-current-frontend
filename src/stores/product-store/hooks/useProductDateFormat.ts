import { getDateFormatByProductIdAndRegionScope } from '@/utils/date-utils/date';
import { useUrlParams } from '@/pages/DataView/product-content/hooks/useUrlParams';
import useProductStore from '../productStore';

const useProductDateFormat = () => {
  const productId = useProductStore((state) => state.productParams.productId);
  const regionScope = useProductStore((state) => state.productParams.regionScope);
  const { hasSelectedParams } = useUrlParams();
  const isPointSelected = hasSelectedParams.point;
  return getDateFormatByProductIdAndRegionScope(productId, regionScope, isPointSelected);
};

export default useProductDateFormat;
