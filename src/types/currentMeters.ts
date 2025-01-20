export interface CurrentMetersImageDataPoints {
  shape: string | undefined;
  coords: number[];
  href: string | undefined;
  alt: string | undefined;
  name: string | undefined;
  isText?: boolean;
}

export enum CurrentMetersSubproductsKey {
  MOORED_INSTRUMENT_ARRAY = 'currentMeters-mooredInstrumentArray',
  SHELF = 'currentMeters-shelf',
  DEEP_ADCP = 'currentMeters-deepADCP',
  DEEP_ADV = 'currentMeters-deepADV',
  SOUTHERN_OCEAN = 'currentMeters-southernOcean',
}

export enum CurrentMetersRegion {
  Aust = '01_Aust',
  TimorP = '02_TimorP',
  Kim = '03_Kim',
  Row = '23_Row',
  Pil = '04_Pil',
  Ning = '05_Ning',
  Perth = '06_Perth',
  Esp = '07_Esp',
  SA = '08_SA',
  Totten = '17_Totten',
  SOFS = '19_SOFS',
  Polynya = '18_Polynya',
  ETas = '09_ETas',
  BMP = '22_BMP',
  Syd = '10_Syd',
  Coffs = '11_Coffs',
  SEQ = '12_SEQ',
  SGBR = '13_SGBR',
  SGBR2 = '14_SGBR2',
  CGBR = '15_CGBR',
  NGBR = '16_NGBR',
}

export enum CurrentMetersProperty {
  vmean = 'vmean',
  vrms = 'vrms',
  M2 = 'M2',
  S2 = 'S2',
  N2 = 'N2',
  O1 = 'O1',
  K1 = 'K1',
}

export enum CurrentMetersDepth {
  ONE = '1',
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  SEVEN = '7',
  EIGHT = '8',
  NINE = '9',
}

export enum CurrentMetersPlotType {
  VELOCITY_VECTOR = 'xyz',
  DEPTH_TIME = 'zt',
}
