import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CurrentMetersRegion, CurrentMetersProperty, CurrentMetersDepth } from '@/types/currentMeters';
import { yearOptionsData } from '@/data/current-meter/sidebarOptions';
import { State, Actions } from './currentMeters.types';

const initialState: State = {
  region: CurrentMetersRegion.Aust,
  property: CurrentMetersProperty.vrms,
  depth: CurrentMetersDepth.ONE,
  date: yearOptionsData[0].id, // allTime
  deploymentPlot: '',
};

const useCurrentMeterStore = create<State & Actions>()(
  devtools((set) => ({
    ...initialState,
    actions: {
      setSelectedCurrentMeter: (data) => set(data, false, 'setSelectedCurrentMeter'),
      setRegion: (region) => set({ region }, false, 'setRegion'),
      setDepth: (depth) => set({ depth }, false, 'setDepth'),
      setProperty: (property) => set({ property }, false, 'setProperty'),
      setCurrentMetersDate: (date) => set({ date }, false, 'setCurrentMetersDate'),
      setDeploymentPlot: (deploymentPlot) => set({ deploymentPlot }, false, 'setDeploymentPlot'),
      reset: () => set(initialState, false, 'resetCurrentMeterStore'),
    },
  })),
);

export const {
  setSelectedCurrentMeter,
  setRegion,
  setDepth,
  setProperty,
  setDeploymentPlot,
  setCurrentMetersDate,
  reset: resetCurrentMeterStore,
} = useCurrentMeterStore.getState().actions;

export { useCurrentMeterStore };

export default useCurrentMeterStore;
