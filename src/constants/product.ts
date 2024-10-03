import { Product } from '@/types/product';

export const OC_PRODUCTS: Product[] = [
  {
    title: 'Snapshot SST',
    key: 'snapshotSst',
    path: 'snapshot-sst',
    latestEntry: 'SST_entry',
  },
  {
    title: 'Four hour SST',
    path: 'four-hour-sst',
    key: 'fourHourSst',
    latestEntry: 'SST_entry',
    children: [
      {
        title: 'SST Filled',
        key: 'fourHourSst-sstFilled',
        path: 'sst-filled',
        imgPath: 'SST_Filled',
      },
      {
        title: 'SST',
        key: 'fourHourSst-sst',
        path: 'sst',
        imgPath: 'SST',
      },
      {
        title: 'SST Age',
        key: 'fourHourSst-sstAge',
        path: 'sst-age',
        imgPath: 'SST_Age',
      },
      {
        title: 'Wind Speed',
        key: 'fourHourSst-windSpeed',
        path: 'wind-speed',
        imgPath: 'Wind',
      },
    ],
  },
  {
    title: '6-Day SST & Centiles',
    key: 'sixDaySst',
    path: '6-day-sst',
    latestEntry: 'SST_entry',
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
    latestEntry: null,
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
    latestEntry: null,
  },
  {
    title: 'Adj. Sea Level Anom.',
    key: 'adjustedSeaLevelAnomaly',
    path: 'adj-sea-level-anom',
    latestEntry: 'GSLA_entry',
    children: [
      {
        title: 'SLA',
        key: 'adjustedSeaLevelAnomaly-sla',
        path: 'sla',
        imgPath: 'SLA',
      },
      {
        title: 'Centiles',
        key: 'adjustedSeaLevelAnomaly-centiles',
        path: 'centiles',
        imgPath: 'SLA_pctiles',
      },
      {
        title: 'SLA + SST',
        key: 'adjustedSeaLevelAnomaly-sst',
        path: 'sst',
        imgPath: null,
      },
    ],
  },
  {
    title: 'Non-Tidal Sea Level Anom.',
    key: 'nonTidalSeaLevelAnom',
    path: 'non-tidal-sea-level-anom',
    latestEntry: null,
  },
  {
    title: 'Ocean Colour',
    key: 'oceanColour',
    path: 'ocean-colour',
    latestEntry: 'chla_entry',
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
    imgPath: 'WAVES',
    latestEntry: 'waves_entry',
  },
  {
    title: 'Monthly Means',
    key: 'monthlyMeans',
    path: 'monthly-means',
    latestEntry: null,
    children: [
      {
        title: 'Anomalies',
        key: 'monthlyMeans-anomalies',
        path: 'anomalies',
        imgPath: null,
      },
      {
        title: 'OFAM3/SSTARS',
        key: 'monthlyMeans-CLIM_OFAM3_SSTAARS',
        path: 'CLIM_OFAM3_SSTAARS',
        imgPath: 'CLIM_OFAM3_SSTAARS',
      },
      {
        title: 'CNES MDT/CARS SST',
        key: 'monthlyMeans-CLIM_CNESCARS',
        path: 'CLIM_CNESCARS',
        imgPath: 'CLIM_CNESCARS',
      },
    ],
  },
  {
    title: 'Argo',
    key: 'argo',
    path: 'argo',
    latestEntry: null,
  },
  {
    title: 'Current Meters',
    key: 'currentMeters',
    path: 'current-meters',
    latestEntry: null,
  },
  {
    title: 'Current Meters Plot',
    key: 'currentMetersPlot',
    path: 'current-meters-plot',
    latestEntry: null,
  },
] as const;
