import { RegionScope } from '@/constants/region';
import { LocalRegion, Region } from '@/types/map';
import { allRegions, convertedEACMooringRegions, convertedSealCtdRegions, eACMooringRegions } from '@/data/regionData';
import { productRegionMap } from '@/data/regionList';
import { RegionCategories } from '@/types/region';
import { ProductGroupID, ProductID } from '@/types/product';

const getRegionByRegionCode = (regionCode: string | null, productId?: ProductID): Region | undefined => {
  const sealCtd: ProductGroupID = 'sealCtd';
  const eACMooring: ProductID = 'EACMooringArray';
  if (productId?.includes(eACMooring)) {
    return convertedEACMooringRegions.find((region) => region.code === regionCode);
  }
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

  if (productId === 'EACMooringArray') {
    return eACMooringRegions.map((r) => r.code).includes(regionCode as LocalRegion['code']);
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
