import { CurrentMeterRegion, CurrentMeterProperty, CurrentMeterDepth } from '@/types/currentMeters';

export type State = {
  region: CurrentMeterRegion;
  property: CurrentMeterProperty;
  depth: CurrentMeterDepth;
};

export type Actions = {
  actions: {
    setSelectedCurrentMeter: (data: State) => void;
    setRegion: (region: CurrentMeterRegion) => void;
    setDepth: (depth: CurrentMeterDepth) => void;
    setProperty: (property: CurrentMeterProperty) => void;
    reset: () => void;
  };
};
