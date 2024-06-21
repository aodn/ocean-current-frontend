import { RegionScope } from '@/constants/region';
import { Region } from '@/types/map';
import { allRegions } from '@/data/regionData';
import { productRegionMap } from '@/data/regionList';
import { RegionCategories } from '@/types/region';

const getRegionByRegionTitle = (regionTitle: string): Region | undefined => {
  return allRegions.find((region) => region.title === regionTitle);
};

const getRegionScopeByRegionTitle = (regionTitle: string): RegionScope | undefined => {
  return getRegionByRegionTitle(regionTitle)?.scope;
};

const getRegionNameByRegionTitle = (regionTitle: string): string | undefined => {
  return getRegionByRegionTitle(regionTitle)?.region;
};

const getRegionListByProductId = (productId: string): RegionCategories | undefined => {
  return productRegionMap[productId];
};

const isProductAvailableInRegion = (regionTitle: string, productId: string): boolean => {
  const region = getRegionByRegionTitle(regionTitle);
  if (!region) {
    return false;
  }

  const regionList = getRegionListByProductId(productId);

  if (!regionList) {
    return false;
  }

  const allRegions = [...regionList.state, ...regionList.local];

  return allRegions.includes(region.region);
};

export {
  getRegionByRegionTitle,
  getRegionScopeByRegionTitle,
  getRegionNameByRegionTitle,
  getRegionListByProductId,
  isProductAvailableInRegion,
};
