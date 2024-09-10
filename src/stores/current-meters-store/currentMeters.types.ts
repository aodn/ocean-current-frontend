import { currentMeterRegion, currentMeterProperty, currentMeterDepth } from '@/types/currentMeters';

export type State = {
  region: currentMeterRegion;
  property: currentMeterProperty;
  depth: currentMeterDepth;
};

export type Actions = {
  actions: {
    setSelectedCurrentMeter: (data: State) => void;
    setRegion: (region: currentMeterRegion) => void;
    setDepth: (depth: currentMeterDepth) => void;
    setProperty: (property: currentMeterProperty) => void;
    reset: () => void;
  };
};
