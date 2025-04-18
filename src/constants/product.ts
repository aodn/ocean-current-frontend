import { DateFormat } from '@/types/date';
import { Product } from '@/types/product';

export const OC_PRODUCTS: Product[] = [
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
          localFormat: DateFormat.HOUR,
          stateFormat: DateFormat.HOUR,
        },
      },
      {
        title: 'SST',
        key: 'fourHourSst-sst',
        path: 'sst',
        imgPath: 'SST',
        dateFormat: {
          localFormat: DateFormat.HOUR,
          stateFormat: DateFormat.HOUR,
        },
      },
      {
        title: 'SST Age',
        key: 'fourHourSst-sstAge',
        path: 'sst-age',
        imgPath: 'SST_Age',
        dateFormat: {
          localFormat: DateFormat.HOUR,
          stateFormat: DateFormat.HOUR,
        },
      },
      {
        title: 'Wind Speed',
        key: 'fourHourSst-windSpeed',
        path: 'wind-speed',
        imgPath: 'Wind',
        dateFormat: {
          localFormat: DateFormat.HOUR,
          stateFormat: DateFormat.HOUR,
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
          localFormat: DateFormat.DAY,
          stateFormat: DateFormat.DAY,
        },
      },
      {
        title: 'SST Anomaly',
        key: 'sixDaySst-sstAnomaly',
        path: 'sst-anomaly',
        imgPath: 'SST_ANOM',
        dateFormat: {
          localFormat: DateFormat.DAY,
          stateFormat: DateFormat.DAY,
        },
      },
      {
        title: 'Centiles',
        key: 'sixDaySst-centiles',
        path: 'centiles',
        imgPath: 'pctiles',
        dateFormat: {
          localFormat: DateFormat.DAY,
          stateFormat: DateFormat.DAY,
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
          localFormat: DateFormat.HOUR,
          stateFormat: DateFormat.DAY,
        },
      },
      {
        title: 'Chl-A Age',
        key: 'oceanColour-chlAAge',
        path: 'chl-a-age',
        imgPath: 'CHL_AGE',
        dateFormat: {
          localFormat: DateFormat.DAY,
          stateFormat: DateFormat.DAY,
        },
      },
    ],
  },
  {
    title: 'Adjusted Sea Level Anom.',
    key: 'adjustedSeaLevelAnomaly',
    path: 'adjusted-sea-level-anomaly',
    latestEntry: 'GSLA_entry',
    dateFormat: null,
    children: [
      {
        title: 'SLA',
        key: 'adjustedSeaLevelAnomaly-sla',
        path: 'sla',
        imgPath: 'SLA',
        dateFormat: {
          localFormat: DateFormat.DAY,
          stateFormat: DateFormat.DAY,
        },
      },
      {
        title: 'Centiles',
        key: 'adjustedSeaLevelAnomaly-centiles',
        path: 'centiles',
        imgPath: 'SLA_pctiles',
        dateFormat: {
          localFormat: DateFormat.DAY,
          stateFormat: DateFormat.DAY,
        },
      },
      {
        title: 'SLA + SST',
        key: 'adjustedSeaLevelAnomaly-sst',
        path: 'sst',
        imgPath: null,
        dateFormat: {
          localFormat: DateFormat.HOUR,
          stateFormat: DateFormat.DAY,
        },
      },
      {
        title: 'Non-Tidal SLA',
        key: 'adjustedSeaLevelAnomaly-nonTidalSla',
        path: 'non-tidal-sla',
        imgPath: 'NTSLA',
        dateFormat: {
          localFormat: DateFormat.HOUR,
          stateFormat: DateFormat.HOUR,
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
      stateFormat: DateFormat.HOUR,
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
          localFormat: DateFormat.MONTH,
          stateFormat: DateFormat.MONTH,
        },
      },
      {
        title: 'OFAM3/SSTARS',
        key: 'monthlyMeans-CLIM_OFAM3_SSTAARS',
        path: 'CLIM_OFAM3_SSTAARS',
        imgPath: 'CLIM_OFAM3_SSTAARS',
        dateFormat: {
          localFormat: DateFormat.MONTH_ONLY,
          stateFormat: DateFormat.MONTH_ONLY,
        },
      },
      {
        title: 'CNES MDT/CARS SST',
        key: 'monthlyMeans-CLIM_CNESCARS',
        path: 'CLIM_CNESCARS',
        imgPath: 'CLIM_CNESCARS',
        dateFormat: {
          localFormat: DateFormat.MONTH_ONLY,
          stateFormat: DateFormat.MONTH_ONLY,
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
          localFormat: DateFormat.MONTH_ONLY,
          stateFormat: DateFormat.MONTH_ONLY,
        },
      },
      {
        title: 'Data Count',
        key: 'climatology-dataCount',
        path: 'data-count',
        imgPath: 'NMON',
        dateFormat: {
          localFormat: DateFormat.MONTH_ONLY,
          stateFormat: DateFormat.MONTH_ONLY,
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
      localFormat: DateFormat.DAY,
      stateFormat: DateFormat.DAY,
    },
  },
  {
    title: 'Tidal Currents',
    key: 'tidalCurrents',
    path: 'tidal-currents',
    latestEntry: null,
    dateFormat: {
      localFormat: DateFormat.MINUTE,
      stateFormat: DateFormat.MINUTE,
    },
    children: [
      {
        title: 'Speed',
        key: 'tidalCurrents-spd',
        path: 'speed',
        imgPath: 'spd',
        dateFormat: {
          localFormat: DateFormat.MINUTE,
          stateFormat: DateFormat.MINUTE,
        },
      },
      {
        title: 'Sea Level',
        key: 'tidalCurrents-sl',
        path: 'sea-level',
        imgPath: 'hv',
        dateFormat: {
          localFormat: DateFormat.MINUTE,
          stateFormat: DateFormat.MINUTE,
        },
      },
    ],
  },
  /*
    The data below is only for rendering the options button for navigation purposes.
    The image source urls are built here - src/utils/data-image-builder-utils/dataImgBuilder.ts
  */
  {
    title: 'Current Meters',
    key: 'currentMeters',
    path: 'current-meters',
    latestEntry: null,
    dateFormat: {
      localFormat: DateFormat.YEAR_ONLY,
      stateFormat: DateFormat.YEAR_ONLY,
    },
    children: [
      {
        title: 'Moored Instrument Array',
        key: 'currentMeters-mooredInstrumentArray',
        path: 'moored-instrument-array',
        imgPath: null,
        dateFormat: {
          localFormat: DateFormat.YEAR_ONLY,
          stateFormat: DateFormat.YEAR_ONLY,
        },
      },
      {
        title: 'Shelf',
        key: 'currentMeters-shelf',
        path: 'shelf',
        imgPath: null,
        dateFormat: {
          localFormat: DateFormat.YEAR_ONLY,
          stateFormat: DateFormat.YEAR_ONLY,
        },
      },
      {
        title: 'Deep (ADCP)',
        key: 'currentMeters-deepADCP',
        path: 'deep-adcp',
        imgPath: null,
        dateFormat: {
          localFormat: DateFormat.YEAR_ONLY,
          stateFormat: DateFormat.YEAR_ONLY,
        },
      },
      {
        title: 'Deep (ADV)',
        key: 'currentMeters-deepADV',
        path: 'deep-adv',
        imgPath: null,
        dateFormat: {
          localFormat: DateFormat.YEAR_ONLY,
          stateFormat: DateFormat.YEAR_ONLY,
        },
      },
      {
        title: 'Southern Ocean',
        key: 'currentMeters-southernOcean',
        path: 'southern-ocean',
        imgPath: null,
        dateFormat: {
          localFormat: DateFormat.YEAR_ONLY,
          stateFormat: DateFormat.YEAR_ONLY,
        },
      },
    ],
  },
  /*
    The data below is only for rendering the options button for navigation purposes.
    The image source urls are built here - src/utils/data-image-builder-utils/dataImgBuilder.ts
  */
  {
    title: 'SealCTD',
    key: 'sealCtd',
    path: 'seal-ctd',
    latestEntry: null,
    dateFormat: {
      localFormat: DateFormat.DAY,
      stateFormat: DateFormat.DAY,
    },
    children: [
      {
        title: 'SealCTD Tracks',
        key: 'sealCtd-sealTracks',
        path: 'tracks',
        imgPath: 'tracks',
        dateFormat: {
          localFormat: DateFormat.DAY,
          stateFormat: DateFormat.DAY,
        },
      },
      {
        title: 'Timeseries (Temperature)',
        key: 'sealCtd-timeseriesTemperature',
        path: 'timeseries-temperature',
        imgPath: null,
        dateFormat: {
          localFormat: DateFormat.YEAR_ONLY,
          stateFormat: DateFormat.YEAR_ONLY,
        },
      },
      {
        title: 'Timeseries (Salinity)',
        key: 'sealCtd-timeseriesSalinity',
        path: 'timeseries-salinity',
        imgPath: null,
        dateFormat: {
          localFormat: DateFormat.YEAR_ONLY,
          stateFormat: DateFormat.YEAR_ONLY,
        },
      },
    ],
  },
  /*
    The data below is only for rendering the options button for navigation purposes.
    The image source urls are built here - src/utils/data-image-builder-utils/dataImgBuilder.ts
    The product set below is different/separated from the above as it's the third layer of navigation/data
    and we need to flatten it to suit our existing structure.
  */
  {
    title: 'SealCTD Tags',
    key: 'sealCtdTags',
    path: 'seal-ctd-tags',
    latestEntry: null,
    dateFormat: {
      localFormat: null,
      stateFormat: null,
    },
    children: [
      {
        title: 'Timeseries',
        key: 'sealCtdTags-timeseries',
        path: 'timeseries',
        dateFormat: {
          localFormat: DateFormat.YEAR_ONLY,
          stateFormat: DateFormat.YEAR_ONLY,
        },
      },
      {
        title: 'TS',
        key: 'sealCtdTags-ts',
        path: 'ts',
        imgPath: null,
        dateFormat: {
          localFormat: DateFormat.YEAR_ONLY,
          stateFormat: DateFormat.YEAR_ONLY,
        },
      },
      {
        title: 'Temperature',
        key: 'sealCtdTags-temperature',
        path: 'temperature',
        imgPath: null,
        dateFormat: {
          localFormat: DateFormat.YEAR_ONLY,
          stateFormat: DateFormat.YEAR_ONLY,
        },
      },
      {
        title: 'Salinity',
        key: 'sealCtdTags-salinity',
        path: 'salinity',
        imgPath: null,
        dateFormat: {
          localFormat: DateFormat.YEAR_ONLY,
          stateFormat: DateFormat.YEAR_ONLY,
        },
      },
      {
        title: '10 Days',
        key: 'sealCtdTags-10days',
        path: '10days',
        imgPath: null,
        dateFormat: {
          localFormat: DateFormat.DAY,
          stateFormat: DateFormat.DAY,
        },
      },
    ],
  },
  /*
    The data below is only for rendering the button for navigation purposes.
    EAC Mooring Array data is only available in Brisbane region,
    so the image source url is built here - src/utils/data-image-builder-utils/dataImgBuilder.ts
  */
  {
    title: 'EAC Mooring Array',
    key: 'EACMooringArray',
    path: 'eac-mooring-array',
    dateFormat: {
      localFormat: DateFormat.DAY,
      stateFormat: DateFormat.DAY,
    },
  },
] as const;
