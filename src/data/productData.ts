import { OC_PRODUCTS } from '@/constants/product';
import { FlatProduct, Product } from '@/types/product';

const flattenProducts = (products: Product[]): FlatProduct[] => {
  const flatList: FlatProduct[] = [];

  products.forEach((product) => {
    if (!product.children) {
      flatList.push({ ...product, parent: null });
    } else {
      product.children.forEach((child) => {
        flatList.push({ ...child, parent: product.key });
      });
    }
  });
  return flatList;
};

const flatProducts = flattenProducts(OC_PRODUCTS);

export { flatProducts };
