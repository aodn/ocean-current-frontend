import dayjs, { Dayjs } from 'dayjs';
import { productTypeMapping, TargetPathRegionScope } from '@/constants/imgPath';
import { RegionScope } from '@/constants/region';
import { imageBaseUrl, imageS3BaseUrl } from '@/configs/image';
import {
  CurrentMetersDepth,
  CurrentMetersPlotPath,
  CurrentMetersProperty,
  CurrentMetersRegion,
  CurrentMetersSubproductsKeyType,
} from '@/constants/currentMeters';
import { CurrentMetersDeploymentPlotNames } from '@/types/currentMeters';
import { ArgoDepths } from '@/constants/argo';
import { DateFormat } from '@/types/date';

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
    return dayjs(date).format(DateFormat.DAY);
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
      const formattedDate = dayjsDate.format(DateFormat.HOUR);
      const year = dayjsDate.format(DateFormat.YEAR_ONLY);
      const month = dayjsDate.format(DateFormat.MONTH_ONLY);
      return `/s3/WAVES/y${year}/m${month}/${formattedDate}.gif`;
    },
    oceanColourLocal: () => {
      const dateTimeSegment = dayjs(date).format(DateFormat.HOUR);
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

  const year = dayjs(date).format(DateFormat.YEAR_ONLY);
  const month = dayjs(date).format(DateFormat.MONTH_ONLY);
  const quarter = `Q${Math.ceil((dayjs(date).month() + 1) / 3)}`;

  const baseUrl = getBaseUrlByProductId(productId);

  const productUrl = {
    surfaceWaves: `${imageBaseUrl}/s3.php?file=WAVES/y${year}/m${month}/Au_wave_m${month}.mp4`,
    fourHourSst: `${baseUrl}/${productSegment}/${subProductType}/${regionName}/${regionName}_${subProductType}_${year}${month}.mp4`,
    monthlyMeans: `${baseUrl}/${productSegment}/${regionName}/${regionName}.mp4`,
    default: `${baseUrl}/${productSegment}${subProductSegment}/${regionName}/${regionName}_${subProductType}_${year}_${quarter}.mp4`,
  };

  if (productId === 'sealCtd' && subProductType === 'tracks') {
    let sealCtdRegionName = regionName;
    if (regionName === 'Antarctica') {
      sealCtdRegionName = 'POLAR';
    }
    if (regionName === 'GAB-Seal') {
      sealCtdRegionName = 'GAB';
    }

    return `${baseUrl}/AATAMS/${sealCtdRegionName}/${subProductType}/tracks_${year}.mp4`;
  }

  if (productId === 'oceanColour' && regionScope === TargetPathRegionScope.Local) {
    return `${baseUrl}/${regionName}_chl/${regionName}_chl${dayjs(date).format(DateFormat.MONTH)}.mp4`;
  }

  return productUrl[productId as keyof typeof productUrl] || productUrl.default;
};

const buildSSTTimeseriesImageUrl = (region: string) => {
  return `${imageBaseUrl}/MM_SSTA/MMA/${region}_Anomaly_1993-latest.gif`;
};

const buildEACMooringArrayImageUrl = (date: Dayjs) => {
  return `${imageBaseUrl}/EAC_array_figures/SST/Brisbane/${date.format(DateFormat.DAY)}.gif`;
};

const buildArgoImageUrl = (worldMeteorologicalOrgId: string, date: Dayjs, cycle: string, depth: string): string => {
  const profiles = depth === ArgoDepths['2000M'] ? 'profiles' : 'profiles_s';
  const formatDate = dayjs(date).format(DateFormat.DAY);
  return `${imageBaseUrl}/${profiles}/${worldMeteorologicalOrgId}/${formatDate}_${worldMeteorologicalOrgId}_${cycle}.gif`;
};

const buildCurrentMetersMapImageUrl = (
  region: CurrentMetersRegion,
  date: string,
  property: CurrentMetersProperty,
  depth: CurrentMetersDepth,
): string => {
  const formattedYear = date === '0000' ? '' : `_${date}`;

  return `${imageBaseUrl}/timeseries/ANMN_P49/mapst/${region}_${property}_${depth}${formattedYear}.gif`;
};

const buildCurrentMetersDataImageUrl = (
  subProduct: CurrentMetersSubproductsKeyType,
  deploymentPlot: CurrentMetersDeploymentPlotNames,
  type: CurrentMetersPlotPath,
  plotId: string,
) => {
  const folder = subProduct === 'currentMeters-shelf' ? 'ANMN_P49' : 'ANMN_P48';

  return `${imageBaseUrl}/timeseries/${folder}/${deploymentPlot}/${type}/${plotId}.gif`;
};

const buildSurfaceWavesImageUrl = (date: string, imgPath: string): string => {
  const dayjsDate = dayjs(date);
  const formattedDate = dayjsDate.format(DateFormat.HOUR);
  const year = dayjsDate.format(DateFormat.YEAR_ONLY);
  const month = dayjsDate.format(DateFormat.MONTH_ONLY);
  return `${imageS3BaseUrl}/${imgPath}/y${year}/m${month}/${formattedDate}.gif`;
};

const buildTidalCurrentsMapImageUrl = (region: string, subProduct: string, date: Dayjs): string => {
  if (region === 'Australia') return `${imageBaseUrl}/tides/tidemapindex.gif`;

  const prodFolder = subProduct === 'tidalCurrents-spd' ? 'spd' : 'hv';
  const formattedDate = date.format(DateFormat.MINUTE);
  const year = date.format(DateFormat.YEAR_ONLY);

  return `${imageBaseUrl}/tides/${region}_${prodFolder}/${year}/${formattedDate}.gif`;
};

const buildTidalCurrentsTagFileUrl = (region: string, subProduct: string, date: Dayjs): string => {
  const prodFolder = subProduct === 'tidalCurrents-spd' ? 'spd' : 'hv';
  const formattedDate = date.format(DateFormat.MINUTE);
  const year = date.format(DateFormat.YEAR_ONLY);

  return `tides/${region}_${prodFolder}/${year}/${formattedDate}.txt`;
};

const buildTidalCurrentsDataImageUrl = (point: string, date: Dayjs): string => {
  const formattedDate = date.format(DateFormat.MONTH);

  return `${imageBaseUrl}/tides/monthplots/${point}_${formattedDate}.gif`;
};

// the imageBaseUrl is not included below as we need to validate the image urls and will need to be added in once API is implemented
const buildSealCtdImageUrl = (region: string, date: Dayjs, subProduct: string, page: number = 0): string => {
  const formattedRegion = region === 'Antarctica' ? 'POLAR' : region;

  if (subProduct === 'sealCtd-timeseriesTemperature') {
    return `/AATAMS/${formattedRegion}/timeseries/T_${date.format(DateFormat.YEAR_ONLY)}_p${page}.gif`;
  }

  if (subProduct === 'sealCtd-timeseriesSalinity') {
    return `/AATAMS/${formattedRegion}/timeseries/S_${date.format(DateFormat.YEAR_ONLY)}_p${page}.gif`;
  }

  return `${imageBaseUrl}/AATAMS/${formattedRegion}/tracks/${date.format(DateFormat.DAY)}.gif`;
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
  buildTidalCurrentsMapImageUrl,
  buildTidalCurrentsTagFileUrl,
  buildTidalCurrentsDataImageUrl,
  buildSealCtdImageUrl,
};
