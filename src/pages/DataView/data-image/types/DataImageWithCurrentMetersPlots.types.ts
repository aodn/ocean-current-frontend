import { CurrentMetersSubproductsKey } from '@/constants/currentMeters';
import { CurrentMetersMapDataPointNames } from '@/types/currentMeters';

export interface DataImageWithCurrentMetersPlotsProps {
  subProductKey: CurrentMetersSubproductsKey;
  deploymentPlot: CurrentMetersMapDataPointNames;
}
