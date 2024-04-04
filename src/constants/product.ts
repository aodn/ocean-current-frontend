interface Product {
  title: string;
  value: string;
  path: string;
  children?: Product[];
}

export const OC_PRODUCTS: Product[] = [
  {
    title: 'Snapshot SST',
    value: 'snapshotSst',
    path: 'snapshot-sst',
  },
  {
    title: 'Four hour SST',
    path: 'four-hour-sst',
    value: 'fourHourSst',
    children: [
      {
        title: 'SST Filled',
        value: 'sstFilled',
        path: 'sst-filled',
      },
      {
        title: 'SST',
        value: 'sst',
        path: 'sst',
      },
      {
        title: 'SST Age',
        value: 'sstAge',
        path: 'sst-age',
      },
      {
        title: 'Wind Speed',
        value: 'windSpeed',
        path: 'wind-speed',
      },
    ],
  },
  {
    title: '6-Day SST & Centiles',
    value: '6DaySstCentiles',
    path: '6-day-sst-centiles',
    children: [
      {
        title: 'SST',
        value: 'sst',
        path: 'sst',
      },
      {
        title: 'SST Anomaly',
        value: 'sstAnomaly',
        path: 'sst-anomaly',
      },
      {
        title: 'Centiles',
        value: 'centiles',
        path: 'centiles',
      },
    ],
  },
  {
    title: 'Climatology',
    value: 'climatology',
    path: 'climatology',
    children: [
      {
        title: 'SST',
        value: 'sst',
        path: 'sst',
      },
      {
        title: 'Date Count',
        value: 'dateCount',
        path: 'date-count',
      },
    ],
  },
  {
    title: 'SST Anom vs Time',
    value: 'sstAnomVsTime',
    path: 'sst-anom-vs-time',
  },
  {
    title: 'Snapshot Chlorophyll-a',
    value: 'snapshotChlorophyllA',
    path: 'snapshot-chlorophyll-a',
  },
  {
    title: 'Adj. Sea Level Anom.',
    value: 'adjSeaLevelAnom',
    path: 'adj-sea-level-anom',
  },
  {
    title: 'Non-Tidal Sea Level Anom.',
    value: 'nonTidalSeaLevelAnom',
    path: 'non-tidal-sea-level-anom',
  },
  {
    title: 'Argo',
    value: 'argo',
    path: 'argo',
  },
];
