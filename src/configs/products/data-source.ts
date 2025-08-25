import { ProductID } from '@/types/product';

/**
 * List of product IDs that should fetch from API
 * Add products here as they become API-ready
 */
export const API_ENABLED_PRODUCTS: ProductID[] = [
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
  'surfaceWaves-wave',
  'surfaceWaves-buoyTimeseries',
  'sealCtd-sealTracks',
  'sealCtd-timeseriesTemperature',
  'sealCtd-timeseriesSalinity',
  'sealCtdTags-timeseries',
  'sealCtdTags-ts',
  'sealCtdTags-temperature',
  'sealCtdTags-salinity',
  'sealCtdTags-10days',
  'argo',
];

/**
 * List of product IDs that will always use fixed data regardless of API implementation
 * These are typically products with simple monthly data or other special cases
 */
export const FIXED_DATA_PRODUCTS: ProductID[] = ['monthlyMeans-anomalies', 'monthlyMeans-CLIM_OFAM3_SSTAARS'];
