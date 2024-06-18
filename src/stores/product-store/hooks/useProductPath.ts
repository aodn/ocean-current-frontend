import { constructParentPath, constructPath, getProductByIdFromFlat } from '@/utils/product';
import useProductStore from '../productStore';

const useProductPath = () => {
  const useProductId = useProductStore((state) => state.productParams.productId);

  const getTargetPath = (productId: string) => {
    const product = getProductByIdFromFlat(productId);
    if (!product) return '';

    return product.parentId ? constructParentPath(product) : constructPath(product);
  };

  return getTargetPath(useProductId);
};

export default useProductPath;
