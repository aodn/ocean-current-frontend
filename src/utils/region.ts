import { RegionScope } from '@/constants/region';
import { Region } from '@/types/map';
import { allRegions } from '@/data/regionData';

const getRegionByRegionTitle = (regionTitle: string): Region | undefined => {
  return allRegions.find((region) => region.title === regionTitle);
};

const getRegionScopeByRegionTitle = (regionName: string): RegionScope | undefined => {
  return getRegionByRegionTitle(regionName)?.scope;
};

const getRegionNameByRegionTitle = (regionTitle: string): string | undefined => {
  return getRegionByRegionTitle(regionTitle)?.region;
};

export { getRegionByRegionTitle, getRegionScopeByRegionTitle, getRegionNameByRegionTitle };
