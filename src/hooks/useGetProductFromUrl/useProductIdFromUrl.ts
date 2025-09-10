import { useMemo } from 'react';
import { useLocation, useMatch } from 'react-router';
import { UrlType } from '@/types/router';
import { ChildProductID, ProductGroupID, StandaloneProductID } from '@/types/product';
import { getProductByPath } from '@/utils/product-utils/product';

export const useProductIdFromUrl = (type: UrlType) => {
  const location = useLocation();

  const mainProductOnlyMatch = useMatch(`/${type}/:product`);
  const mainProductWithSubProductMatch = useMatch(`/${type}/:product/:subProduct`);

  const getProductFromUrlMatch = () => {
    const mainProductWithSubProductExist =
      mainProductWithSubProductMatch?.params?.product && mainProductWithSubProductMatch?.params?.subProduct;

    const mainProductOnlyExist = mainProductOnlyMatch?.params?.product;

    if (mainProductWithSubProductExist) {
      return {
        mainProduct: getProductByPath(mainProductWithSubProductMatch.params.product!).key as ProductGroupID,
        subProduct: getProductByPath(
          mainProductWithSubProductMatch.params.product!,
          mainProductWithSubProductMatch.params.subProduct!,
        ).key as ChildProductID,
      };
    } else if (mainProductOnlyExist) {
      return {
        mainProduct: getProductByPath(mainProductOnlyMatch.params.product!).key as StandaloneProductID,
        subProduct: null as never,
      };
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(getProductFromUrlMatch, [location.pathname, type]);
};
