import { useEffect } from 'react';
import { getProductByPath } from '@/utils/product-utils/product';
import { UrlType } from '@/types/router';
import useProductFromUrl from '../useGetProductFromUrl/useGetProductFromUrl';

const useSetProductId = (type: UrlType, setProductId: (id: string) => void): void => {
  const product = useProductFromUrl(type);

  useEffect(() => {
    if (product) {
      const { mainProduct, subProduct } = product;
      const mainProductKey = getProductByPath(mainProduct)?.key;
      const subProductKey = subProduct ? getProductByPath(mainProduct, subProduct)?.key : null;
      const productId = subProductKey || mainProductKey;

      setProductId(productId);
    }
  }, [product, setProductId]);
};

export default useSetProductId;
