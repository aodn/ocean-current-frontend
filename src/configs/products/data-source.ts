import { ProductID, RootProductID } from '@/types/product';

/**
 * List of product IDs that should fetch from API
 * Add products here as they become API-ready
 */
export const API_IMAGE_LIST_ENABLED_PRODUCTS: ProductID[] = [
  'fourHourSst-sstFilled',
  'fourHourSst-sst',
  'fourHourSst-sstAge',
  'fourHourSst-windSpeed',
  'sixDaySst-sst',
  'sixDaySst-sstAnomaly',
  'sixDaySst-centiles',
  'oceanColour-chlA',
  'oceanColour-chlAAge',
  'adjustedSeaLevelAnomaly-sla',
  'adjustedSeaLevelAnomaly-centiles',
  'adjustedSeaLevelAnomaly-sst',
  'adjustedSeaLevelAnomaly-nonTidalSla',
  'surfaceWaves-wave',
  'surfaceWaves-buoyTimeseries',
  'tidalCurrents-sl',
  'tidalCurrents-spd',
  'sealCtd-sealTracks',
  'sealCtd-timeseriesTemperature',
  'sealCtd-timeseriesSalinity',
  'sealCtdTags-timeseries',
  'sealCtdTags-ts',
  'sealCtdTags-temperature',
  'sealCtdTags-salinity',
  'sealCtdTags-10days',
  'swotGsla-ssh',
  'EACMooringArray',
  'argo',
  'fishSOOP-profiles',
  'fishSOOP-quarterlyAnomalies',
  'fishSOOP-depthAnomalies',
];

export const API_LATEST_DATES_DISABLED_PRODUCTS: ProductID[] = [
  'currentMeters-mooredInstrumentArray',
  'currentMeters-shelf',
  'currentMeters-deepADCP',
  'currentMeters-deepADV',
  'currentMeters-southernOcean',
  'monthlyMeans-30day',
  'monthlyMeans-climatology',
  'sixDaySst-climatology',
  'sixDaySst-climatologyDataCount',
  'fishSOOP-quarterlyAnomalies',
  'fishSOOP-depthAnomalies',
];

/**
 * List of product IDs that will always use fixed data regardless of API implementation
 * These are typically products with simple monthly data or other special cases
 */
export const FIXED_IMAGE_LIST_PRODUCTS: ProductID[] = [
  'monthlyMeans-30day',
  'monthlyMeans-climatology',
  'sixDaySst-climatology',
  'sixDaySst-climatologyDataCount',
  'swotGsla-mdt',
  // Region-less FishSOOP anomaly products: their image lists are fetched without a
  // region param via useFishSoopAnomalyImageList, not the generic date-list query.
  'fishSOOP-quarterlyAnomalies',
  'fishSOOP-depthAnomalies',
];

export const PRODUCTS_WITH_ARGO_DATA: RootProductID[] = [
  'fourHourSst',
  'sixDaySst',
  'oceanColour',
  'adjustedSeaLevelAnomaly',
  'argo',
  'EACMooringArray',
  'sealCtd',
  'swotGsla',
];
