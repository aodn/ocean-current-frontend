import { Product } from '@/types/product';

export const OC_PRODUCTS: Product[] = [
  {
    title: 'Snapshot SST',
    key: 'snapshotSst',
    path: 'snapshot-sst',
  },
  {
    title: 'Four hour SST',
    path: 'four-hour-sst',
    key: 'fourHourSst',
    children: [
      {
        title: 'SST Filled',
        key: 'fourHourSst-sstFilled',
        path: 'sst-filled',
      },
      {
        title: 'SST',
        key: 'fourHourSst-sst',
        path: 'sst',
      },
      {
        title: 'SST Age',
        key: 'fourHourSst-sstAge',
        path: 'sst-age',
      },
      {
        title: 'Wind Speed',
        key: 'fourHourSst-windSpeed',
        path: 'wind-speed',
      },
    ],
  },
  {
    title: '6-Day SST & Centiles',
    key: 'sixDaySst',
    path: '6-day-sst',
    children: [
      {
        title: 'SST',
        key: 'sixDaySst-sst',
        path: 'sst',
        imgPath: 'SST',
      },
      {
        title: 'SST Anomaly',
        key: 'sixDaySst-sstAnomaly',
        path: 'sst-anomaly',
        imgPath: 'SST_ANOM',
      },
      {
        title: 'Centiles',
        key: 'sixDaySst-centiles',
        path: 'centiles',
        imgPath: 'pctiles',
      },
    ],
  },
  {
    title: 'Climatology',
    key: 'climatology',
    path: 'climatology',
    children: [
      {
        title: 'SST',
        key: 'climatology-sst',
        path: 'sst',
        imgPath: 'SST',
      },
      {
        title: 'Data Count',
        key: 'climatology-dataCount',
        path: 'data-count',
        imgPath: 'NMON',
      },
    ],
  },
  {
    title: 'SST Anom vs Time',
    key: 'sstAnomVsTime',
    path: 'sst-anom-vs-time',
  },
  {
    title: 'Snapshot Chlorophyll-a',
    key: 'snapshotChlorophyllA',
    path: 'snapshot-chlorophyll-a',
  },
  {
    title: 'Adj. Sea Level Anom.',
    key: 'adjustedSeaLevelAnomaly',
    path: 'adj-sea-level-anom',
  },
  {
    title: 'Non-Tidal Sea Level Anom.',
    key: 'nonTidalSeaLevelAnom',
    path: 'non-tidal-sea-level-anom',
  },
  {
    title: 'Ocean Colour',
    key: 'oceanColour',
    path: 'ocean-colour',
    children: [
      {
        title: 'Chl-A',
        key: 'oceanColour-chlA',
        path: 'chl-a',
        imgPath: 'CHL',
      },
      {
        title: 'Chl-A Age',
        key: 'oceanColour-chlAAge',
        path: 'chl-a-age',
        imgPath: 'CHL_AGE',
      },
    ],
  },
  {
    title: 'Surface Waves',
    key: 'surfaceWaves',
    path: 'surface-waves',
  },
  {
    title: 'Monthly Means',
    key: 'monthlyMeans',
    path: 'monthly-means',
  },
  {
    title: 'Argo',
    key: 'argo',
    path: 'argo',
  },
] as const;

interface NewProduct {
  id: string;
  title: string;
  path: string;
  stateSegment?: string | null;
  localSegment?: string | null;
  hasStateImage?: boolean;
  hasLocalImage?: boolean;
  imagePath?: string | null;
  children?: NewProduct[];
}

export const OC_PRODUCTS2: NewProduct[] = [
  {
    title: 'Snapshot SST',
    id: 'snapshotSst',
    path: 'snapshot-sst',
    stateSegment: null,
    localSegment: null,
    hasStateImage: false,
    hasLocalImage: true,
  },
  {
    title: 'Four hour SST',
    path: 'four-hour-sst',
    id: 'fourHourSst',
    stateSegment: null,
    localSegment: 'SST_4hr',
    hasStateImage: false,
    hasLocalImage: true,
    children: [
      {
        title: 'SST Filled',
        id: 'fourHourSst-sstFilled',
        path: 'sst-filled',
        imagePath: 'SST_Filled',
      },
      {
        title: 'SST',
        id: 'fourHourSst-sst',
        path: 'sst',
        imagePath: 'SST',
      },
      {
        title: 'SST Age',
        id: 'fourHourSst-sstAge',
        path: 'sst-age',
        imagePath: 'SST_Age',
      },
      {
        title: 'Wind Speed',
        id: 'fourHourSst-windSpeed',
        path: 'wind-speed',
        imagePath: 'Wind',
      },
    ],
  },
  {
    title: '6-Day SST & Centiles',
    id: 'sixDaySst',
    path: '6-day-sst',
    stateSegment: 'STATE_daily',
    localSegment: 'DR_SST_daily',
    hasStateImage: true,
    hasLocalImage: true,
    children: [
      {
        title: 'SST',
        id: 'sixDaySst-sst',
        path: '6-day-sst/sst',
        imagePath: 'SST',
      },
      {
        title: 'SST Anomaly',
        id: 'sixDaySst-sstAnomaly',
        path: 'sst-anomaly',
        imagePath: 'SST_ANOM',
      },
      {
        title: 'Centiles',
        id: 'sixDaySst-centiles',
        path: 'centiles',
        imagePath: 'pctiles',
      },
    ],
  },
  {
    title: 'Climatology',
    id: 'climatology',
    path: 'climatology',
    stateSegment: 'STATE_CLIM',
    localSegment: 'DR_SST_CLIM',
    hasStateImage: true,
    hasLocalImage: true,
    children: [
      {
        title: 'SST',
        id: 'climatology-sst',
        path: 'sst',
        imagePath: 'SST',
      },
      {
        title: 'Data Count',
        id: 'climatology-dataCount',
        path: 'data-count',
        imagePath: 'NMON',
      },
    ],
  },
  {
    title: 'SST Anom vs Time',
    id: 'sstAnomVsTime',
    path: 'sst-anom-vs-time',
    stateSegment: null,
    localSegment: 'MM_SSTA',
    hasStateImage: false,
    hasLocalImage: true,
    imagePath: 'MMA',
  },
  {
    title: 'Snapshot Chlorophyll-a',
    id: 'snapshotChlorophyllA',
    path: 'snapshot-chlorophyll-a',
    stateSegment: 'STATE_daily',
    localSegment: null,
    hasStateImage: true,
    hasLocalImage: false,
    imagePath: 'CHL',
  },
  {
    title: 'Adj. Sea Level Anom.',
    id: 'adjustedSeaLevelAnomaly',
    path: 'adj-sea-level-anom',
    stateSegment: 'STATE_daily',
    localSegment: null,
    hasStateImage: true,
    hasLocalImage: false,
    imagePath: 'SLA',
  },
  {
    title: 'Non-Tidal Sea Level Anom.',
    id: 'nonTidalSeaLevelAnom',
    path: 'non-tidal-sea-level-anom',
    stateSegment: 'STATE_daily',
    localSegment: null,
    hasStateImage: true,
    hasLocalImage: false,
    imagePath: 'NTSLA',
  },
  {
    title: 'Ocean Colour',
    id: 'oceanColour',
    path: 'ocean-colour',
    stateSegment: 'STATE_daily',
    localSegment: null,
    hasStateImage: true,
    hasLocalImage: false,
    children: [
      {
        title: 'Chl-A',
        id: 'oceanColour-chlA',
        path: 'chl-a',
        imagePath: 'CHL',
      },
      {
        title: 'Chl-A Age',
        id: 'oceanColour-chlAAge',
        path: 'chl-a-age',
        imagePath: 'CHL_AGE',
      },
    ],
  },
  {
    title: 'Surface Waves',
    id: 'surfaceWaves',
    path: 'surface-waves',
  },
  {
    title: 'Monthly Means',
    id: 'monthlyMeans',
    path: 'monthly-means',
  },
  {
    title: 'Argo',
    id: 'argo',
    path: 'argo',
  },
] as const;
