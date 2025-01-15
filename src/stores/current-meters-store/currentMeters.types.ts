import { CurrentMetersRegion, CurrentMetersProperty, CurrentMetersDepth } from '@/types/currentMeters';

export type State = {
  region: CurrentMetersRegion;
  property: CurrentMetersProperty;
  depth: CurrentMetersDepth;
};

export type Actions = {
  actions: {
    setSelectedCurrentMeter: (data: State) => void;
    setRegion: (region: CurrentMetersRegion) => void;
    setDepth: (depth: CurrentMetersDepth) => void;
    setProperty: (property: CurrentMetersProperty) => void;
    reset: () => void;
  };
};
