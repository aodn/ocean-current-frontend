import { DateFormat } from '@/types/date';
import { Product } from '@/types/product';

export const OC_PRODUCTS: Product[] = [
  {
    title: 'Snapshot SST',
    key: 'snapshotSst',
    path: 'snapshot-sst',
    latestEntry: 'SST_entry',
    dateFormat: {
      localFormat: DateFormat.Day,
      stateFormat: DateFormat.Day,
    },
  },
  {
    title: 'Four hour SST',
    path: 'four-hour-sst',
    key: 'fourHourSst',
    latestEntry: 'SST_entry',
    dateFormat: null,
    children: [
      {
        title: 'SST Filled',
        key: 'fourHourSst-sstFilled',
        path: 'sst-filled',
        imgPath: 'SST_Filled',
        dateFormat: {
          localFormat: DateFormat.Hour,
          stateFormat: DateFormat.Hour,
        },
      },
      {
        title: 'SST',
        key: 'fourHourSst-sst',
        path: 'sst',
        imgPath: 'SST',
        dateFormat: {
          localFormat: DateFormat.Hour,
          stateFormat: DateFormat.Hour,
        },
      },
      {
        title: 'SST Age',
        key: 'fourHourSst-sstAge',
        path: 'sst-age',
        imgPath: 'SST_Age',
        dateFormat: {
          localFormat: DateFormat.Hour,
          stateFormat: DateFormat.Hour,
        },
      },
      {
        title: 'Wind Speed',
        key: 'fourHourSst-windSpeed',
        path: 'wind-speed',
        imgPath: 'Wind',
        dateFormat: {
          localFormat: DateFormat.Hour,
          stateFormat: DateFormat.Hour,
        },
      },
    ],
  },
  {
    title: '6-Day SST & Centiles',
    key: 'sixDaySst',
    path: '6-day-sst',
    latestEntry: 'SST_entry',
    dateFormat: null,
    children: [
      {
        title: 'SST',
        key: 'sixDaySst-sst',
        path: 'sst',
        imgPath: 'SST',
        dateFormat: {
          localFormat: DateFormat.Day,
          stateFormat: DateFormat.Day,
        },
      },
      {
        title: 'SST Anomaly',
        key: 'sixDaySst-sstAnomaly',
        path: 'sst-anomaly',
        imgPath: 'SST_ANOM',
        dateFormat: {
          localFormat: DateFormat.Day,
          stateFormat: DateFormat.Day,
        },
      },
      {
        title: 'Centiles',
        key: 'sixDaySst-centiles',
        path: 'centiles',
        imgPath: 'pctiles',
        dateFormat: {
          localFormat: DateFormat.Day,
          stateFormat: DateFormat.Day,
        },
      },
      /*
      Timeseries is "SST Anom vs Time" on the original site.
      It was requested by the client to put this as an option under 6 Day SST
      The data below is only for rendering the button
      The image source url is built here - src/utils/data-image-builder-utils/dataImgBuilder.ts
      */
      {
        title: 'Timeseries',
        key: 'sixDaySst-timeseries',
        path: 'timeseries',
        imgPath: 'MMA',
        dateFormat: {
          localFormat: null,
          stateFormat: null,
        },
      },
    ],
  },
  {
    title: 'Climatology',
    key: 'climatology',
    path: 'climatology',
    latestEntry: null,
    dateFormat: null,
    children: [
      {
        title: 'SST',
        key: 'climatology-sst',
        path: 'sst',
        imgPath: 'SST',
        dateFormat: {
          localFormat: DateFormat.MonthOnly,
          stateFormat: DateFormat.MonthOnly,
        },
      },
      {
        title: 'Data Count',
        key: 'climatology-dataCount',
        path: 'data-count',
        imgPath: 'NMON',
        dateFormat: {
          localFormat: DateFormat.MonthOnly,
          stateFormat: DateFormat.MonthOnly,
        },
      },
    ],
  },
  {
    title: 'SST Anom vs Time',
    key: 'sstAnomVsTime',
    path: 'sst-anom-vs-time',
    latestEntry: null,
    dateFormat: null,
  },
  {
    title: 'Adj. Sea Level Anom.',
    key: 'adjustedSeaLevelAnomaly',
    path: 'adj-sea-level-anom',
    latestEntry: 'GSLA_entry',
    dateFormat: null,
    children: [
      {
        title: 'SLA',
        key: 'adjustedSeaLevelAnomaly-sla',
        path: 'sla',
        imgPath: 'SLA',
        dateFormat: {
          localFormat: DateFormat.Day,
          stateFormat: DateFormat.Day,
        },
      },
      {
        title: 'Centiles',
        key: 'adjustedSeaLevelAnomaly-centiles',
        path: 'centiles',
        imgPath: 'SLA_pctiles',
        dateFormat: {
          localFormat: DateFormat.Day,
          stateFormat: DateFormat.Day,
        },
      },
      {
        title: 'SLA + SST',
        key: 'adjustedSeaLevelAnomaly-sst',
        path: 'sst',
        imgPath: null,
        dateFormat: {
          localFormat: DateFormat.Day,
          stateFormat: DateFormat.Day,
        },
      },
    ],
  },
  {
    title: 'Non-Tidal Sea Level Anom.',
    key: 'nonTidalSeaLevelAnom',
    path: 'non-tidal-sea-level-anom',
    latestEntry: null,
    dateFormat: {
      localFormat: null,
      stateFormat: DateFormat.Hour,
    },
  },
  {
    title: 'Chlorophyll-a Concentration',
    key: 'oceanColour',
    path: 'ocean-colour',
    latestEntry: 'chla_entry',
    dateFormat: null,
    children: [
      {
        title: 'Chl-A',
        key: 'oceanColour-chlA',
        path: 'chl-a',
        imgPath: 'CHL',
        dateFormat: {
          localFormat: DateFormat.Hour,
          stateFormat: DateFormat.Day,
        },
      },
      {
        title: 'Chl-A Age',
        key: 'oceanColour-chlAAge',
        path: 'chl-a-age',
        imgPath: 'CHL_AGE',
        dateFormat: {
          localFormat: DateFormat.Day,
          stateFormat: DateFormat.Day,
        },
      },
    ],
  },
  {
    title: 'Surface Waves',
    key: 'surfaceWaves',
    path: 'surface-waves',
    imgPath: 'WAVES',
    latestEntry: 'waves_entry',
    dateFormat: {
      localFormat: null,
      stateFormat: DateFormat.Hour,
    },
  },
  {
    title: 'Monthly Means',
    key: 'monthlyMeans',
    path: 'monthly-means',
    latestEntry: null,
    dateFormat: null,
    children: [
      {
        title: 'Anomalies',
        key: 'monthlyMeans-anomalies',
        path: 'anomalies',
        imgPath: null,
        dateFormat: {
          localFormat: DateFormat.Month,
          stateFormat: DateFormat.Month,
        },
      },
      {
        title: 'OFAM3/SSTARS',
        key: 'monthlyMeans-CLIM_OFAM3_SSTAARS',
        path: 'CLIM_OFAM3_SSTAARS',
        imgPath: 'CLIM_OFAM3_SSTAARS',
        dateFormat: {
          localFormat: DateFormat.MonthOnly,
          stateFormat: DateFormat.MonthOnly,
        },
      },
      {
        title: 'CNES MDT/CARS SST',
        key: 'monthlyMeans-CLIM_CNESCARS',
        path: 'CLIM_CNESCARS',
        imgPath: 'CLIM_CNESCARS',
        dateFormat: {
          localFormat: DateFormat.MonthOnly,
          stateFormat: DateFormat.MonthOnly,
        },
      },
    ],
  },
  {
    title: 'Argo',
    key: 'argo',
    path: 'argo',
    latestEntry: null,
    dateFormat: {
      localFormat: DateFormat.Day,
      stateFormat: DateFormat.Day,
    },
  },
  {
    title: 'Current Meters',
    key: 'currentMeters',
    path: 'current-meters',
    latestEntry: null,
    dateFormat: null,
  },
] as const;
