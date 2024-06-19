import { getProductFullPathById } from '@/utils/product';
import useProductStore from '../productStore';

const useProductPath = () => {
  const useProductId = useProductStore((state) => state.productParams.productId);

  return getProductFullPathById(useProductId);
};

export default useProductPath;
