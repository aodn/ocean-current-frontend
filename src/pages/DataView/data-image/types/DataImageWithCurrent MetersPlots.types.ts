import { currentMeterMapDataPointNames } from '@/data/current-meter/mapDataPoints';

export interface DataImageWithCurrentMetersPlotsProps {
  subProduct: string;
  deploymentPlot: '' | currentMeterMapDataPointNames;
}
