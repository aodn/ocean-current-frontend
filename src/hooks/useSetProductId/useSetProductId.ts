import { useEffect } from 'react';
import { getProductByPath } from '@/utils/product-utils/product';
import { UrlType } from '@/types/router';
import useProductStore from '@/stores/product-store/productStore';
import { ProductID } from '@/types/product';
import useProductFromUrl from '../useGetProductFromUrl/useGetProductFromUrl';

const useSetProductId = (type: UrlType, setProductId: (id: ProductID) => void): void => {
  const product = useProductFromUrl(type);
  const productIdFromStore = useProductStore((state) => state.productParams.productId);
  useEffect(() => {
    if (product) {
      const { mainProduct, subProduct } = product;
      const mainProductKey = getProductByPath(mainProduct)?.key as ProductID;
      const subProductKey = subProduct ? (getProductByPath(mainProduct, subProduct)?.key as ProductID) : null;
      const productId = subProductKey || mainProductKey;
      if (productId !== productIdFromStore) {
        setProductId(productId);
      }
    }
  }, [product, product?.mainProduct, product?.subProduct, productIdFromStore, setProductId]);
};

export default useSetProductId;
