import { CurrentMetersProperty, CurrentMetersDepth, CurrentMetersRegion } from '@/types/currentMeters';

export const regionsOptionsData = [
  { label: 'Aust', id: CurrentMetersRegion.Aust },
  { label: 'TimorP', id: CurrentMetersRegion.TimorP },
  { label: 'Kim', id: CurrentMetersRegion.Kim },
  { label: 'Row', id: CurrentMetersRegion.Row },
  { label: 'Pil', id: CurrentMetersRegion.Pil },
  { label: 'Ning', id: CurrentMetersRegion.Ning },
  { label: 'Perth', id: CurrentMetersRegion.Perth },
  { label: 'Esp', id: CurrentMetersRegion.Esp },
  { label: 'SA', id: CurrentMetersRegion.SA },
  { label: 'Totten', id: CurrentMetersRegion.Totten },
  { label: 'SOFS', id: CurrentMetersRegion.SOFS },
  { label: 'Polynya', id: CurrentMetersRegion.Polynya },
  { label: 'ETas', id: CurrentMetersRegion.ETas },
  { label: 'BMP', id: CurrentMetersRegion.BMP },
  { label: 'Syd', id: CurrentMetersRegion.Syd },
  { label: 'Coffs', id: CurrentMetersRegion.Coffs },
  { label: 'SEQ', id: CurrentMetersRegion.SEQ },
  { label: 'SGBR', id: CurrentMetersRegion.SGBR },
  { label: 'SGBR2', id: CurrentMetersRegion.SGBR2 },
  { label: 'CGBR', id: CurrentMetersRegion.CGBR },
  { label: 'NGBR', id: CurrentMetersRegion.NGBR },
];

export const depthOptionsData = [
  { label: '0-4800m', id: CurrentMetersDepth.ONE },
  { label: '0-30m', id: CurrentMetersDepth.TWO },
  { label: '30-80m', id: CurrentMetersDepth.THREE },
  { label: '80-150m', id: CurrentMetersDepth.FOUR },
  { label: '150-300m', id: CurrentMetersDepth.FIVE },
  { label: '300-600m', id: CurrentMetersDepth.SIX },
  { label: '600-1200m', id: CurrentMetersDepth.SEVEN },
  { label: '1200-2200m', id: CurrentMetersDepth.EIGHT },
  { label: '2200-4800m', id: CurrentMetersDepth.NINE },
];

export const propertyOptionsData = [
  { title: 'vmean', id: CurrentMetersProperty.vmean },
  { title: 'vrms', id: CurrentMetersProperty.vrms },
  { title: 'M2', id: CurrentMetersProperty.M2 },
  { title: 'S2', id: CurrentMetersProperty.S2 },
  { title: 'N2', id: CurrentMetersProperty.N2 },
  { title: 'O1', id: CurrentMetersProperty.O1 },
  { title: 'K1', id: CurrentMetersProperty.K1 },
];
