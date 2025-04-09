import { isProductAvailableInRegion } from '@/utils/region-utils/region';
import useProductStore from '../productStore';

const useProductAvailableInRegion = () => {
  const useProductId = useProductStore((state) => state.productParams.productId);
  const useRegionCode = useProductStore((state) => state.productParams.regionCode);

  return isProductAvailableInRegion(useRegionCode, useProductId);
};

export default useProductAvailableInRegion;
