import { checkProductHasArgoTags, getArgoTagFilePathByProductId } from '@/utils/argo-utils/argoTag';
import { RegionScope } from '@/constants/region';
import { ProductID } from '@/types/product';

/**
 * Checks if argo tags are available for the current product and region scope
 */
export const checkArgoTagsAvailability = (productId: string | undefined, regionScope: RegionScope): boolean => {
  if (!productId || !checkProductHasArgoTags(productId as ProductID)) {
    return false;
  }

  const argoTagFilePathValue = getArgoTagFilePathByProductId(productId as ProductID);
  if (!argoTagFilePathValue) {
    return false;
  }

  const argoTagFilePath = regionScope === RegionScope.Local ? argoTagFilePathValue?.local : argoTagFilePathValue?.state;

  return !!argoTagFilePath;
};
