import dayjs, { Dayjs } from 'dayjs';
import { productTypeMapping, TargetPathRegionScope } from '@/constants/imgPath';
import { RegionScope } from '@/constants/region';
import { imageBaseUrl, imageS3BaseUrl } from '@/configs/image';

const getBaseUrlByProductId = (productId: string) => (productId === 'surfaceWaves' ? imageS3BaseUrl : imageBaseUrl);

const getTargetRegionScopPath = (regionScope: RegionScope) => {
  return [RegionScope.Au, RegionScope.State].includes(regionScope)
    ? TargetPathRegionScope.State
    : TargetPathRegionScope.Local;
};

const buildProductImageUrl = (
  productId: string,
  subProductType: string | undefined | null,
  regionName: string,
  regionScope: TargetPathRegionScope,
  date: string,
  isApi: boolean = false,
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

  let productSegment = segment ? `${segment}` : '';

  if (productId === 'monthlyMeans' && subProductType === 'CLIM_CNESCARS') productSegment = '30d_MEAN_v1';

  let formattedDate: string;
  if (productId === 'monthlyMeans' && !subProductType) {
    formattedDate = dayjs(date).format('YYYYMMDD');
  } else {
    formattedDate = dayjs(date).format(productData.dateFormat);
  }

  let subProductSegment = '';
  let regionNameSegment = `/${regionName}`;
  let dateTimeSegment = formattedDate;

  const isProductOceanColourAndLocalRegion = productId === 'oceanColour' && regionScope === TargetPathRegionScope.Local;
  if (isProductOceanColourAndLocalRegion) {
    regionNameSegment = `${regionName}_chl`;
    // TODO: remove hardcoded time
    dateTimeSegment = `${formattedDate}04`;
  } else if (subProductType) {
    subProductSegment = `/${subProductType}`;
  }

  const baseUrl = getBaseUrlByProductId(productId);

  if (isApi) {
    return `/api/${productSegment}${subProductSegment}/${regionName}/${formattedDate}.gif`;
  } else {
    return subProductType
      ? `${baseUrl}/${productSegment}${subProductSegment}${regionNameSegment}/${dateTimeSegment}.gif`
      : `${baseUrl}/${productSegment}/${regionName}/${formattedDate}.gif`;
  }
};

const buildProductVideoUrl = (
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

  const year = dayjs(date).format('YYYY');
  const month = dayjs(date).format('MM');
  const quarter = `Q${Math.ceil((dayjs(date).month() + 1) / 3)}`;

  if (productId === 'fourHourSst')
    return `${getBaseUrlByProductId(productId)}/${productSegment}/${subProductType}/${regionName}/${regionName}_${subProductType}_${year}${month}.mp4`;
  else if (productId === 'monthlyMeans')
    return `${getBaseUrlByProductId(productId)}/${productSegment}/${regionName}/${regionName}.mp4`;
  else
    return `${getBaseUrlByProductId(productId)}/${productSegment}${subProductSegment}/${regionName}/${regionName}_${subProductType}_${year}_${quarter}.mp4`;
};

const buildArgoImageUrl = (worldMeteorologicalOrgId: string, date: Dayjs, cycle: string, depth: string) => {
  const profiles = depth === '0' ? 'profiles' : 'profiles_s';
  const formatDate = dayjs(date).format('YYYYMMDD');
  return `${imageBaseUrl}/${profiles}/${worldMeteorologicalOrgId}/${formatDate}_${worldMeteorologicalOrgId}_${cycle}.gif`;
};

const buildSurfaceWavesImageUrl = (date: string) => {
  const dayjsDate = dayjs(date);

  const formattedDate = dayjsDate.format('YYYYMMDDHH');
  const year = dayjsDate.format('YYYY');
  const month = dayjsDate.format('MM');
  return `${imageS3BaseUrl}/WAVES/y${year}/m${month}/${formattedDate}.gif`;
};

export {
  getTargetRegionScopPath,
  buildProductImageUrl,
  buildArgoImageUrl,
  buildSurfaceWavesImageUrl,
  buildProductVideoUrl,
};
