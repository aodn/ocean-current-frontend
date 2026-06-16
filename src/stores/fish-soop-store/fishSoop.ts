import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { FishSoopStoreState, FishSoopStoreActions } from './fishSoop.types';

const initialState: FishSoopStoreState = {
  region: 'Au',
  quarter: '',
  layer: '',
  avgPage: '1',
  mode: 'region',
};

const useFishSoopStore = create<FishSoopStoreState & FishSoopStoreActions>()(
  devtools(
    (set) => ({
      ...initialState,
      actions: {
        setRegion: (region) => set({ region }, false, 'setRegion'),
        setQuarter: (quarter) => set({ quarter }, false, 'setQuarter'),
        setLayer: (layer) => set({ layer }, false, 'setLayer'),
        setAvgPage: (avgPage) => set({ avgPage }, false, 'setAvgPage'),
        setMode: (mode) => set({ mode }, false, 'setMode'),
        reset: () => set(initialState, false, 'resetFishSoopStore'),
      },
    }),
    { name: 'FishSOOP Store' },
  ),
);

export const {
  setRegion: setFishSoopRegion,
  setQuarter: setFishSoopQuarter,
  setLayer: setFishSoopLayer,
  setAvgPage: setFishSoopAvgPage,
  setMode: setFishSoopMode,
  reset: resetFishSoopStore,
} = useFishSoopStore.getState().actions;

export { useFishSoopStore, initialState };

export default useFishSoopStore;
