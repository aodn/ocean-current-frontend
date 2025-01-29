import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { yearOptionsData } from '@/data/current-meter/sidebarOptions';
import { CurrentMetersDepth, CurrentMetersProperty, CurrentMetersRegion } from '@/constants/currentMeters';
import { CurrentMetersStoreState, CurrentMetersStoreActions } from './currentMeters.types';

const initialState: CurrentMetersStoreState = {
  region: CurrentMetersRegion.Aust,
  property: CurrentMetersProperty.vrms,
  depth: CurrentMetersDepth.ONE,
  date: yearOptionsData[0].id, // allTime
  deploymentPlot: '',
};

const useCurrentMetersStore = create<CurrentMetersStoreState & CurrentMetersStoreActions>()(
  devtools((set) => ({
    ...initialState,
    actions: {
      setSelectedCurrentMeters: (data) => set(data, false, 'setSelectedCurrentMeters'),
      setRegion: (region) => set({ region }, false, 'setRegion'),
      setDepth: (depth) => set({ depth }, false, 'setDepth'),
      setProperty: (property) => set({ property }, false, 'setProperty'),
      setCurrentMetersDate: (date) => set({ date }, false, 'setCurrentMetersDate'),
      setDeploymentPlot: (deploymentPlot) => set({ deploymentPlot }, false, 'setDeploymentPlot'),
      reset: () => set(initialState, false, 'resetCurrentMetersStore'),
    },
  })),
);

export const {
  setSelectedCurrentMeters,
  setRegion,
  setDepth,
  setProperty,
  setDeploymentPlot,
  setCurrentMetersDate,
  reset: resetCurrentMetersStore,
} = useCurrentMetersStore.getState().actions;

export { useCurrentMetersStore, initialState };

export default useCurrentMetersStore;
