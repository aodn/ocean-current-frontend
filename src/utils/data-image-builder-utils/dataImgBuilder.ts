import dayjs, { Dayjs } from 'dayjs';
import { productTypeMapping, TargetPathRegionScope } from '@/constants/imgPath';
import { RegionScope } from '@/constants/region';
import { imageBaseUrl, imageS3BaseUrl } from '@/configs/image';

type ProductId = string;
type SubProductType = string | undefined | null;

const getBaseUrlByProductId = (productId: ProductId): string =>
  productId === 'surfaceWaves' ? imageS3BaseUrl : imageBaseUrl;

const getTargetRegionScopePath = (regionScope: RegionScope): TargetPathRegionScope =>
  [RegionScope.Au, RegionScope.State].includes(regionScope) ? TargetPathRegionScope.State : TargetPathRegionScope.Local;

const validateProductAndSubProduct = (
  productId: ProductId,
  subProductType: SubProductType,
  regionScope: TargetPathRegionScope,
): void => {
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
};

const getProductSegment = (
  productId: ProductId,
  subProductType: SubProductType,
  regionScope: TargetPathRegionScope,
): string => {
  const productData = productTypeMapping.get(productId)!;
  const segment = regionScope === TargetPathRegionScope.State ? productData.stateSegment : productData.localSegment;
  let productSegment = segment ? `${segment}` : '';

  if (productId === 'monthlyMeans' && subProductType === 'CLIM_CNESCARS') {
    productSegment = '30d_MEAN_v1';
  }

  return productSegment;
};

const formatDate = (productId: ProductId, subProductType: SubProductType, date: string): string => {
  if (productId === 'monthlyMeans' && !subProductType) {
    return dayjs(date).format('YYYYMMDD');
  }
  const productData = productTypeMapping.get(productId)!;
  return dayjs(date).format(productData.dateFormat);
};

const buildProductImageUrl = (
  productId: ProductId,
  subProductType: SubProductType,
  regionName: string,
  regionScope: TargetPathRegionScope,
  date: string,
  isApi: boolean = false,
): string => {
  validateProductAndSubProduct(productId, subProductType, regionScope);

  const productSegment = getProductSegment(productId, subProductType, regionScope);
  const formattedDate = formatDate(productId, subProductType, date);
  const isProductOceanColourAndLocalRegion = productId === 'oceanColour' && regionScope === TargetPathRegionScope.Local;
  const isAdjustedSeaLevelAnomalyWithSST = productId === 'adjustedSeaLevelAnomaly' && !subProductType;

  let subProductSegment = '';
  let regionNameSegment = `/${regionName}`;
  let dateTimeSegment = formattedDate;

  if (isProductOceanColourAndLocalRegion) {
    regionNameSegment = `${regionName}_chl`;
    dateTimeSegment = `${formattedDate}04`;
  } else if (subProductType) {
    subProductSegment = `/${subProductType}`;
  }

  const baseUrl = getBaseUrlByProductId(productId);

  if (productId === 'surfaceWaves') {
    const dayjsDate = dayjs(date);
    const formattedDate = dayjsDate.format('YYYYMMDDHH');
    const year = dayjsDate.format('YYYY');
    const month = dayjsDate.format('MM');
    return `/s3/WAVES/y${year}/m${month}/${formattedDate}.gif`;
  }

  if (isApi) {
    return `/api/${productSegment}${subProductSegment}/${regionName}/${formattedDate}.gif`;
  }

  if (isAdjustedSeaLevelAnomalyWithSST) {
    return `${baseUrl}/${regionName}/${formattedDate}.gif`;
  }

  return subProductType
    ? `${baseUrl}/${productSegment}${subProductSegment}${regionNameSegment}/${dateTimeSegment}.gif`
    : `${baseUrl}/${productSegment}/${regionName}/${formattedDate}.gif`;
};

const buildProductVideoUrl = (
  productId: ProductId,
  subProductType: SubProductType,
  regionName: string,
  regionScope: TargetPathRegionScope,
  date: string,
): string => {
  validateProductAndSubProduct(productId, subProductType, regionScope);

  const productData = productTypeMapping.get(productId)!;
  const segment = regionScope === TargetPathRegionScope.State ? productData.stateSegment : productData.localSegment;
  const productSegment = segment ? `${segment}` : '';
  const subProductSegment = subProductType ? `/${subProductType}` : '';

  const year = dayjs(date).format('YYYY');
  const month = dayjs(date).format('MM');
  const quarter = `Q${Math.ceil((dayjs(date).month() + 1) / 3)}`;

  const baseUrl = getBaseUrlByProductId(productId);

  if (productId === 'surfaceWaves') {
    return `${imageBaseUrl}/s3.php?file=WAVES/y${year}/m${month}/Au_wave_m${month}.mp4`;
  }

  if (productId === 'fourHourSst') {
    return `${baseUrl}/${productSegment}/${subProductType}/${regionName}/${regionName}_${subProductType}_${year}${month}.mp4`;
  }
  if (productId === 'monthlyMeans') {
    return `${baseUrl}/${productSegment}/${regionName}/${regionName}.mp4`;
  }
  return `${baseUrl}/${productSegment}${subProductSegment}/${regionName}/${regionName}_${subProductType}_${year}_${quarter}.mp4`;
};

const buildArgoImageUrl = (worldMeteorologicalOrgId: string, date: Dayjs, cycle: string, depth: string): string => {
  const profiles = depth === '0' ? 'profiles' : 'profiles_s';
  const formatDate = dayjs(date).format('YYYYMMDD');
  return `${imageBaseUrl}/${profiles}/${worldMeteorologicalOrgId}/${formatDate}_${worldMeteorologicalOrgId}_${cycle}.gif`;
};

const buildSurfaceWavesImageUrl = (date: string, imgPath: string): string => {
  const dayjsDate = dayjs(date);
  const formattedDate = dayjsDate.format('YYYYMMDDHH');
  const year = dayjsDate.format('YYYY');
  const month = dayjsDate.format('MM');
  return `${imageS3BaseUrl}/${imgPath}/y${year}/m${month}/${formattedDate}.gif`;
};

export {
  getTargetRegionScopePath,
  buildProductImageUrl,
  buildArgoImageUrl,
  buildSurfaceWavesImageUrl,
  buildProductVideoUrl,
};
