import { useEffect } from 'react';
import { getProductByPath } from '@/utils/product-utils/product';
import { UrlType } from '@/types/router';
import useProductStore from '@/stores/product-store/productStore';
import { ProductID } from '@/types/product';
import useProductPathFromUrl from '../useProductPathFromUrl/useProductPathFromUrl';

const useSetProductId = (type: UrlType, setProductId: (id: ProductID) => void): void => {
  const product = useProductPathFromUrl(type);
  const productIdFromStore = useProductStore((state) => state.productParams.productId);
  useEffect(() => {
    if (product) {
      const { mainProduct, subProduct } = product;
      try {
        const mainProductKey = getProductByPath(mainProduct)?.key as ProductID;
        const subProductKey = subProduct ? (getProductByPath(mainProduct, subProduct)?.key as ProductID) : null;
        const productId = subProductKey || mainProductKey;
        if (productId !== productIdFromStore) {
          setProductId(productId);
        }
      } catch {
        // Invalid product path — leave productId unset so layouts can show an error
      }
    }
  }, [product, product?.mainProduct, product?.subProduct, productIdFromStore, setProductId]);
};

export default useSetProductId;
