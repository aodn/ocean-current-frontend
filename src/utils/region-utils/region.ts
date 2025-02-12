import { RegionScope } from '@/constants/region';
import { Region } from '@/types/map';
import { allRegions } from '@/data/regionData';
import { productRegionMap } from '@/data/regionList';
import { RegionCategories } from '@/types/region';

const getRegionByRegionTitleOrCode = (regionTitle: string | null): Region | undefined => {
  return allRegions.find((region) => region.title === regionTitle || region.code === regionTitle);
};

const getRegionScopeByRegionTitle = (regionTitle: string): RegionScope | undefined => {
  return getRegionByRegionTitleOrCode(regionTitle)?.scope;
};

const getRegionCodeByRegionTitle = (regionTitle: string): string | undefined => {
  return getRegionByRegionTitleOrCode(regionTitle)?.code;
};

const getRegionListByProductId = (productId: string): RegionCategories | undefined => {
  return productRegionMap[productId];
};

const isProductAvailableInRegion = (regionTitle: string | null, productId: string): boolean => {
  if (!regionTitle) {
    return false;
  }

  const region = getRegionByRegionTitleOrCode(regionTitle);
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
  getRegionByRegionTitleOrCode,
  getRegionScopeByRegionTitle,
  getRegionCodeByRegionTitle,
  getRegionListByProductId,
  isProductAvailableInRegion,
};
