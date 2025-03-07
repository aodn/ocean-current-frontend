import { allRegions } from '@/data/regionData';
import useProductStore from '@/stores/product-store/productStore';
import { Region, RegionKeyType } from '@/types/map';
import { ProductID } from '@/types/product';
import { getRegionListByProductId } from '@/utils/region-utils/region';

const useRegionFromProduct = () => {
  const useProductId = useProductStore((state) => state.productParams.productId);

  const getRegionList = (productId: ProductID): RegionKeyType[] => {
    const regionFromProduct = getRegionListByProductId(productId) || { local: [], state: [] };
    const { local, state } = regionFromProduct;
    return [...local, ...state];
  };
  const mixedRegions = getRegionList(useProductId);

  const getRegions = (regionKey: RegionKeyType[]): Region[] =>
    allRegions.filter(({ code }) => regionKey.includes(code));
  const newRegions = getRegions(mixedRegions);

  return { regions: newRegions };
};

export default useRegionFromProduct;
