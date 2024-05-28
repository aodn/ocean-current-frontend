import { RegionScope } from '@/constants/region';
import { Region } from '@/types/map';
import { allRegions } from '@/data/regionData';
import { productRegionMap } from '@/data/regionList';
import { RegionCategories } from '@/types/region';

const getRegionByRegionTitle = (regionTitle: string): Region | undefined => {
  return allRegions.find((region) => region.title === regionTitle);
};

const getRegionScopeByRegionTitle = (regionName: string): RegionScope | undefined => {
  return getRegionByRegionTitle(regionName)?.scope;
};

const getRegionNameByRegionTitle = (regionTitle: string): string | undefined => {
  return getRegionByRegionTitle(regionTitle)?.region;
};

const getRegionListByProductId = (productId: string): RegionCategories | undefined => {
  return productRegionMap[productId];
};

export { getRegionByRegionTitle, getRegionScopeByRegionTitle, getRegionNameByRegionTitle, getRegionListByProductId };
