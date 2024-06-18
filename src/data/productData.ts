import { OC_PRODUCTS } from '@/constants/product';
import { FlatProduct, Product } from '@/types/product';

const flattenProducts = (products: Product[]): FlatProduct[] => {
  const flatList: FlatProduct[] = [];

  products.forEach((product) => {
    const { children, ...flatProduct } = product;
    flatList.push({ ...flatProduct, parentId: null });

    if (product.children) {
      product.children.forEach((child) => {
        flatList.push({ ...child, parentId: product.key });
      });
    }
  });
  return flatList;
};

const flatProducts = flattenProducts(OC_PRODUCTS);

export { flatProducts };
