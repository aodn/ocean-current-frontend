import { CurrentMetersDepth, CurrentMetersProperty, CurrentMetersRegion } from '@/constants/currentMeters';
import { CurrentMeterMapDataPointNames } from '@/types/currentMeters';

export type CurrentMetersStoreState = {
  region: CurrentMetersRegion;
  property: CurrentMetersProperty;
  depth: CurrentMetersDepth;
  date: string;
  deploymentPlot: CurrentMeterMapDataPointNames | '';
};

export type CurrentMetersStoreActions = {
  actions: {
    setSelectedCurrentMeter: (data: CurrentMetersStoreState) => void;
    setRegion: (region: CurrentMetersRegion) => void;
    setDepth: (depth: CurrentMetersDepth) => void;
    setProperty: (property: CurrentMetersProperty) => void;
    setCurrentMetersDate: (date: string) => void;
    setDeploymentPlot: (deploymentPlot: CurrentMeterMapDataPointNames | '') => void;
    reset: () => void;
  };
};
