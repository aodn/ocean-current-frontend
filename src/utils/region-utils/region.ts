import { RegionScope } from '@/constants/region';
import { Region } from '@/types/map';
import { allRegions } from '@/data/regionData';
import { productRegionMap } from '@/data/regionList';
import { RegionCategories } from '@/types/region';
import { ProductID } from '@/types/product';

const getRegionByRegionCode = (regionCode: string | null): Region | undefined => {
  return allRegions.find((region) => region.code === regionCode);
};

const getRegionScopeByRegionCode = (regionCode: string): RegionScope | undefined => {
  return getRegionByRegionCode(regionCode)?.scope;
};

const getRegionTitleByRegionCode = (regionCode: string | null): string | undefined => {
  return getRegionByRegionCode(regionCode)?.title;
};

const getRegionListByProductId = (productId: ProductID): RegionCategories | undefined => {
  return productRegionMap[productId];
};

const isProductAvailableInRegion = (regionCode: string | null, productId: ProductID): boolean => {
  if (!regionCode) {
    return false;
  }

  const regionList = getRegionListByProductId(productId);

  if (!regionList) {
    return false;
  }

  const allRegions = [...regionList.state, ...regionList.local];

  return allRegions.includes(regionCode);
};

export {
  getRegionByRegionCode,
  getRegionTitleByRegionCode,
  getRegionScopeByRegionCode,
  getRegionListByProductId,
  isProductAvailableInRegion,
};
