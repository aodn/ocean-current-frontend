import { RegionScope } from '@/constants/region';
import { Region } from '@/types/map';
import { allRegions } from '@/data/regionData';

export const getRegionByRegionTitle = (regionTitle: string): Region | undefined => {
  return allRegions.find((region) => region.title === regionTitle);
};

export const getRegionScopeByRegionTitle = (regionName: string): RegionScope | undefined => {
  return getRegionByRegionTitle(regionName)?.scope;
};

export const getRegionNameByRegionTitle = (regionTitle: string): string | undefined => {
  return getRegionByRegionTitle(regionTitle)?.region;
};
