export enum TargetPathRegionScope {
  Local = 'local',
  State = 'state',
}

export const productTypeMapping = new Map<
  string,
  {
    subProduct: string[];
    stateSegment: string | undefined;
    localSegment: string | null;
    dateFormat: string;
  }
>([
  [
    'snapshot',
    {
      subProduct: [],
      stateSegment: '',
      localSegment: '',
      dateFormat: 'YYYYMMDDHH',
    },
  ],
  [
    'sixDaySst',
    {
      subProduct: ['SST', 'SST_ANOM', 'pctiles'],
      stateSegment: 'STATE_daily',
      localSegment: 'DR_SST_daily',
      dateFormat: 'YYYYMMDD',
    },
  ],
  [
    'fourHourSst',
    {
      subProduct: ['SST', 'sst-age'],
      stateSegment: undefined,
      localSegment: 'SST_4hr',
      dateFormat: 'YYYYMMDDHH',
    },
  ],
  [
    'climatology',
    {
      subProduct: ['SST', 'NMON'],
      stateSegment: 'STATE_CLIM',
      localSegment: 'DR_SST_CLIM',
      dateFormat: 'MM',
    },
  ],
  [
    'oceanColour',
    {
      subProduct: ['CHL', 'CHL_AGE'],
      stateSegment: 'STATE_daily',
      localSegment: null,
      dateFormat: 'YYYYMMDDHH',
    },
  ],
]);
