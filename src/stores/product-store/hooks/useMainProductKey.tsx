import { getProductByKey } from '@/utils/product';
import useProductStore from '../productStore';

const useMainProductKey = () => {
  const useMainProduct = useProductStore((state) => state.productParams.mainProduct);

  if (!useMainProduct) {
    return null;
  }

  const product = getProductByKey(useMainProduct);
  return product?.mainProduct?.key || null;
};

// export { useMainProductKey };
export default useMainProductKey;
