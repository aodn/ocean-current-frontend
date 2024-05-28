import { allRegions } from '@/data/regionData';
import useProductStore from '@/stores/product-store/productStore';
import { Region, RegionKeyType } from '@/types/map';
import { getRegionListByProductId } from '@/utils/region';

const useRegionFromProduct = () => {
  const useProductId = useProductStore((state) => state.productParams.productId);

  const getRegionList = (productId: string): RegionKeyType[] => {
    const regionFromProduct = getRegionListByProductId(productId) || { local: [], state: [] };
    const { local, state } = regionFromProduct;
    return [...local, ...state];
  };
  const mixedRegions = getRegionList(useProductId);

  const getRegions = (regionKey: RegionKeyType[]): Region[] =>
    allRegions.filter(({ region }) => regionKey.includes(region));
  const newRegions = getRegions(mixedRegions);

  return { regions: newRegions };
};

export default useRegionFromProduct;
