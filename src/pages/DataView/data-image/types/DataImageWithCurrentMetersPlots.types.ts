import { currentMeterMapDataPointNames } from '@/types/currentMeters';

export interface DataImageWithCurrentMetersPlotsProps {
  subProduct: string;
  deploymentPlot: null | currentMeterMapDataPointNames;
}
