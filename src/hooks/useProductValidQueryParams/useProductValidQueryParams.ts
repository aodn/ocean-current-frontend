import { AnyProductID, isChildProductId, isProductGroupId, isStandaloneProductId } from '@/types/product';
import { useProductIdFromUrl } from '../useGetProductFromUrl/useProductIdFromUrl';
import useQueryParams from '../useQueryParams/useQueryParams';

export const useProductValidQueryParams = () => {
  const { searchParams } = useQueryParams();
  const { mainProduct, subProduct } = useProductIdFromUrl('product') || {};

  if (
    !(
      (isProductGroupId(mainProduct as AnyProductID) && isChildProductId(subProduct as AnyProductID)) ||
      isStandaloneProductId(mainProduct as AnyProductID)
    )
  ) {
    throw new Error(`Invalid productId: ${mainProduct}`);
  }

  if (mainProduct === 'argo') {
    const wmoid = searchParams['wmoid'];
    const cycle = searchParams['cycle'];
    const date = searchParams['date'];
    return { isArgoValid: !!wmoid && !!cycle && !!date };
  }

  return {};
};
