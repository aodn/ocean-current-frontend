import {
  allRegions,
  convertedEACMooringRegions,
  convertedFishSoopRegions,
  convertedSealCtdRegions,
} from '@/data/regionData';
import useProductStore from '@/stores/product-store/productStore';
import { Region, RegionKeyType } from '@/types/map';
import { ProductGroupID, ProductID } from '@/types/product';
import { getRegionListByProductId } from '@/utils/region-utils/region';

const useRegionFromProduct = () => {
  const useProductId = useProductStore((state) => state.productParams.productId);

  const getRegionCodeList = (productId: ProductID): RegionKeyType[] => {
    const regionFromProduct = getRegionListByProductId(productId) || {
      local: [],
      state: [],
    };
    const { local, state } = regionFromProduct;
    return [...local, ...state];
  };

  const mixedRegionCodeList = getRegionCodeList(useProductId);

  const getRegions = (regionCodeList: RegionKeyType[]): Region[] => {
    const sealCtd: ProductGroupID = 'sealCtd';
    const fishSoop: ProductGroupID = 'fishSOOP';
    const eACMooring: ProductID = 'EACMooringArray';
    if (useProductId.includes(sealCtd)) {
      return convertedSealCtdRegions.filter(({ code }) => regionCodeList.includes(code));
    }
    if (useProductId.includes(fishSoop)) {
      return convertedFishSoopRegions.filter(({ code }) => regionCodeList.includes(code));
    }
    if (useProductId.includes(eACMooring)) {
      return convertedEACMooringRegions.filter(({ code }) => regionCodeList.includes(code));
    }
    return allRegions.filter(({ code }) => regionCodeList.includes(code));
  };

  const newRegions = getRegions(mixedRegionCodeList);

  return { regions: newRegions };
};

export default useRegionFromProduct;
