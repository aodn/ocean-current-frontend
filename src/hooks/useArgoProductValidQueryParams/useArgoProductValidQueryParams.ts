import { AnyProductID, isChildProductId, isProductGroupId, isStandaloneProductId } from '@/types/product';
import { useProductIdFromUrl } from '../useProductIdFromUrl/useProductIdFromUrl';
import useQueryParams from '../useQueryParams/useQueryParams';

export const useArgoProductValidQueryParams = () => {
  const { searchParams } = useQueryParams();
  const { mainProduct, subProduct } = useProductIdFromUrl('product') || {};

  if (
    !(
      (isProductGroupId(mainProduct as AnyProductID) && isChildProductId(subProduct as AnyProductID)) ||
      isStandaloneProductId(mainProduct as AnyProductID)
    )
  ) {
    return { isArgoValid: false };
  }

  if (mainProduct === 'argo') {
    // `date` is optional in the Argo URL: a (wmoid, cycle) pair uniquely identifies a profile and
    // the date is derived from the fetched profiles (see useDateListNavigation). Requiring only
    // wmoid + cycle lets `/product/argo?wmoid=...&cycle=...` render the profile in list mode.
    const wmoid = searchParams['wmoid'];
    const cycle = searchParams['cycle'];
    return { isArgoValid: !!wmoid && !!cycle };
  }

  return { isArgoValid: false };
};
