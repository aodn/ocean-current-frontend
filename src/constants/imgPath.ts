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
      dateFormat: 'YYYYMMDD',
    },
  ],
]);

interface ProductImageSource {
  stateSegment: string | null;
  localSegment: string | null;
  hasStateImage: boolean;
  hasLocalImage: boolean;
  imagePath: string | null;
  dateFormat: string;
}

export const productTypeMapping2: Record<string, ProductImageSource> = {
  snapshot: {
    stateSegment: null,
    localSegment: null,
    hasStateImage: false,
    hasLocalImage: true,
    imagePath: null,
    dateFormat: 'YYYYMMDDHH',
  },
  sixDaySst: {
    stateSegment: 'STATE_daily',
    localSegment: 'DR_SST_daily',
    hasStateImage: true,
    hasLocalImage: true,
    imagePath: 'sixDaySst',
    dateFormat: 'YYYYMMDD',
  },
  fourHourSst: {
    stateSegment: null,
    localSegment: 'SST_4hr',
    hasStateImage: false,
    hasLocalImage: true,
    imagePath: 'fourHourSst',
    dateFormat: 'YYYYMMDDHH',
  },
  'fourHourSst-sstFilled': {
    stateSegment: null,
    localSegment: 'SST_4hr',
    hasStateImage: false,
    hasLocalImage: true,
    imagePath: 'fourHourSst/sst-filled',
    dateFormat: 'YYYYMMDDHH',
  },
  climatology: {
    stateSegment: 'STATE_CLIM',
    localSegment: 'DR_SST_CLIM',
    hasStateImage: true,
    hasLocalImage: true,
    imagePath: 'climatology',
    dateFormat: 'MM',
  },
  oceanColour: {
    stateSegment: 'STATE_daily',
    localSegment: null,
    hasStateImage: true,
    hasLocalImage: false,
    imagePath: 'oceanColour',
    dateFormat: 'YYYYMMDDHH',
  },
};
