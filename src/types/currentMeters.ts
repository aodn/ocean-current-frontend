export enum CurrentMeterRegion {
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

export enum CurrentMeterProperty {
  vmean = 'vmean',
  vrms = 'vrms',
  M2 = 'M2',
  S2 = 'S2',
  N2 = 'N2',
  O1 = 'O1',
  K1 = 'K1',
}

export enum CurrentMeterDepth {
  One = '1',
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
}

export enum CurrentMeterPlot {
  Zero = '0',
  One = '1',
}

export enum CurrentMeterPlotType {
  DepthTime = 'xyz',
  VelocityVector = 'zt',
}
