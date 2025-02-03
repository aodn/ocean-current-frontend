import dayjs, { Dayjs } from 'dayjs';
import { productTypeMapping, TargetPathRegionScope } from '@/constants/imgPath';
import { RegionScope } from '@/constants/region';
import { imageBaseUrl, imageS3BaseUrl } from '@/configs/image';
import {
  CurrentMetersDepth,
  CurrentMetersPlotPath,
  CurrentMetersProperty,
  CurrentMetersRegion,
} from '@/constants/currentMeters';
import { CurrentMetersMapDataPointNames } from '@/types/currentMeters';

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
  if (productId === 'monthlyMeans' && subProductType === 'CLIM_CNESCARS') {
    return '30d_MEAN_v1';
  }
  return segment ? `${segment}` : '';
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
  const baseUrl = getBaseUrlByProductId(productId);

  const productUrl = {
    surfaceWaves: () => {
      const dayjsDate = dayjs(date);
      const formattedDate = dayjsDate.format('YYYYMMDDHH');
      const year = dayjsDate.format('YYYY');
      const month = dayjsDate.format('MM');
      return `/s3/WAVES/y${year}/m${month}/${formattedDate}.gif`;
    },
    oceanColourLocal: () => {
      const dateTimeSegment = dayjs(date).format('YYYYMMDDHH');
      return isApi
        ? `/api/${regionName}_chl/${dateTimeSegment}.gif`
        : `${baseUrl}/${regionName}_chl/${dateTimeSegment}.gif`;
    },
    adjustedSeaLevelAnomaly: () => {
      return isApi ? `/api/${regionName}/${formattedDate}.gif` : `${baseUrl}/${regionName}/${formattedDate}.gif`;
    },
    default: () => {
      const subProductSegment = subProductType ? `/${subProductType}` : '';
      return isApi
        ? `/api/${productSegment}${subProductSegment}/${regionName}/${formattedDate}.gif`
        : `${baseUrl}/${productSegment}${subProductSegment}/${regionName}/${formattedDate}.gif`;
    },
  };

  if (productId === 'surfaceWaves') {
    return productUrl.surfaceWaves();
  }

  if (productId === 'oceanColour' && regionScope === TargetPathRegionScope.Local) {
    return productUrl.oceanColourLocal();
  }

  if (productId === 'adjustedSeaLevelAnomaly' && !subProductType) {
    return productUrl.adjustedSeaLevelAnomaly();
  }

  return productUrl.default();
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

  const productUrl = {
    surfaceWaves: () => `${imageBaseUrl}/s3.php?file=WAVES/y${year}/m${month}/Au_wave_m${month}.mp4`,
    fourHourSst: () =>
      `${baseUrl}/${productSegment}/${subProductType}/${regionName}/${regionName}_${subProductType}_${year}${month}.mp4`,
    monthlyMeans: () => `${baseUrl}/${productSegment}/${regionName}/${regionName}.mp4`,
    default: () =>
      `${baseUrl}/${productSegment}${subProductSegment}/${regionName}/${regionName}_${subProductType}_${year}_${quarter}.mp4`,
  };

  if (productId === 'oceanColour' && regionScope === TargetPathRegionScope.Local) {
    return `${baseUrl}/${regionName}_chl/${regionName}_chl${dayjs(date).format('YYYYMM')}.mp4`;
  }

  return productUrl[productId as keyof typeof productUrl]?.() || productUrl.default();
};

const buildSSTTimeseriesImageUrl = (region: string) => {
  return `${imageBaseUrl}/MM_SSTA/MMA/${region}_Anomaly_1993-latest.gif`;
};

const buildEACMooringArrayImageUrl = (date: Dayjs) => {
  return `${imageBaseUrl}/EAC_array_figures/SST/Brisbane/${date.format('YYYYMMDD')}.gif`;
};

const buildArgoImageUrl = (worldMeteorologicalOrgId: string, date: Dayjs, cycle: string, depth: string): string => {
  const profiles = depth === '0' ? 'profiles' : 'profiles_s';
  const formatDate = dayjs(date).format('YYYYMMDD');
  return `${imageBaseUrl}/${profiles}/${worldMeteorologicalOrgId}/${formatDate}_${worldMeteorologicalOrgId}_${cycle}.gif`;
};

const buildCurrentMetersMapImageUrl = (
  region: CurrentMetersRegion = CurrentMetersRegion.Aust,
  date: string,
  property: CurrentMetersProperty,
  depth: CurrentMetersDepth,
): string => {
  const formattedYear = date === '0000' ? '' : `_${date}`;

  return `${imageBaseUrl}/timeseries/ANMN_P49/mapst/${region}_${property}_${depth}${formattedYear}.gif`;
};

const buildCurrentMetersDataImageUrl = (
  subProduct: string,
  deploymentPlot: string | CurrentMetersMapDataPointNames,
  type: CurrentMetersPlotPath,
  plotId: string,
) => {
  const folder = subProduct === 'currentMeters-shelf' ? 'ANMN_P49' : 'ANMN_P48';

  return `${imageBaseUrl}/timeseries/${folder}/${deploymentPlot}/${type}/${plotId}.gif`;
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
  buildCurrentMetersMapImageUrl,
  buildCurrentMetersDataImageUrl,
  buildSSTTimeseriesImageUrl,
  buildEACMooringArrayImageUrl,
};
