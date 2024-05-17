import { useMemo } from 'react';
import { useLocation, useMatch } from 'react-router-dom';

const useProductFromUrl = (type: 'product' | 'map') => {
  const location = useLocation();

  const mainProductOnlyMatch = useMatch(`/${type}/:product`);
  const mainProductWithSubProductMatch = useMatch(`/${type}/:product/:subProduct`);

  const getProductFromUrlMatch = () => {
    const mainProductWithSubProductExist =
      mainProductWithSubProductMatch?.params?.product && mainProductWithSubProductMatch?.params?.subProduct;

    const mainProductOnlyExist = mainProductOnlyMatch?.params?.product;

    if (mainProductWithSubProductExist) {
      return {
        mainProduct: mainProductWithSubProductMatch.params.product!,
        subProduct: mainProductWithSubProductMatch.params.subProduct!,
      };
    } else if (mainProductOnlyExist) {
      return {
        mainProduct: mainProductOnlyMatch.params.product!,
        subProduct: null,
      };
    }
    // TODO: give default product
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedProductFromUrl = useMemo(getProductFromUrlMatch, [location.pathname]);

  return memoizedProductFromUrl;
};

export default useProductFromUrl;
