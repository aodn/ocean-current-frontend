import { OC_PRODUCTS } from '@/constants/product';
import { FlatProduct, Product, ProductGroupWithChildren, StandaloneProductWithoutChildren } from '@/types/product';

const flattenProducts = (products: Product[]): FlatProduct[] => {
  const flatList: FlatProduct[] = [];

  products.forEach((product) => {
    const { children, ...flatProduct } = product;

    if (!product.children) {
      flatList.push({ ...(flatProduct as StandaloneProductWithoutChildren), parentId: null });
    } else {
      flatList.push({ ...(flatProduct as ProductGroupWithChildren), parentId: null });
      product.children.forEach((child) => {
        flatList.push({ ...child, parentId: product.key, latestEntry: product.latestEntry });
      });
    }
  });
  return flatList;
};

const flatProducts = flattenProducts(OC_PRODUCTS);

export { flatProducts };
