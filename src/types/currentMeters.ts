import { CurrentMetersDepth, CurrentMetersProperty, CurrentMetersRegion } from '@/constants/currentMeters';

export interface CurrentMetersImageDataPoints {
  shape: string;
  coords: number[];
  href: string;
  alt: string;
  name: string;
  type: 'text' | 'region' | 'plot';
  code?: CurrentMetersRegion;
}

export type CurrentMetersDeploymentPlotsOptions = {
  label: CurrentMetersMapDataPointNames;
  id: CurrentMetersMapDataPointNames;
};
export type CurrentMetersRegionOptions = {
  label: string;
  id: CurrentMetersRegion;
};
export type CurrentMetersDepthOptions = {
  label: string;
  id: CurrentMetersDepth;
};
export type CurrentMetersPropertyOptions = {
  title: string;
  id: CurrentMetersProperty;
};

export type CurrentMetersMapDataPointNames =
  | 'BMP070'
  | 'BMP090'
  | 'BMP120'
  | 'CAM050'
  | 'CAM100'
  | 'CH070'
  | 'CH100'
  | 'DARBGF'
  | 'EAC0500'
  | 'EAC1520'
  | 'EAC2000'
  | 'EAC3200'
  | 'EAC4200'
  | 'EAC4700'
  | 'EAC4800'
  | 'GBRCCH'
  | 'GBRELR'
  | 'GBRHIN'
  | 'GBRHIS'
  | 'GBRLSH'
  | 'GBRLSL'
  | 'GBRMYR'
  | 'GBROTE'
  | 'GBRPPS'
  | 'ITFFTB'
  | 'ITFJBG'
  | 'ITFMHB'
  | 'ITFOMB'
  | 'ITFTIN'
  | 'ITFTIS'
  | 'ITFTNS'
  | 'ITFTSL'
  | 'KIM050'
  | 'KIM100'
  | 'KIM200'
  | 'KIM400'
  | 'NRSDAR'
  | 'NRSESP'
  | 'NRSKAI'
  | 'NRSMAI'
  | 'NRSNSI'
  | 'NRSNIN'
  | 'NRSROT'
  | 'NRSYON'
  | 'NWSBAR'
  | 'NWSBRW'
  | 'NWSLYN'
  | 'NWSROW'
  | 'ORS065'
  | 'PH100'
  | 'PIL050'
  | 'PIL100'
  | 'PIL200'
  | 'POLYNYA1'
  | 'POLYNYA2'
  | 'SAM1DS'
  | 'SAM2CP'
  | 'SAM3MS'
  | 'SAM4CY'
  | 'SAM5CB'
  | 'SAM6IS'
  | 'SAM7DS'
  | 'SAM8SG'
  | 'SEQ200'
  | 'SEQ400'
  | 'SOFS'
  | 'SOTS'
  | 'SYD100'
  | 'SYD140'
  | 'TAN100'
  | 'TOTTEN1'
  | 'TOTTEN2'
  | 'TOTTEN3'
  | 'WACA20'
  | 'WATR04'
  | 'WATR10'
  | 'WATR15'
  | 'WATR20'
  | 'WATR50';

export interface CurrentMetersMapDataPoints {
  name: CurrentMetersMapDataPointNames;
  coords: [number, number];
  region: CurrentMetersRegion;
}
