import { useEffect } from 'react';
import { getProductByPath } from '@/utils/product-utils/product';
import { setProductId } from '@/stores/product-store/productStore';

const useSetProductId = (urlPath: string): void => {
  const mainProduct = urlPath.split('/')[2];
  const subProduct = urlPath.split('/')[3];

  useEffect(() => {
    if (mainProduct || subProduct) {
      const mainProductKey = getProductByPath(mainProduct)?.key;
      const subProductKey = subProduct ? getProductByPath(mainProduct, subProduct)?.key : null;
      const productId = subProductKey || mainProductKey;

      setProductId(productId);
    }
  }, [mainProduct, subProduct]);
};

export default useSetProductId;
