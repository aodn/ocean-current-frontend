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
        key: 'fourHourSst-Sst',
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
    key: '6DaySstCentiles',
    path: '6-day-sst-centiles',
    children: [
      {
        title: 'SST',
        key: '6DaySstCentiles-sst',
        path: 'sst',
      },
      {
        title: 'SST Anomaly',
        key: '6DaySstCentiles-sstAnomaly',
        path: 'sst-anomaly',
      },
      {
        title: 'Centiles',
        key: '6DaySstCentiles-centiles',
        path: 'centiles',
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
      },
      {
        title: 'Date Count',
        key: 'climatology-dateCount',
        path: 'date-count',
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
    key: 'adjSeaLevelAnom',
    path: 'adj-sea-level-anom',
  },
  {
    title: 'Non-Tidal Sea Level Anom.',
    key: 'nonTidalSeaLevelAnom',
    path: 'non-tidal-sea-level-anom',
  },
  {
    title: 'Ocean Color',
    key: 'oceanColor',
    path: 'ocean-color',
  },
  {
    title: 'Argo',
    key: 'argo',
    path: 'argo',
  },
] as const;
