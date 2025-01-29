import { currentMeterMapDataPointNames } from '@/types/currentMeters';

export interface DataImageWithCurrentMetersPlotsProps {
  subProduct: string;
  deploymentPlot: currentMeterMapDataPointNames | '';
}
