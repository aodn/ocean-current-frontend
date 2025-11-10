import dayjs, { Dayjs } from 'dayjs';
import { RegionScope } from '@/constants/region';
import { imageUrlConfig } from '@/configs/image';
import { CurrentMetersDepth, CurrentMetersProperty, CurrentMetersRegion } from '@/constants/currentMeters';
import { ArgoDepths } from '@/constants/argo';
import { DateFormat, OceanColourDateItem } from '@/types/date';
import { AnyProductID, ProductID, RootProductID } from '@/types/product';
import { apiConfig } from '@/configs/api';
import { ImageListResponse } from '@/types/imageList';
import { findLeafFlatProductById } from '../product-utils/product';

type ProductVideoUrlBuilder = Partial<Record<RootProductID, string>> & {
  default: string;
};

const getBaseUrlByProductId = (productId: AnyProductID): string =>
  productId === 'surfaceWaves' ? imageUrlConfig.imageS3BaseUrl : imageUrlConfig.imageBaseUrl;

const getTargetRegionScopePath = (regionScope: RegionScope): RegionScope =>
  [RegionScope.Au, RegionScope.State].includes(regionScope) ? RegionScope.State : RegionScope.Local;

const validateProductAndSubProduct = (productId: ProductID, regionScope: RegionScope): void => {
  const productData = findLeafFlatProductById(productId);
  if (!productData) {
    throw new Error(`Product type ${productId} is not supported`);
  }

  if (regionScope === RegionScope.State && productData.stateSegment === undefined) {
    throw new Error(`Product ${productId} does not support state region`);
  }
};

const getProductSegmentByProductId = (productId: ProductID, regionScope: RegionScope): string => {
  const product = findLeafFlatProductById(productId);

  if (!product) {
    throw new Error(`Product with id ${productId} not found`);
  }

  if (productId === 'monthlyMeans-CLIM_CNESCARS') {
    return '30d_MEAN_v1';
  }

  const segment = regionScope === RegionScope.State ? product.stateSegment : product.localSegment;
  return segment ? `${segment}` : '';
};

const formatDateByProductId = (productId: ProductID, date: string, regionScope: RegionScope): string => {
  const product = findLeafFlatProductById(productId);

  if (!product) {
    throw new Error(`Product with id ${productId} not found`);
  }

  if (productId === 'monthlyMeans-anomalies') {
    const inputDate = dayjs(date);
    const currentDate = dayjs();

    // Only check if before 15th for the current month
    if (inputDate.month() === currentDate.month() && inputDate.year() === currentDate.year()) {
      if (inputDate.date() < 15) {
        // If current month and before the 15th, return the 15th of last month
        return inputDate.subtract(1, 'month').date(15).format(DateFormat.DAY);
      }
    }

    // For past months or current month on/after the 15th, return the 15th of that month
    return inputDate.date(15).format(DateFormat.DAY);
  }

  if (
    (productId === 'adjustedSeaLevelAnomaly-sla' && regionScope === RegionScope.Local) ||
    productId === 'adjustedSeaLevelAnomaly-nonTidalSla'
  ) {
    return dayjs(date).format(DateFormat.HOUR);
  }

  const dateFormat = product.dateFormat
    ? regionScope === RegionScope.State
      ? product.dateFormat.stateFormat
      : product.dateFormat.localFormat
    : DateFormat.DAY;

  return dayjs(date).format(dateFormat || DateFormat.DAY);
};

const buildProductImageUrl = (
  productId: ProductID,
  regionCode: string,
  regionScope: RegionScope,
  date: string,
  isProxyRequired: boolean = false,
): string => {
  const product = findLeafFlatProductById(productId);

  if (!product) {
    throw new Error(`Product with id ${productId} not found`);
  }

  const productSegment = getProductSegmentByProductId(productId, regionScope);
  const formattedDate = formatDateByProductId(productId, date, regionScope);

  // Determine the root product ID for base URL selection
  const rootProductId = product.parentId || productId;
  const remoteBaseUrl = getBaseUrlByProductId(rootProductId as RootProductID);
  const productUrl = {
    surfaceWaves: () => {
      const dayjsDate = dayjs(date);
      const formattedDate = dayjsDate.format(DateFormat.HOUR);
      const year = dayjsDate.format(DateFormat.YEAR_ONLY);
      const month = dayjsDate.format(DateFormat.MONTH_ONLY);

      const baseUrl = isProxyRequired ? apiConfig.s3ProxyURL : remoteBaseUrl;
      return `${baseUrl}/WAVES/y${year}/m${month}/${formattedDate}.gif`;
    },
    oceanColourLocal: () => {
      const dateTimeSegment = dayjs(date).format(DateFormat.HOUR);
      const baseUrl = isProxyRequired ? apiConfig.ec2ProxyURL : remoteBaseUrl;
      return `${baseUrl}/${regionCode}_chl/${dateTimeSegment}.gif`;
    },
    adjustedSeaLevelAnomaly: () => {
      const updatedRegionCode = regionCode === 'Au' ? 'ht' : regionCode;
      const baseUrl = isProxyRequired ? apiConfig.ec2ProxyURL : remoteBaseUrl;
      return `${baseUrl}/${updatedRegionCode}/${formattedDate}.gif`;
    },
    EACMooringArray: () => {
      const baseUrl = isProxyRequired ? apiConfig.ec2ProxyURL : remoteBaseUrl;
      return `${baseUrl}/EAC_array_figures/SST/Brisbane/${formattedDate}.gif`;
    },
    default: () => {
      const subProductSegment = product.imgPath ? `/${product.imgPath}` : '';
      const baseUrl = isProxyRequired ? apiConfig.ec2ProxyURL : remoteBaseUrl;
      return `${baseUrl}/${productSegment}${subProductSegment}/${regionCode}/${formattedDate}.gif`;
    },
  };

  if (productId === 'surfaceWaves-wave') {
    return productUrl.surfaceWaves();
  }

  if (productId.startsWith('oceanColour-') && regionScope === RegionScope.Local) {
    return productUrl.oceanColourLocal();
  }

  if (productId === 'adjustedSeaLevelAnomaly-sst') {
    return productUrl.adjustedSeaLevelAnomaly();
  }

  if (productId === 'EACMooringArray') {
    return productUrl.EACMooringArray();
  }

  return productUrl.default();
};

const buildProductVideoUrl = (
  productId: ProductID,
  regionCode: string,
  regionScope: RegionScope,
  date: string,
  isProxyRequired: boolean = false,
): string => {
  const productData = findLeafFlatProductById(productId);

  if (!productData) {
    throw new Error(`Product with id ${productId} not found`);
  }

  const segment = regionScope === RegionScope.State ? productData.stateSegment : productData.localSegment;
  const productSegment = segment ? `${segment}` : '';
  const subProductSegment = productData.imgPath ? `/${productData.imgPath}` : '';
  const imgPath = productData.imgPath ?? '';

  const year = dayjs(date).format(DateFormat.YEAR_ONLY);
  const month = dayjs(date).format(DateFormat.MONTH_ONLY);
  const quarter = `Q${Math.ceil((dayjs(date).month() + 1) / 3)}`;

  // Determine the root product ID for base URL selection
  const rootProductId = productData.parentId || productId;
  const remoteBaseUrl = getBaseUrlByProductId(rootProductId as RootProductID);

  // Use proxy URLs for development/cross-origin requests
  const baseUrl = (() => {
    if (!isProxyRequired) {
      return remoteBaseUrl;
    }
    return productId === 'surfaceWaves-wave' ? apiConfig.s3ProxyURL : apiConfig.ec2ProxyURL;
  })();

  const productUrl: ProductVideoUrlBuilder = {
    surfaceWaves: `${baseUrl}/WAVES/y${year}/m${month}/Au_wave_m${month}.mp4`,
    fourHourSst: `${baseUrl}/${productSegment}/${imgPath}/${regionCode}/${regionCode}_${imgPath}_${year}${month}.mp4`,
    monthlyMeans: `${baseUrl}/${productSegment}/${regionCode}/${regionCode}.mp4`,
    default: `${baseUrl}/${productSegment}${subProductSegment}/${regionCode}/${regionCode}_${imgPath}_${year}_${quarter}.mp4`,
  };

  if (productId === 'sealCtd-sealTracks') {
    const sealCtdRegionCode = regionCode === 'GAB-Seal' ? 'GAB' : regionCode;

    return `${baseUrl}/AATAMS/${sealCtdRegionCode}/tracks/tracks_${year}.mp4`;
  }

  if (productId.startsWith('oceanColour-') && regionScope === RegionScope.Local) {
    return `${baseUrl}/${regionCode}_chl/${regionCode}_chl${dayjs(date).format(DateFormat.MONTH)}.mp4`;
  }

  if (productId === 'EACMooringArray') {
    return `${baseUrl}/EAC_array_figures/SST/Brisbane/Brisbane_SST_${year}_${quarter}.mp4`;
  }

  return productUrl[productData.parentId as keyof typeof productUrl] || productUrl.default;
};

const buildSSTTimeseriesImageUrl = (region: string) => {
  return `${imageUrlConfig.imageBaseUrl}/MM_SSTA/MMA/${region}_Anomaly_1993-latest.gif`;
};

const buildEACMooringArrayImageUrl = (date: Dayjs) => {
  return `${imageUrlConfig.imageBaseUrl}/EAC_array_figures/SST/Brisbane/${date.format(DateFormat.DAY)}.gif`;
};

const buildArgoImageUrl = (worldMeteorologicalOrgId: string, date: Dayjs, cycle: string, depth: string): string => {
  const profiles = depth === ArgoDepths['2000M'] ? 'profiles' : 'profiles_s';
  const formatDate = dayjs(date).format(DateFormat.DAY);
  return `${imageUrlConfig.imageBaseUrl}/${profiles}/${worldMeteorologicalOrgId}/${formatDate}_${worldMeteorologicalOrgId}_${cycle}.gif`;
};

const buildCurrentMetersMapImageUrl = (
  region: CurrentMetersRegion,
  date: string,
  property: CurrentMetersProperty,
  depth: CurrentMetersDepth,
): string => {
  const formattedYear = date === '0000' ? '' : `_${date}`;

  return `${imageUrlConfig.imageBaseUrl}/timeseries/ANMN_P49/mapst/${region}_${property}_${depth}${formattedYear}.gif`;
};

const buildCurrentMetersDataImageUrl = (deploymentPlotPath: string, plotId: string) => {
  return `${imageUrlConfig.imageBaseUrl}${deploymentPlotPath}/${plotId}.gif`;
};

const buildSurfaceWavesImageUrl = (date: Dayjs): string => {
  const formattedDate = date.format(DateFormat.HOUR);
  const year = date.format(DateFormat.YEAR_ONLY);
  const month = date.format(DateFormat.MONTH_ONLY);
  return `${imageUrlConfig.imageS3BaseUrl}/WAVES/y${year}/m${month}/${formattedDate}.gif`;
};

const buildSurfaceWavesBuoyTimeseriesImageUrl = (buoyRegion: string, date: Dayjs): string => {
  const formattedDate = date.format('YYYYMMDD[T]HH00');
  const year = date.format(DateFormat.YEAR_ONLY);
  const month = date.format(DateFormat.MONTH_ONLY);
  const formattedBuoyLocation = encodeURIComponent(buoyRegion.replaceAll('_', ' '));

  return `${imageUrlConfig.imageS3BaseUrl}/WAVES_TS/${formattedBuoyLocation}/y${year}/m${month}/${formattedDate}_BuoyTS.png`;
};

const buildTidalCurrentsMapImageUrl = (
  region: string,
  date: Dayjs,
  tidalCurrentsImageData?: ImageListResponse[],
): string => {
  if (region === 'Aust') return `${imageUrlConfig.imageBaseUrl}/tides/tidemapindex.gif`;
  const formattedDate = date.format(DateFormat.MINUTE);
  const path =
    tidalCurrentsImageData?.find((item) => item.files.some((e) => e.name === `${formattedDate}.gif`))?.path ?? '';
  // TODO: year needed to be determined https://github.com/aodn/backlog/issues/7428
  return `${imageUrlConfig.imageBaseUrl}/${path}/${formattedDate}.gif`;
};

const buildTidalCurrentsTagFileUrl = (region: string, subProduct: string, date: Dayjs): string => {
  const prodFolder = subProduct === 'tidalCurrents-spd' ? 'spd' : 'hv';
  const formattedDate = date.format(DateFormat.MINUTE);
  const year = date.format(DateFormat.YEAR_ONLY);

  return `tides/${region}_${prodFolder}/${year}/${formattedDate}.txt`;
};

const buildTidalCurrentsDataImageUrl = (point: string, date: Dayjs): string => {
  const formattedDate = date.format(DateFormat.MONTH);

  return `${imageUrlConfig.imageBaseUrl}/tides/monthplots/${point}_${formattedDate}.gif`;
};

const buildSealCtdMapImageUrl = (region: string, date: Dayjs): string => {
  const formattedRegion = region === 'GAB-Seal' ? 'GAB' : region;

  return `${imageUrlConfig.imageBaseUrl}/AATAMS/${formattedRegion}/tracks/${date.format(DateFormat.DAY)}.gif`;
};

// the imageBaseUrl is not included below as we need to validate the image urls and will need to be added in once API is implemented
const buildSealCtdGraphImageUrl = (region: string, date: Dayjs, subProduct: string, page: number = 0): string => {
  if (subProduct === 'sealCtd-timeseriesTemperature') {
    if (region === 'GAB-Seal') {
      const currYear = date.format(DateFormat.YEAR_ONLY);
      const prevYear = date.subtract(1, 'year').format(DateFormat.YEAR_ONLY);
      return `/AATAMS/GAB/timeseries/T_${prevYear}_${currYear}_p${page}.gif`;
    }
    return `/AATAMS/${region}/timeseries/T_${date.format(DateFormat.YEAR_ONLY)}_p${page}.gif`;
  }

  // subProduct === 'sealCtd-timeseriesSalinity'
  if (region === 'GAB-Seal') {
    const currYear = date.format(DateFormat.YEAR_ONLY);
    const prevYear = date.subtract(1, 'year').format(DateFormat.YEAR_ONLY);
    return `/AATAMS/GAB/timeseries/S_${prevYear}_${currYear}_p${page}.gif`;
  }
  return `/AATAMS/${region}/timeseries/S_${date.format(DateFormat.YEAR_ONLY)}_p${page}.gif`;
};

const buildSealCtdTagsDataImageUrl = (sealTagId: string, date: Dayjs, productId: ProductID): string => {
  const type = productId.split('-')[1];
  if (type === '10days') {
    return `${imageUrlConfig.imageBaseUrl}/AATAMS/SATTAGS/${sealTagId}/10days/${date.format(DateFormat.DAY)}.gif`;
  }

  const filename = () => {
    switch (type) {
      case 'temperature':
        return 'T';
      case 'salinity':
        return 'S';
      case 'ts':
        return 'TS';
      default:
        return 'timeseries';
    }
  };

  return `${imageUrlConfig.imageBaseUrl}/AATAMS/SATTAGS/${sealTagId}/${filename()}.gif`;
};

const buildOceanColourImageUrl = (
  regionCode: string,
  date: string,
  dateFormat: DateFormat,
  dateList: OceanColourDateItem[],
  isProxyRequired: boolean = false,
): string => {
  const formattedDate = dayjs(date).format(dateFormat);
  const baseUrl = isProxyRequired ? apiConfig.ec2ProxyURL : imageUrlConfig.imageBaseUrl;

  const dateItem = dateList.find((item) => item.date === formattedDate);

  if (dateItem && dateItem.path) {
    // Use the path from the API response (e.g., "/TimorP_chl" or "/TimorP_chl/2024")
    return `${baseUrl}${dateItem.path}/${formattedDate}.gif`;
  }

  return `${baseUrl}/${regionCode}_chl/${formattedDate}.gif`;
};

export {
  getTargetRegionScopePath,
  getProductSegmentByProductId,
  formatDateByProductId,
  validateProductAndSubProduct,
  buildProductImageUrl,
  buildOceanColourImageUrl,
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
  buildSealCtdMapImageUrl,
  buildSealCtdGraphImageUrl,
  buildSealCtdTagsDataImageUrl,
  buildSurfaceWavesBuoyTimeseriesImageUrl,
};
