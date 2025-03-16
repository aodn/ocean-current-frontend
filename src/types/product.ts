import { DateConfig } from './date';

export type StandaloneProductID = 'snapshotSst' | 'surfaceWaves' | 'argo' | 'EACMooringArray';

export type ProductGroupID =
  | 'fourHourSst'
  | 'sixDaySst'
  | 'oceanColour'
  | 'adjustedSeaLevelAnomaly'
  | 'monthlyMeans'
  | 'climatology'
  | 'tidalCurrents'
  | 'currentMeters'
  | 'sealCtd';

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
  // Ocean Colour children
  | 'oceanColour-chlA'
  | 'oceanColour-chlAAge'
  // Adjusted Sea Level Anomaly children
  | 'adjustedSeaLevelAnomaly-sla'
  | 'adjustedSeaLevelAnomaly-centiles'
  | 'adjustedSeaLevelAnomaly-sst'
  // Monthly Means children
  | 'monthlyMeans-anomalies'
  | 'monthlyMeans-CLIM_OFAM3_SSTAARS'
  | 'monthlyMeans-CLIM_CNESCARS'
  // Climatology children
  | 'climatology-sst'
  | 'climatology-dataCount'
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
  | 'sealCtd-sealAndArgoLocations'
  | 'sealCtd-timeseriesTemperature'
  | 'sealCtd-timeseriesSalinity';

// Combined types
export type RootProductID = StandaloneProductID | ProductGroupID;
export type ProductID = StandaloneProductID | ChildProductID;
export type AnyProductID = StandaloneProductID | ProductGroupID | ChildProductID;

interface BaseProduct {
  title: string;
  path: string;
  dateFormat?: DateConfig | null;
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
  parentId: string | null;
  latestEntry?: string | null;
};
