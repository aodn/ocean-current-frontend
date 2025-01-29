import { CurrentMetersDepth, CurrentMetersProperty, CurrentMetersRegion } from '@/constants/currentMeters';
import { CurrentMetersMapDataPointNames } from '@/types/currentMeters';

export type CurrentMetersStoreState = {
  region: CurrentMetersRegion;
  property: CurrentMetersProperty;
  depth: CurrentMetersDepth;
  date: string;
  deploymentPlot: CurrentMetersMapDataPointNames | '';
};

export type CurrentMetersStoreActions = {
  actions: {
    setSelectedCurrentMeters: (data: CurrentMetersStoreState) => void;
    setRegion: (region: CurrentMetersRegion) => void;
    setDepth: (depth: CurrentMetersDepth) => void;
    setProperty: (property: CurrentMetersProperty) => void;
    setCurrentMetersDate: (date: string) => void;
    setDeploymentPlot: (deploymentPlot: CurrentMetersMapDataPointNames | '') => void;
    reset: () => void;
  };
};
