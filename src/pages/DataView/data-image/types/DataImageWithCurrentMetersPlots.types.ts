import { CurrentMeterMapDataPointNames } from '@/types/currentMeters';

export interface DataImageWithCurrentMetersPlotsProps {
  subProduct: string;
  deploymentPlot: CurrentMeterMapDataPointNames | '';
}
