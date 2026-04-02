import { OC_PRODUCTS } from '@/constants/product';
import {
  FlatProduct,
  LeafFlatProduct,
  Product,
  ProductGroupWithChildren,
  StandaloneProductWithoutChildren,
} from '@/types/product';

const buildFlattenedProducts = (products: Product[]): FlatProduct[] => {
  const flatList: FlatProduct[] = [];

  products.forEach((product) => {
    const { children, ...flatProduct } = product;

    if (!product.children) {
      flatList.push({
        ...(flatProduct as StandaloneProductWithoutChildren),
        parentId: null,
      });
    } else {
      flatList.push({
        ...(flatProduct as ProductGroupWithChildren),
        parentId: null,
      });
      product.children.forEach((child) => {
        flatList.push({
          ...child,
          parentId: product.key,
          latestEntry: product.latestEntry,
        });
      });
    }
  });
  return flatList;
};

const buildFlattenedLeafProducts = (products: Product[]): LeafFlatProduct[] => {
  const flatList: LeafFlatProduct[] = [];

  products.forEach((product) => {
    if (!product.children) {
      flatList.push({
        ...(product as StandaloneProductWithoutChildren),
        parentId: null,
      });
    } else {
      product.children.forEach((child) => {
        flatList.push({
          ...child,
          parentId: product.key,
          latestEntry: product.latestEntry,
          localSegment: child.localSegment ?? product.localSegment,
          stateSegment: child.stateSegment ?? product.stateSegment,
        });
      });
    }
  });

  return flatList;
};

const flattenedProducts = buildFlattenedProducts(OC_PRODUCTS);
const flattenedLeafProducts = buildFlattenedLeafProducts(OC_PRODUCTS);

export { flattenedProducts, flattenedLeafProducts };
