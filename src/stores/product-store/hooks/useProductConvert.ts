import { FlatProduct, MainProductWithSubProduct, Product, SubProduct } from '@/types/product';
import { getProductByIdFromFlat, getProductByKey } from '@/utils/product';
import useProductStore from '../productStore';

const useProductConvert = () => {
  const useProductId = useProductStore((state) => state.productParams.productId);

  let product: MainProductWithSubProduct | null = null;
  let mainProduct: Product | null = null;
  let subProduct: SubProduct | null = null;
  let subProducts: SubProduct[] = [];

  let parentProduct: FlatProduct | undefined;
  // const { mainProduct: mainProductKey, subProduct: subProductKey } = useProductParams;

  const flatProduct = getProductByIdFromFlat(useProductId);

  const checkMainProductKeyAndSubProductKey = (flatProduct: FlatProduct | undefined) => {
    let mainProductId: string | undefined;
    let subProductId: string | undefined;

    if (!flatProduct) {
      return { mainProductId, subProductId };
    }

    if (flatProduct.parentId === null) {
      mainProductId = flatProduct.key;
      subProductId = undefined;
    } else if (flatProduct.parentId) {
      parentProduct = getProductByIdFromFlat(flatProduct.parentId);
      mainProductId = parentProduct?.key;
      subProductId = flatProduct?.key;
    }

    return { mainProductId, subProductId };
  };

  const { mainProductId, subProductId } = checkMainProductKeyAndSubProductKey(flatProduct);

  if (mainProductId && subProductId) {
    product = getProductByKey(mainProductId, subProductId);
    mainProduct = product.mainProduct;
    subProducts = product.mainProduct.children || [];
    if (product.subProduct) {
      subProduct = product.subProduct;
    }
  }

  if (mainProductId && !subProductId) {
    product = getProductByKey(mainProductId);
    mainProduct = product.mainProduct;
  }

  return { mainProduct, subProduct, subProducts };
};

export default useProductConvert;
