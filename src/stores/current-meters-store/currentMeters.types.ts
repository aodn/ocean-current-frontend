import { currentMeterMapDataPointNames } from '@/data/current-meter/mapDataPoints';
import { CurrentMetersRegion, CurrentMetersProperty, CurrentMetersDepth } from '@/types/currentMeters';

export type State = {
  region: CurrentMetersRegion;
  property: CurrentMetersProperty;
  depth: CurrentMetersDepth;
  date: string;
  deploymentPlot: currentMeterMapDataPointNames | '';
};

export type Actions = {
  actions: {
    setSelectedCurrentMeter: (data: State) => void;
    setRegion: (region: CurrentMetersRegion) => void;
    setDepth: (depth: CurrentMetersDepth) => void;
    setProperty: (property: CurrentMetersProperty) => void;
    setCurrentMetersDate: (date: string) => void;
    setDeploymentPlot: (deploymentPlot: currentMeterMapDataPointNames | '') => void;
    reset: () => void;
  };
};
