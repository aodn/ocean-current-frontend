import { RegionScope } from '@/constants/region';
import { Region } from '@/types/map';
import { allRegions, convertedSealCtdRegions } from '@/data/regionData';
import { productRegionMap } from '@/data/regionList';
import { RegionCategories } from '@/types/region';
import { ProductGroupID, ProductID } from '@/types/product';

const getRegionByRegionCode = (regionCode: string | null, productId?: ProductID): Region | undefined => {
  const sealCtd: ProductGroupID = 'sealCtd';
  if (productId?.includes(sealCtd)) {
    return convertedSealCtdRegions.find((region) => region.code === regionCode);
  }
  return allRegions.find((region) => region.code === regionCode);
};

const getRegionScopeByRegionCode = (regionCode: string, productId?: ProductID): RegionScope | undefined => {
  return getRegionByRegionCode(regionCode, productId)?.scope;
};

const getRegionTitleByRegionCode = (regionCode: string | null, productId?: ProductID): string | undefined => {
  return getRegionByRegionCode(regionCode, productId)?.title;
};

const getRegionListByProductId = (productId: ProductID): RegionCategories | undefined => {
  return productRegionMap[productId];
};

const isProductAvailableInRegion = (productId: ProductID, regionCode?: string | null): boolean => {
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

const codeToRegionTitle = (code: string) => {
  return allRegions.find((region) => region.code === code)?.title;
};

const titleToRegionCode = (title: string) => {
  return allRegions.find((region) => region.title === title)?.code;
};

export {
  getRegionByRegionCode,
  getRegionTitleByRegionCode,
  getRegionScopeByRegionCode,
  getRegionListByProductId,
  isProductAvailableInRegion,
  codeToRegionTitle,
  titleToRegionCode,
};
