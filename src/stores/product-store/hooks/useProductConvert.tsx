import { MainProductWithSubProduct, Product, SubProduct } from '@/types/product';
import { getProductByKey } from '@/utils/product';
import useProductStore from '../productStore';

const useProductConvert = () => {
  const useProductParams = useProductStore((state) => state.productParams);

  let product: MainProductWithSubProduct | null = null;
  let mainProduct: Product | null = null;
  let subProduct: SubProduct | null = null;
  let subProducts: SubProduct[] = [];

  const { mainProduct: mainProductKey, subProduct: subProductKey } = useProductParams;

  if (mainProductKey && subProductKey) {
    product = getProductByKey(mainProductKey, subProductKey);
    mainProduct = product.mainProduct;
    subProducts = product.mainProduct.children || [];
    if (product.subProduct) {
      subProduct = product.subProduct;
    }
  }

  if (mainProductKey && !subProductKey) {
    product = getProductByKey(mainProductKey);
    mainProduct = product.mainProduct;
  }

  return { mainProduct, subProduct, subProducts };
};

export default useProductConvert;
