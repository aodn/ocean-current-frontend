import { flattenedProducts } from '@/data/productData';

const getEntryImagePathByProductId = (productId: string): string | null | undefined => {
  const product = flattenedProducts.find((product) => product.key === productId);

  return product?.latestEntry;
};

export { getEntryImagePathByProductId };
