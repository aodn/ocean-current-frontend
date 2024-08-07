import { flatProducts } from '@/data/productData';

const getEntryImagePathByProductId = (productId: string): string | null | undefined => {
  const product = flatProducts.find((product) => product.key === productId);

  return product?.latestEntry;
};

export { getEntryImagePathByProductId };
