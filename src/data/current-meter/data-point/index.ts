import { CurrentMeterRegion } from '@/types/currentMeters';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const currentMeterDataPointTitles = [
  'BMP070',
  'BMP090',
  'BMP120',
  'CAM050',
  'CAM100',
  'CH070',
  'CH100',
  'DARBGF',
  'EAC0500',
  'EAC1520',
  'EAC2000',
  'EAC3200',
  'EAC4200',
  'EAC4700',
  'EAC4800',
  'GBRCCH',
  'GBRELR',
  'GBRHIN',
  'GBRHIS',
  'GBRLSH',
  'GBRLSL',
  'GBRMYR',
  'GBROTE',
  'GBRPPS',
  'ITFFTB',
  'ITFJBG',
  'ITFMHB',
  'ITFOMB',
  'ITFTIN',
  'ITFTIS',
  'ITFTNS',
  'ITFTSL',
  'KIM050',
  'KIM100',
  'KIM200',
  'KIM400',
  'NRSDAR',
  'NRSESP',
  'NRSKAI',
  'NRSMAI',
  'NRSNIN',
  'NRSROT',
  'NRSYON',
  'NWSBAR',
  'NWSBRW',
  'NWSLYN',
  'NWSROW',
  'ORS065',
  'PH100',
  'PIL050',
  'PIL100',
  'PIL200',
  'POLYNYA1',
  'POLYNYA2',
  'SAM1DS',
  'SAM2CP',
  'SAM3MS',
  'SAM4CY',
  'SAM5CB',
  'SAM6IS',
  'SAM7DS',
  'SAM8SG',
  'SEQ200',
  'SEQ400',
  'SOFS',
  'SOTS',
  'SYD100',
  'SYD140',
  'TAN100',
  'TOTTEN1',
  'TOTTEN2',
  'TOTTEN3',
  'WACA20',
  'WATR04',
  'WATR10',
  'WATR15',
  'WATR20',
  'WATR50',
] as const;

type dataPointTitle = (typeof currentMeterDataPointTitles)[number];

interface CurrentMeterDataPoint {
  title: dataPointTitle;
  coords: [number, number];
}

const timorP: CurrentMeterDataPoint[] = [
  { title: 'DARBGF', coords: [130.59, -12.11] },
  { title: 'ITFOMB', coords: [125.06, -8.53] },
  { title: 'ITFTIN', coords: [127.19, -8.86] },
  { title: 'ITFTNS', coords: [127.25, -9.002] },
  { title: 'ITFTSL', coords: [127.36, -9.274] },
  { title: 'ITFTIS', coords: [127.55, -9.818] },
  { title: 'ITFMHB', coords: [128, -11.5] },
  { title: 'ITFFTB', coords: [128.48, -12.29] },
  { title: 'ITFJBG', coords: [128.97, -13.61] },
  { title: 'NRSDAR', coords: [130.72, -12.34] },
  { title: 'NWSLYN', coords: [130.35, -9.939] },
];

const kim: CurrentMeterDataPoint[] = [
  { title: 'KIM050', coords: [121.59, -16.39] },
  { title: 'KIM100', coords: [121.3, -15.68] },
  { title: 'KIM200', coords: [121.24, -155.53] },
  { title: 'KIM400', coords: [121.11, -15.22] },
  { title: 'NWSBRW', coords: [123.16, -14.24] },
  { title: 'CAM050', coords: [123.8, -14.85] },
  { title: 'CAM100', coords: [123.6, -14.32] },
];

const row: CurrentMeterDataPoint[] = [{ title: 'NWSROW', coords: [119.91, -17.76] }];

const pil: CurrentMeterDataPoint[] = [
  { title: 'NWSBAR', coords: [114.76, -20.76] },
  { title: 'PIL050', coords: [116.42, -20.05] },
  { title: 'PIL100', coords: [116.11, -19.69] },
  { title: 'PIL200', coords: [115.92, -19.44] },
];

const ning: CurrentMeterDataPoint[] = [
  { title: 'TAN100', coords: [139.91, -21.8] },
  { title: 'NRSNIN', coords: [113.95, -21.8] },
];

const perth: CurrentMeterDataPoint[] = [
  { title: 'WATR04', coords: [115.4, -31.72] },
  { title: 'WATR10', coords: [115.2, -31.65] },
  { title: 'WATR15', coords: [115.13, -31.69] },
  { title: 'WATR20', coords: [115.04, -31.73] },
  { title: 'WATR50', coords: [114.96, -31.77] },
  { title: 'WACA20', coords: [115.23, -31.98] },
  { title: 'NRSROT', coords: [115.42, -32] },
];

const esp: CurrentMeterDataPoint[] = [{ title: 'NRSESP', coords: [121.85, -33.9] }];

const sa: CurrentMeterDataPoint[] = [
  { title: 'SAM1DS', coords: [136.24, -36.52] },
  { title: 'SAM2CP', coords: [135.67, -35.28] },
  { title: 'SAM3MS', coords: [135.9, -36.15] },
  { title: 'SAM4CY', coords: [136.87, -36.53] },
  { title: 'SAM5CB', coords: [135.01, -34.93] },
  { title: 'SAM6IS', coords: [136.6, -35.5] },
  { title: 'SAM7DS', coords: [135.85, -36.2] },
  { title: 'SAM8SG', coords: [136.69, -35.25] },
  { title: 'NRSKAI', coords: [136.45, -35.84] },
];

const totten: CurrentMeterDataPoint[] = [
  { title: 'TOTTEN1', coords: [119.21, -66.54] },
  { title: 'TOTTEN2', coords: [120.63, -66.21] },
  { title: 'TOTTEN3', coords: [120.46, -66.5] },
];

const sofs: CurrentMeterDataPoint[] = [
  // * The coords are same and it's very hard to see them on the map, so offset added *
  { title: 'SOFS', coords: [142.07 - 0.5, -46.67 + 0.15] },
  { title: 'SOTS', coords: [142.07, -46.67] },
];

const polynya: CurrentMeterDataPoint[] = [
  { title: 'POLYNYA1', coords: [143.47, -66.2] },
  { title: 'POLYNYA2', coords: [143.21, -66.2] },
];

const eTas: CurrentMeterDataPoint[] = [{ title: 'NRSMAI', coords: [148.23, -42.65] }];

const bmp: CurrentMeterDataPoint[] = [
  { title: 'BMP070', coords: [150.19, -36.19] },
  { title: 'BMP090', coords: [150.23, -36.19] },
  { title: 'BMP120', coords: [150.32, -36.21] },
];

const syd: CurrentMeterDataPoint[] = [
  { title: 'SYD100', coords: [151.38, -33.94] },
  { title: 'SYD140', coords: [151.45, -33.99] },
  { title: 'PH100', coords: [151.23, -34.12] },
  { title: 'ORS065', coords: [151.31, -33.89] },
];

const coffs: CurrentMeterDataPoint[] = [
  { title: 'CH070', coords: [153.3, -30.27] },
  { title: 'CH100', coords: [153.39, -30.26] },
];

const seq: CurrentMeterDataPoint[] = [
  { title: 'NRSNIN', coords: [153.56, -27.34] },
  { title: 'SEQ200', coords: [153.77, -27.34] },
  { title: 'SEQ400', coords: [153.88, -27.33] },
  { title: 'EAC0500', coords: [153.9, -27.33] },
  { title: 'EAC1520', coords: [153.97, -27.31] },
  { title: 'EAC2000', coords: [154, -27.31] },
  { title: 'EAC3200', coords: [154.13, -27.28] },
  { title: 'EAC4200', coords: [154.29, -27.24] },
  { title: 'EAC4700', coords: [154.64, -27.2] },
  { title: 'EAC4800', coords: [155.31, -27.1] },
];

const sgbr: CurrentMeterDataPoint[] = [
  { title: 'GBRCCH', coords: [151.99, -22.41] },
  { title: 'GBRHIN', coords: [151.99, -23.38] },
  { title: 'GBRHIS', coords: [151.96, -23.51] },
  { title: 'GBROTE', coords: [152.17, -23.48] },
];

const sgbr2: CurrentMeterDataPoint[] = [{ title: 'GBRELR', coords: [152.89, -21.04] }];

const cgbr: CurrentMeterDataPoint[] = [
  { title: 'GBRMYR', coords: [147.35, -18.22] },
  { title: 'GBRPPS', coords: [147.17, -18.31] },
  { title: 'NRSYON', coords: [147.62, -19.3] },
];

const ngbr: CurrentMeterDataPoint[] = [
  { title: 'GBRLSL', coords: [145.34, -14.34] },
  { title: 'GBRLSH', coords: [145.63, -14.7] },
];

export const currentMeterDataPointsMap: Record<CurrentMeterRegion, CurrentMeterDataPoint[]> = {
  [CurrentMeterRegion.Aust]: [],
  [CurrentMeterRegion.TimorP]: timorP,
  [CurrentMeterRegion.Kim]: kim,
  [CurrentMeterRegion.Row]: row,
  [CurrentMeterRegion.Pil]: pil,
  [CurrentMeterRegion.Ning]: ning,
  [CurrentMeterRegion.Perth]: perth,
  [CurrentMeterRegion.Esp]: esp,
  [CurrentMeterRegion.SA]: sa,
  [CurrentMeterRegion.Totten]: totten,
  [CurrentMeterRegion.SOFS]: sofs,
  [CurrentMeterRegion.Polynya]: polynya,
  [CurrentMeterRegion.ETas]: eTas,
  [CurrentMeterRegion.BMP]: bmp,
  [CurrentMeterRegion.Syd]: syd,
  [CurrentMeterRegion.Coffs]: coffs,
  [CurrentMeterRegion.SEQ]: seq,
  [CurrentMeterRegion.SGBR]: sgbr,
  [CurrentMeterRegion.SGBR2]: sgbr2,
  [CurrentMeterRegion.CGBR]: cgbr,
  [CurrentMeterRegion.NGBR]: ngbr,
};

export const currentMeterDataPointsArray = Object.values(currentMeterDataPointsMap).flat();
