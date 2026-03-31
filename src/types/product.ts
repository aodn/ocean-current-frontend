import { DateConfig } from './date';

export type StandaloneProductID = 'argo' | 'EACMooringArray' | 'gliders' | 'myOceanCurrent' | 'fishSOOP';

export type ProductGroupID =
  | 'fourHourSst'
  | 'sixDaySst'
  | 'oceanColour'
  | 'adjustedSeaLevelAnomaly'
  | 'monthlyMeans'
  | 'tidalCurrents'
  | 'currentMeters'
  | 'sealCtd'
  | 'sealCtdTags'
  | 'surfaceWaves'
  | 'swotGsla';

// Child products (not at root level)
export type ChildProductID =
  // Four Hour SST children
  | 'fourHourSst-sstFilled'
  | 'fourHourSst-sst'
  | 'fourHourSst-sstAge'
  | 'fourHourSst-windSpeed'
  // Six Day SST children
  | 'sixDaySst-sst'
  | 'sixDaySst-sstAnomaly'
  | 'sixDaySst-centiles'
  | 'sixDaySst-timeseries'
  | 'sixDaySst-climatologySst'
  | 'sixDaySst-climatologyDataCount'
  // Ocean Colour children
  | 'oceanColour-chlA'
  | 'oceanColour-chlAAge'
  // Adjusted Sea Level Anomaly children
  | 'adjustedSeaLevelAnomaly-sla'
  | 'adjustedSeaLevelAnomaly-centiles'
  | 'adjustedSeaLevelAnomaly-sst'
  | 'adjustedSeaLevelAnomaly-nonTidalSla'
  // Monthly Means children
  | 'monthlyMeans-30day'
  | 'monthlyMeans-climatology'
  // | 'monthlyMeans-CLIM_CNESCARS' // This product was removed from the original site
  // Tidal Currents children
  | 'tidalCurrents-spd'
  | 'tidalCurrents-sl'
  // Current Meters children
  | 'currentMeters-mooredInstrumentArray'
  | 'currentMeters-shelf'
  | 'currentMeters-deepADCP'
  | 'currentMeters-deepADV'
  | 'currentMeters-southernOcean'
  // Seal CTD children
  | 'sealCtd-sealTracks'
  | 'sealCtd-timeseriesTemperature'
  | 'sealCtd-timeseriesSalinity'
  // Seal CTD Tags children
  | 'sealCtdTags-timeseries'
  | 'sealCtdTags-ts'
  | 'sealCtdTags-temperature'
  | 'sealCtdTags-salinity'
  | 'sealCtdTags-10days'
  // Surface Waves children
  | 'surfaceWaves-wave' // Main wave conditions view
  | 'surfaceWaves-buoyTimeseries'; // Buoy time series data

// Combined types
export type RootProductID = StandaloneProductID | ProductGroupID;
export type ProductID = StandaloneProductID | ChildProductID;
export type AnyProductID = StandaloneProductID | ProductGroupID | ChildProductID;

export const productGroupIDs: ProductGroupID[] = [
  'fourHourSst',
  'sixDaySst',
  'oceanColour',
  'adjustedSeaLevelAnomaly',
  'monthlyMeans',
  'tidalCurrents',
  'currentMeters',
  'sealCtd',
  'sealCtdTags',
  'surfaceWaves',
  'swotGsla',
];

export const childProductIDs: ChildProductID[] = [
  'fourHourSst-sstFilled',
  'fourHourSst-sst',
  'fourHourSst-sstAge',
  'fourHourSst-windSpeed',
  'sixDaySst-sst',
  'sixDaySst-sstAnomaly',
  'sixDaySst-centiles',
  'sixDaySst-timeseries',
  'sixDaySst-climatologySst',
  'sixDaySst-climatologyDataCount',
  'oceanColour-chlA',
  'oceanColour-chlAAge',
  'adjustedSeaLevelAnomaly-sla',
  'adjustedSeaLevelAnomaly-centiles',
  'adjustedSeaLevelAnomaly-sst',
  'adjustedSeaLevelAnomaly-nonTidalSla',
  'monthlyMeans-30day',
  'monthlyMeans-climatology',
  // 'monthlyMeans-CLIM_CNESCARS', // This product was removed from the original site
  'tidalCurrents-spd',
  'tidalCurrents-sl',
  'currentMeters-mooredInstrumentArray',
  'currentMeters-shelf',
  'currentMeters-deepADCP',
  'currentMeters-deepADV',
  'currentMeters-southernOcean',
  'sealCtd-sealTracks',
  'sealCtd-timeseriesTemperature',
  'sealCtd-timeseriesSalinity',
  'sealCtdTags-timeseries',
  'sealCtdTags-ts',
  'sealCtdTags-temperature',
  'sealCtdTags-salinity',
  'sealCtdTags-10days',
  'surfaceWaves-wave',
  'surfaceWaves-buoyTimeseries',
];

export const tidalCurrentsProductIDs = ['tidalCurrents-spd', 'tidalCurrents-sl'] as const;

export function isTidalCurrents(id: AnyProductID): id is (typeof tidalCurrentsProductIDs)[number] {
  return tidalCurrentsProductIDs.includes(id as (typeof tidalCurrentsProductIDs)[number]);
}
export const standaloneProductIDs: StandaloneProductID[] = [
  'argo',
  'EACMooringArray',
  'gliders',
  'myOceanCurrent',
  'fishSOOP',
];

export function isProductGroupId(id: AnyProductID): id is ProductGroupID {
  return productGroupIDs.includes(id as ProductGroupID);
}

export function isStandaloneProductId(id: AnyProductID): id is StandaloneProductID {
  return standaloneProductIDs.includes(id as StandaloneProductID);
}

export function isChildProductId(id: AnyProductID): id is ChildProductID {
  return childProductIDs.includes(id as ChildProductID);
}

interface BaseProduct {
  title: string;
  path: string;
  dateFormat?: DateConfig | null;
  localSegment?: string | null;
  stateSegment?: string;
}

export interface SubProduct extends BaseProduct {
  key: ChildProductID;
  imgPath?: string | null;
}

export interface StandaloneProductWithoutChildren extends BaseProduct {
  key: StandaloneProductID;
  latestEntry?: string | null;
  imgPath?: string | null;
  children?: never;
}

export interface ProductGroupWithChildren extends BaseProduct {
  key: ProductGroupID;
  latestEntry?: string | null;
  children: SubProduct[];
}

export type Product = StandaloneProductWithoutChildren | ProductGroupWithChildren;

export type AnyProduct = Product | SubProduct;

export interface MainProductWithSubProduct {
  mainProduct: Product;
  subProduct: SubProduct | null;
}

export interface CombinedProduct {
  mainProduct: BaseProduct;
  subProduct: BaseProduct | null;
  combinedTitle: string;
  fullKey: string;
  fullPath: string;
}

export type FlatProduct = AnyProduct & {
  parentId: ProductGroupID | null;
  latestEntry?: string | null;
};

export type LeafFlatProduct = (StandaloneProductWithoutChildren | SubProduct) & {
  parentId: ProductGroupID | null;
  latestEntry?: string | null;
};
