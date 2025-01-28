import { CurrentMetersDepth, CurrentMetersProperty, CurrentMetersRegion } from '@/constants/currentMeters';
import { currentMeterMapDataPointNames } from '@/types/currentMeters';

export type State = {
  region: CurrentMetersRegion;
  property: CurrentMetersProperty;
  depth: CurrentMetersDepth;
  date: string;
  deploymentPlot: currentMeterMapDataPointNames | null;
};

export type Actions = {
  actions: {
    setSelectedCurrentMeter: (data: State) => void;
    setRegion: (region: CurrentMetersRegion) => void;
    setDepth: (depth: CurrentMetersDepth) => void;
    setProperty: (property: CurrentMetersProperty) => void;
    setCurrentMetersDate: (date: string) => void;
    setDeploymentPlot: (deploymentPlot: currentMeterMapDataPointNames | null) => void;
    reset: () => void;
  };
};
