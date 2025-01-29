// data points coordinates for map

import { CurrentMetersRegion } from '@/constants/currentMeters';
import { CurrentMetersMapDataPoints } from '@/types/currentMeters';

const timorP: CurrentMetersMapDataPoints[] = [
  { name: 'NWSLYN', coords: [130.35, -9.939], region: CurrentMetersRegion.TimorP },
  { name: 'DARBGF', coords: [130.59, -12.11], region: CurrentMetersRegion.TimorP },
  { name: 'ITFTIS', coords: [127.55, -9.818], region: CurrentMetersRegion.TimorP },
  { name: 'ITFMHB', coords: [128, -11.5], region: CurrentMetersRegion.TimorP },
  { name: 'ITFJBG', coords: [128.97, -13.61], region: CurrentMetersRegion.TimorP },
  { name: 'ITFFTB', coords: [128.48, -12.29], region: CurrentMetersRegion.TimorP },
  { name: 'NRSDAR', coords: [130.72, -12.34], region: CurrentMetersRegion.TimorP },
  { name: 'ITFTNS', coords: [127.25, -9.002], region: CurrentMetersRegion.TimorP },
  { name: 'ITFTSL', coords: [127.36, -9.274], region: CurrentMetersRegion.TimorP },
  { name: 'ITFTIN', coords: [127.19, -8.86], region: CurrentMetersRegion.TimorP },
  { name: 'ITFOMB', coords: [125.06, -8.53], region: CurrentMetersRegion.TimorP },
];

const kim: CurrentMetersMapDataPoints[] = [
  { name: 'KIM050', coords: [121.59, -16.39], region: CurrentMetersRegion.Kim },
  { name: 'KIM100', coords: [121.3, -15.68], region: CurrentMetersRegion.Kim },
  { name: 'KIM200', coords: [121.24, -15.53], region: CurrentMetersRegion.Kim },
  { name: 'KIM400', coords: [121.11, -15.22], region: CurrentMetersRegion.Kim },
  { name: 'NWSBRW', coords: [123.16, -14.24], region: CurrentMetersRegion.Kim },
  { name: 'CAM050', coords: [123.8, -14.85], region: CurrentMetersRegion.Kim },
  { name: 'CAM100', coords: [123.6, -14.32], region: CurrentMetersRegion.Kim },
];

const row: CurrentMetersMapDataPoints[] = [
  { name: 'NWSROW', coords: [119.91, -17.76], region: CurrentMetersRegion.Row },
];

const pil: CurrentMetersMapDataPoints[] = [
  { name: 'NWSBAR', coords: [114.76, -20.76], region: CurrentMetersRegion.Pil },
  { name: 'PIL050', coords: [116.42, -20.05], region: CurrentMetersRegion.Pil },
  { name: 'PIL100', coords: [116.11, -19.69], region: CurrentMetersRegion.Pil },
  { name: 'PIL200', coords: [115.92, -19.44], region: CurrentMetersRegion.Pil },
];

const ning: CurrentMetersMapDataPoints[] = [
  { name: 'TAN100', coords: [113, -21.75], region: CurrentMetersRegion.Ning },
  { name: 'NRSNIN', coords: [113.95, -21.8], region: CurrentMetersRegion.Ning },
];

const perth: CurrentMetersMapDataPoints[] = [
  { name: 'WATR04', coords: [115.4, -31.72], region: CurrentMetersRegion.Perth },
  { name: 'WATR10', coords: [115.2, -31.65], region: CurrentMetersRegion.Perth },
  { name: 'WATR15', coords: [115.13, -31.69], region: CurrentMetersRegion.Perth },
  { name: 'WATR20', coords: [115.04, -31.73], region: CurrentMetersRegion.Perth },
  { name: 'WATR50', coords: [114.96, -31.77], region: CurrentMetersRegion.Perth },
  { name: 'WACA20', coords: [115.23, -31.98], region: CurrentMetersRegion.Perth },
  { name: 'NRSROT', coords: [115.42, -32], region: CurrentMetersRegion.Perth },
];

const esp: CurrentMetersMapDataPoints[] = [
  { name: 'NRSESP', coords: [121.85, -33.9], region: CurrentMetersRegion.Esp },
];

const sa: CurrentMetersMapDataPoints[] = [
  { name: 'SAM1DS', coords: [136.24, -36.52], region: CurrentMetersRegion.SA },
  { name: 'SAM2CP', coords: [135.67, -35.28], region: CurrentMetersRegion.SA },
  { name: 'SAM3MS', coords: [135.9, -36.15], region: CurrentMetersRegion.SA },
  { name: 'SAM4CY', coords: [136.87, -36.53], region: CurrentMetersRegion.SA },
  { name: 'SAM5CB', coords: [135.01, -34.93], region: CurrentMetersRegion.SA },
  { name: 'SAM6IS', coords: [136.6, -35.5], region: CurrentMetersRegion.SA },
  { name: 'SAM7DS', coords: [135.85, -36.2], region: CurrentMetersRegion.SA },
  { name: 'SAM8SG', coords: [136.69, -35.25], region: CurrentMetersRegion.SA },
  { name: 'NRSKAI', coords: [136.45, -35.84], region: CurrentMetersRegion.SA },
];

const totten: CurrentMetersMapDataPoints[] = [
  { name: 'TOTTEN1', coords: [119.21, -66.54], region: CurrentMetersRegion.Totten },
  { name: 'TOTTEN2', coords: [120.63, -66.21], region: CurrentMetersRegion.Totten },
  { name: 'TOTTEN3', coords: [120.46, -66.5], region: CurrentMetersRegion.Totten },
];

const sofs: CurrentMetersMapDataPoints[] = [
  { name: 'SOTS', coords: [141, -46.97], region: CurrentMetersRegion.SOFS },
  { name: 'SOFS', coords: [142.07, -46.67], region: CurrentMetersRegion.SOFS },
];

const polynya: CurrentMetersMapDataPoints[] = [
  { name: 'POLYNYA1', coords: [143.47, -66.2], region: CurrentMetersRegion.Polynya },
  { name: 'POLYNYA2', coords: [143.21, -66.2], region: CurrentMetersRegion.Polynya },
];

const eTas: CurrentMetersMapDataPoints[] = [
  { name: 'NRSMAI', coords: [148.23, -42.65], region: CurrentMetersRegion.ETas },
];

const bmp: CurrentMetersMapDataPoints[] = [
  { name: 'BMP070', coords: [150.19, -36.19], region: CurrentMetersRegion.BMP },
  { name: 'BMP090', coords: [150.23, -36.19], region: CurrentMetersRegion.BMP },
  { name: 'BMP120', coords: [150.32, -36.21], region: CurrentMetersRegion.BMP },
];

const syd: CurrentMetersMapDataPoints[] = [
  { name: 'SYD100', coords: [151.38, -33.94], region: CurrentMetersRegion.Syd },
  { name: 'SYD140', coords: [151.45, -33.99], region: CurrentMetersRegion.Syd },
  { name: 'PH100', coords: [151.23, -34.12], region: CurrentMetersRegion.Syd },
  { name: 'ORS065', coords: [151.31, -33.89], region: CurrentMetersRegion.Syd },
];

const coffs: CurrentMetersMapDataPoints[] = [
  { name: 'CH070', coords: [153.3, -30.27], region: CurrentMetersRegion.Coffs },
  { name: 'CH100', coords: [153.39, -30.26], region: CurrentMetersRegion.Coffs },
];

const seq: CurrentMetersMapDataPoints[] = [
  { name: 'NRSNSI', coords: [153.56, -27.34], region: CurrentMetersRegion.SEQ },
  { name: 'SEQ200', coords: [153.77, -27.34], region: CurrentMetersRegion.SEQ },
  { name: 'SEQ400', coords: [153.88, -27.33], region: CurrentMetersRegion.SEQ },
  { name: 'EAC0500', coords: [153.9, -27.33], region: CurrentMetersRegion.SEQ },
  { name: 'EAC1520', coords: [153.97, -27.31], region: CurrentMetersRegion.SEQ },
  { name: 'EAC2000', coords: [154, -27.31], region: CurrentMetersRegion.SEQ },
  { name: 'EAC3200', coords: [154.13, -27.28], region: CurrentMetersRegion.SEQ },
  { name: 'EAC4200', coords: [154.29, -27.24], region: CurrentMetersRegion.SEQ },
  { name: 'EAC4700', coords: [154.64, -27.2], region: CurrentMetersRegion.SEQ },
  { name: 'EAC4800', coords: [155.31, -27.1], region: CurrentMetersRegion.SEQ },
];

const sgbr: CurrentMetersMapDataPoints[] = [
  { name: 'GBRCCH', coords: [151.99, -22.41], region: CurrentMetersRegion.SGBR },
  { name: 'GBRHIN', coords: [151.99, -23.38], region: CurrentMetersRegion.SGBR },
  { name: 'GBRHIS', coords: [151.96, -23.51], region: CurrentMetersRegion.SGBR },
  { name: 'GBROTE', coords: [152.17, -23.48], region: CurrentMetersRegion.SGBR },
];

const sgbr2: CurrentMetersMapDataPoints[] = [
  { name: 'GBRELR', coords: [152.89, -21.04], region: CurrentMetersRegion.SGBR2 },
];

const cgbr: CurrentMetersMapDataPoints[] = [
  { name: 'GBRMYR', coords: [147.35, -18.22], region: CurrentMetersRegion.CGBR },
  { name: 'GBRPPS', coords: [147.17, -18.31], region: CurrentMetersRegion.CGBR },
  { name: 'NRSYON', coords: [147.62, -19.3], region: CurrentMetersRegion.CGBR },
];

const ngbr: CurrentMetersMapDataPoints[] = [
  { name: 'GBRLSL', coords: [145.34, -14.34], region: CurrentMetersRegion.NGBR },
  { name: 'GBRLSH', coords: [145.63, -14.7], region: CurrentMetersRegion.NGBR },
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
