import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { currentMeterRegion, currentMeterProperty, currentMeterDepth } from '@/types/currentMeters';
import { State, Actions } from './currentMeters.types';

const initialState: State = {
  region: currentMeterRegion.Aust,
  property: currentMeterProperty.vmean,
  depth: currentMeterDepth.One,
};

const useCurrentMeterStore = create<State & Actions>()(
  devtools((set) => ({
    ...initialState,
    actions: {
      setSelectedCurrentMeter: (data) => set(data, false, 'setSelectedCurrentMeter'),
      setRegion: (region) => set({ region }, false, 'setRegion'),
      setDepth: (depth) => set({ depth }, false, 'setDepth'),
      setProperty: (property) => set({ property }, false, 'setProperty'),
      reset: () => set(initialState, false, 'resetCurrentMeterStore'),
    },
  })),
);

export const {
  setSelectedCurrentMeter,
  setRegion,
  setDepth,
  setProperty,
  reset: resetCurrentMeterStore,
} = useCurrentMeterStore.getState().actions;

export { useCurrentMeterStore };

export default useCurrentMeterStore;
