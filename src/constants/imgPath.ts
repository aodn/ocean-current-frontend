import { DateFormat } from '@/types/date';

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
      dateFormat: DateFormat.HOUR,
    },
  ],
  [
    'sixDaySst',
    {
      subProduct: ['SST', 'SST_ANOM', 'pctiles', 'MMA'],
      stateSegment: 'STATE_daily',
      localSegment: 'DR_SST_daily',
      dateFormat: DateFormat.DAY,
    },
  ],
  [
    'fourHourSst',
    {
      subProduct: ['SST_Filled', 'SST', 'SST_Age', 'Wind'],
      stateSegment: undefined,
      localSegment: 'SST_4hr',
      dateFormat: DateFormat.HOUR,
    },
  ],
  [
    'climatology',
    {
      subProduct: ['SST', 'NMON'],
      stateSegment: 'STATE_CLIM',
      localSegment: 'DR_SST_CLIM',
      dateFormat: DateFormat.MONTH_ONLY,
    },
  ],
  [
    'oceanColour',
    {
      subProduct: ['CHL', 'CHL_AGE'],
      stateSegment: 'STATE_daily',
      localSegment: null,
      dateFormat: DateFormat.DAY,
    },
  ],
  [
    'adjustedSeaLevelAnomaly',
    {
      subProduct: ['SLA', 'SLA_pctiles', 'SLA + SST'],
      stateSegment: 'STATE_daily',
      localSegment: null,
      dateFormat: DateFormat.DAY,
    },
  ],
  [
    'surfaceWaves',
    {
      subProduct: [],
      stateSegment: 'WAVES',
      localSegment: null,
      dateFormat: DateFormat.HOUR,
    },
  ],
  [
    'monthlyMeans',
    {
      subProduct: ['anomalies', 'CLIM_OFAM3_SSTAARS', 'CLIM_CNESCARS'],
      stateSegment: '30d_MEAN',
      localSegment: null,
      dateFormat: DateFormat.MONTH_ONLY,
    },
  ],
  [
    'EACMooringArray',
    {
      subProduct: [],
      stateSegment: 'EAC_array_figures/SST/Brisbane',
      localSegment: '',
      dateFormat: DateFormat.DAY,
    },
  ],
]);
