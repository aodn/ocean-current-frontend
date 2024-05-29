import dayjs, { Dayjs } from 'dayjs';
import { productTypeMapping, TargetPathRegionScope } from '@/constants/imgPath';
import { RegionScope } from '@/constants/region';
import { imageBaseUrl, imageS3BaseUrl } from '@/configs/image';

const getBaseUrlByProductId = (productId: string) => {
  if (productId === 'surfaceWaves') {
    return imageS3BaseUrl;
  }
  return imageBaseUrl;
};

const getTargetRegionScopPath = (regionScope: RegionScope) => {
  return [RegionScope.Au, RegionScope.State].includes(regionScope)
    ? TargetPathRegionScope.State
    : TargetPathRegionScope.Local;
};

const buildProductImageUrl = (
  productId: string,
  subProductType: string | undefined,
  regionName: string,
  regionScope: TargetPathRegionScope,
  date: string,
) => {
  const productData = productTypeMapping.get(productId);
  if (!productData) {
    throw new Error(`Product type ${productId} is not supported`);
  }
  if (subProductType && !productData.subProduct.includes(subProductType)) {
    throw new Error(`Sub product type ${subProductType} is not supported`);
  }
  if (regionScope === TargetPathRegionScope.State && productData.stateSegment === undefined) {
    throw new Error(`Product ${productId} does not support state region`);
  }

  const segment = regionScope === TargetPathRegionScope.State ? productData.stateSegment : productData.localSegment;

  const productSegment = segment ? `${segment}` : '';

  const subProductSegment = subProductType ? `/${subProductType}` : '';

  const formattedDate = dayjs(date).format(productData.dateFormat);

  const baseUrl = getBaseUrlByProductId(productId);

  return `${baseUrl}/${productSegment}${subProductSegment}/${regionName}/${formattedDate}.gif`;
};

const buildArgoImageUrl = (worldMeteorologicalOrgId: string, date: Dayjs, cycle: string, depth: string) => {
  const profiles = depth === '0' ? 'profiles' : 'profiles_s';
  const formatDate = dayjs(date).format('YYYYMMDD');
  return `${imageBaseUrl}/${profiles}/${worldMeteorologicalOrgId}/${formatDate}_${worldMeteorologicalOrgId}_${cycle}.gif`;
};

const buildSurfaceWavesImageUrl = (date: string) => {
  const formattedDate = dayjs(date).format('YYYYMMDDHH');
  const year = dayjs(date).format('YYYY');
  const month = dayjs(date).format('MM');
  return `${imageS3BaseUrl}/WAVES/y${year}/m${month}/${formattedDate}.gif`;
};

export { getTargetRegionScopPath, buildProductImageUrl, buildArgoImageUrl, buildSurfaceWavesImageUrl };
