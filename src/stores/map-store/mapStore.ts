import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { State, Actions } from './map.types';

const useMapStore = create<State & Actions>()(
  devtools((set) => ({
    zoom: 3,
    actions: {
      setZoom: (zoom) => set({ zoom }, false, 'setZoom'),
      updateZoom: (zoom) => set({ zoom }, false, 'updateZoom'),
    },
  })),
);

export const { setZoom, updateZoom } = useMapStore.getState().actions;

export default useMapStore;
