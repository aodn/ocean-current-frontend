import { isProductAvailableInRegion } from '@/utils/region-utils/region';
import useProductStore from '../productStore';

const useProductAvailableInRegion = () => {
  const useProductId = useProductStore((state) => state.productParams.productId);
  const useRegionTitle = useProductStore((state) => state.productParams.regionTitle);

  return isProductAvailableInRegion(useRegionTitle, useProductId);
};

export default useProductAvailableInRegion;
