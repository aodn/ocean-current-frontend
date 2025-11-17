import { flattenedProducts } from '@/data/productData';
import { apiConfig } from '@/configs/api';

const getEntryImagePathByProductId = (productId: string): string | null | undefined => {
  const product = flattenedProducts.find((product) => product.key === productId);

  return product?.latestEntry;
};

const buildLatestEntryImageUrl = (productId: string): string => {
  const urlPath = getEntryImagePathByProductId(productId);

  if (!urlPath) {
    return '';
  }

  return `${apiConfig.ec2ProxyURL}/${urlPath}/latest.gif`;
};

export { getEntryImagePathByProductId, buildLatestEntryImageUrl };
