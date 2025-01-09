import { getDateFormatByProductIdAndRegionScope } from '@/utils/date-utils/date';
import useProductStore from '../productStore';

const useProductDateFormat = () => {
  const productId = useProductStore((state) => state.productParams.productId);
  const regionScope = useProductStore((state) => state.productParams.regionScope);

  return getDateFormatByProductIdAndRegionScope(productId, regionScope);
};

export default useProductDateFormat;
