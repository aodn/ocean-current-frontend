// data points coordinates for map

import { CurrentMetersRegion } from '@/constants/currentMeters';
import { CurrentMetersMapDataPoints } from '@/types/currentMeters';

const timorP: CurrentMetersMapDataPoints[] = [
  { name: 'NWSLYN', coords: [130.35, -9.939] },
  { name: 'DARBGF', coords: [130.59, -12.11] },
  { name: 'ITFTIS', coords: [127.55, -9.818] },
  { name: 'ITFMHB', coords: [128, -11.5] },
  { name: 'ITFJBG', coords: [128.97, -13.61] },
  { name: 'ITFFTB', coords: [128.48, -12.29] },
  { name: 'NRSDAR', coords: [130.72, -12.34] },
  { name: 'ITFTNS', coords: [127.25, -9.002] },
  { name: 'ITFTSL', coords: [127.36, -9.274] },
  { name: 'ITFTIN', coords: [127.19, -8.86] },
  { name: 'ITFOMB', coords: [125.06, -8.53] },
];

const kim: CurrentMetersMapDataPoints[] = [
  { name: 'KIM050', coords: [121.59, -16.39] },
  { name: 'KIM100', coords: [121.3, -15.68] },
  { name: 'KIM200', coords: [121.24, -15.53] },
  { name: 'KIM400', coords: [121.11, -15.22] },
  { name: 'NWSBRW', coords: [123.16, -14.24] },
  { name: 'CAM050', coords: [123.8, -14.85] },
  { name: 'CAM100', coords: [123.6, -14.32] },
];

const row: CurrentMetersMapDataPoints[] = [{ name: 'NWSROW', coords: [119.91, -17.76] }];

const pil: CurrentMetersMapDataPoints[] = [
  { name: 'NWSBAR', coords: [114.76, -20.76] },
  { name: 'PIL050', coords: [116.42, -20.05] },
  { name: 'PIL100', coords: [116.11, -19.69] },
  { name: 'PIL200', coords: [115.92, -19.44] },
];

const ning: CurrentMetersMapDataPoints[] = [
  { name: 'TAN100', coords: [113, -21.75] },
  { name: 'NRSNIN', coords: [113.95, -21.8] },
];

const perth: CurrentMetersMapDataPoints[] = [
  { name: 'WATR04', coords: [115.4, -31.72] },
  { name: 'WATR10', coords: [115.2, -31.65] },
  { name: 'WATR15', coords: [115.13, -31.69] },
  { name: 'WATR20', coords: [115.04, -31.73] },
  { name: 'WATR50', coords: [114.96, -31.77] },
  { name: 'WACA20', coords: [115.23, -31.98] },
  { name: 'NRSROT', coords: [115.42, -32] },
];

const esp: CurrentMetersMapDataPoints[] = [{ name: 'NRSESP', coords: [121.85, -33.9] }];

const sa: CurrentMetersMapDataPoints[] = [
  { name: 'SAM1DS', coords: [136.24, -36.52] },
  { name: 'SAM2CP', coords: [135.67, -35.28] },
  { name: 'SAM3MS', coords: [135.9, -36.15] },
  { name: 'SAM4CY', coords: [136.87, -36.53] },
  { name: 'SAM5CB', coords: [135.01, -34.93] },
  { name: 'SAM6IS', coords: [136.6, -35.5] },
  { name: 'SAM7DS', coords: [135.85, -36.2] },
  { name: 'SAM8SG', coords: [136.69, -35.25] },
  { name: 'NRSKAI', coords: [136.45, -35.84] },
];

const totten: CurrentMetersMapDataPoints[] = [
  { name: 'TOTTEN1', coords: [119.21, -66.54] },
  { name: 'TOTTEN2', coords: [120.63, -66.21] },
  { name: 'TOTTEN3', coords: [120.46, -66.5] },
];

const sofs: CurrentMetersMapDataPoints[] = [
  { name: 'SOTS', coords: [141, -46.97] },
  { name: 'SOFS', coords: [142.07, -46.67] },
];

const polynya: CurrentMetersMapDataPoints[] = [
  { name: 'POLYNYA1', coords: [143.47, -66.2] },
  { name: 'POLYNYA2', coords: [143.21, -66.2] },
];

const eTas: CurrentMetersMapDataPoints[] = [{ name: 'NRSMAI', coords: [148.23, -42.65] }];

const bmp: CurrentMetersMapDataPoints[] = [
  { name: 'BMP070', coords: [150.19, -36.19] },
  { name: 'BMP090', coords: [150.23, -36.19] },
  { name: 'BMP120', coords: [150.32, -36.21] },
];

const syd: CurrentMetersMapDataPoints[] = [
  { name: 'SYD100', coords: [151.38, -33.94] },
  { name: 'SYD140', coords: [151.45, -33.99] },
  { name: 'PH100', coords: [151.23, -34.12] },
  { name: 'ORS065', coords: [151.31, -33.89] },
];

const coffs: CurrentMetersMapDataPoints[] = [
  { name: 'CH070', coords: [153.3, -30.27] },
  { name: 'CH100', coords: [153.39, -30.26] },
];

const seq: CurrentMetersMapDataPoints[] = [
  { name: 'NRSNSI', coords: [153.56, -27.34] },
  { name: 'SEQ200', coords: [153.77, -27.34] },
  { name: 'SEQ400', coords: [153.88, -27.33] },
  { name: 'EAC0500', coords: [153.9, -27.33] },
  { name: 'EAC1520', coords: [153.97, -27.31] },
  { name: 'EAC2000', coords: [154, -27.31] },
  { name: 'EAC3200', coords: [154.13, -27.28] },
  { name: 'EAC4200', coords: [154.29, -27.24] },
  { name: 'EAC4700', coords: [154.64, -27.2] },
  { name: 'EAC4800', coords: [155.31, -27.1] },
];

const sgbr: CurrentMetersMapDataPoints[] = [
  { name: 'GBRCCH', coords: [151.99, -22.41] },
  { name: 'GBRHIN', coords: [151.99, -23.38] },
  { name: 'GBRHIS', coords: [151.96, -23.51] },
  { name: 'GBROTE', coords: [152.17, -23.48] },
];

const sgbr2: CurrentMetersMapDataPoints[] = [{ name: 'GBRELR', coords: [152.89, -21.04] }];

const cgbr: CurrentMetersMapDataPoints[] = [
  { name: 'GBRMYR', coords: [147.35, -18.22] },
  { name: 'GBRPPS', coords: [147.17, -18.31] },
  { name: 'NRSYON', coords: [147.62, -19.3] },
];

const ngbr: CurrentMetersMapDataPoints[] = [
  { name: 'GBRLSL', coords: [145.34, -14.34] },
  { name: 'GBRLSH', coords: [145.63, -14.7] },
];

export const currentMetersMapDataPoints: Record<CurrentMetersRegion, CurrentMetersMapDataPoints[]> = {
  [CurrentMetersRegion.Aust]: [], // data points should only be accessible in region level
  [CurrentMetersRegion.TimorP]: timorP,
  [CurrentMetersRegion.Kim]: kim,
  [CurrentMetersRegion.Row]: row,
  [CurrentMetersRegion.Pil]: pil,
  [CurrentMetersRegion.Ning]: ning,
  [CurrentMetersRegion.Perth]: perth,
  [CurrentMetersRegion.Esp]: esp,
  [CurrentMetersRegion.SA]: sa,
  [CurrentMetersRegion.Totten]: totten,
  [CurrentMetersRegion.SOFS]: sofs,
  [CurrentMetersRegion.Polynya]: polynya,
  [CurrentMetersRegion.ETas]: eTas,
  [CurrentMetersRegion.BMP]: bmp,
  [CurrentMetersRegion.Syd]: syd,
  [CurrentMetersRegion.Coffs]: coffs,
  [CurrentMetersRegion.SEQ]: seq,
  [CurrentMetersRegion.SGBR]: sgbr,
  [CurrentMetersRegion.SGBR2]: sgbr2,
  [CurrentMetersRegion.CGBR]: cgbr,
  [CurrentMetersRegion.NGBR]: ngbr,
};

export const currentMetersMapDataPointsFlat = Object.values(currentMetersMapDataPoints).flat();
