import { RegionScope } from '@/constants/region';
import { Region } from '@/types/map';
import { allRegions } from '@/data/regionData';
import { productRegionMap } from '@/data/regionList';
import { RegionCategories } from '@/types/region';

const getRegionByRegionTitle = (regionTitle: string | null): Region | undefined => {
  return allRegions.find((region) => region.title === regionTitle);
};

const getRegionScopeByRegionTitle = (regionTitle: string): RegionScope | undefined => {
  return getRegionByRegionTitle(regionTitle)?.scope;
};

const getRegionCodeByRegionTitle = (regionTitle: string): string | undefined => {
  return getRegionByRegionTitle(regionTitle)?.code;
};

const getRegionListByProductId = (productId: string): RegionCategories | undefined => {
  return productRegionMap[productId];
};

const isProductAvailableInRegion = (regionTitle: string | null, productId: string): boolean => {
  if (!regionTitle) {
    return false;
  }

  const region = getRegionByRegionTitle(regionTitle);
  if (!region) {
    return false;
  }

  const regionList = getRegionListByProductId(productId);

  if (!regionList) {
    return false;
  }

  const allRegions = [...regionList.state, ...regionList.local];

  return allRegions.includes(region.code);
};

export {
  getRegionByRegionTitle,
  getRegionScopeByRegionTitle,
  getRegionCodeByRegionTitle,
  getRegionListByProductId,
  isProductAvailableInRegion,
};
