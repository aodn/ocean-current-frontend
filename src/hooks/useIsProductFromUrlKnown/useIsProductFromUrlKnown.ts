import { UrlType } from '@/types/router';
import { getProductByPath } from '@/utils/product-utils/product';
import useProductPathFromUrl from '../useGetProductFromUrl/useProductPathFromUrl';

/**
 * Returns whether the product path in the current URL maps to a known product.
 * - `true`  — URL params resolve to a known product
 * - `false` — URL params are present but the product is unknown
 * - `null`  — no URL params found (route not yet matched)
 */
const useIsProductFromUrlKnown = (type: UrlType): boolean | null => {
  const product = useProductPathFromUrl(type);

  if (!product) return null;

  try {
    getProductByPath(product.mainProduct, product.subProduct);
    return true;
  } catch {
    return false;
  }
};

export default useIsProductFromUrlKnown;
