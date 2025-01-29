import { CurrentMetersMapDataPointNames } from '@/types/currentMeters';

export interface DataImageWithCurrentMetersPlotsProps {
  subProduct: string;
  deploymentPlot: CurrentMetersMapDataPointNames | '';
}
