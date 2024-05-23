import dayjs, { Dayjs } from 'dayjs';
import { productTypeMapping, TargetPathRegionScope } from '@/constants/imgPath';
import { RegionScope } from '@/constants/region';
import { imageBaseUrl } from '@/configs/image';

const getTargetRegionScopPath = (regionScope: RegionScope) => {
  return [RegionScope.Au, RegionScope.State].includes(regionScope)
    ? TargetPathRegionScope.State
    : TargetPathRegionScope.Local;
};

const buildProductImageUrl = (
  productType: string,
  subProductType: string,
  regionName: string,
  regionScope: TargetPathRegionScope,
  date: string,
) => {
  const productData = productTypeMapping.get(productType);
  if (!productData) {
    throw new Error(`Product type ${productType} is not supported`);
  }
  if (!productData.subProduct.includes(subProductType)) {
    throw new Error(`Sub product type ${subProductType} is not supported`);
  }
  if (regionScope === TargetPathRegionScope.State && productData.stateSegment === undefined) {
    throw new Error(`Product ${productType} does not support state region`);
  }

  const segment = regionScope === TargetPathRegionScope.State ? productData.stateSegment : productData.localSegment;

  const productSegment = segment ? `${segment}` : '';

  const subProductSegment = subProductType ? `/${subProductType}` : '';

  const formattedDate = dayjs(date).format(productData.dateFormat);

  return `${imageBaseUrl}/${productSegment}${subProductSegment}/${regionName}/${formattedDate}.gif`;
};

const buildArgoImageUrl = (worldMeteorologicalOrgId: string, date: Dayjs, cycle: string, depth: string) => {
  const profiles = depth === '0' ? 'profiles' : 'profiles_s';
  const formatDate = dayjs(date).format('YYYYMMDD');
  return `${imageBaseUrl}/${profiles}/${worldMeteorologicalOrgId}/${formatDate}_${worldMeteorologicalOrgId}_${cycle}.gif`;
};

export { getTargetRegionScopPath, buildProductImageUrl, buildArgoImageUrl };
