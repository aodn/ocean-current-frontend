import { CurrentMetersDepth, CurrentMetersProperty, CurrentMetersRegion } from '@/constants/currentMeters';
import { CurrentMetersDeploymentPlotNames } from '@/types/currentMeters';

export type CurrentMetersStoreState = {
  region: CurrentMetersRegion;
  property: CurrentMetersProperty;
  depth: CurrentMetersDepth;
  date: string;
  deploymentPlot: CurrentMetersDeploymentPlotNames | '';
};

export type CurrentMetersStoreActions = {
  actions: {
    setSelectedCurrentMeters: (data: CurrentMetersStoreState) => void;
    setRegion: (region: CurrentMetersRegion) => void;
    setDepth: (depth: CurrentMetersDepth) => void;
    setProperty: (property: CurrentMetersProperty) => void;
    setCurrentMetersDate: (date: string) => void;
    setDeploymentPlot: (deploymentPlot: CurrentMetersDeploymentPlotNames | '') => void;
    reset: () => void;
  };
};
