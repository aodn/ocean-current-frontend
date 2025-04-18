import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { initialMapViewState } from '@/configs/map';
import { State, Actions } from './map.types';

const useMapStore = create<State & Actions>()(
  devtools((set) => ({
    ...initialMapViewState,
    actions: {
      setMapViewState: (mapViewState) => {
        set({ mapViewState }, true, 'setMapViewState');
      },
      updateZoom: (zoom) => set((state) => ({ mapViewState: { ...state.mapViewState, zoom } }), false, 'updateZoom'),
      updateLatitude: (latitude) =>
        set((state) => ({ mapViewState: { ...state.mapViewState, latitude } }), false, 'updateLatitude'),
      updateLongitude: (longitude) =>
        set((state) => ({ mapViewState: { ...state.mapViewState, longitude } }), false, 'updateLongitude'),
      updatePosition: (latitude, longitude) =>
        set((state) => ({ mapViewState: { ...state.mapViewState, latitude, longitude } }), false, 'updatePosition'),
      updatePositionAndZoom: (latitude, longitude, zoom) =>
        set(
          (state) => ({ mapViewState: { ...state.mapViewState, latitude, longitude, zoom } }),
          false,
          'updatePositionAndZoom',
        ),
      reset: () => set(initialMapViewState, false, 'resetMapStore'),
    },
  })),
);

export const {
  setMapViewState,
  updatePositionAndZoom,
  updateZoom,
  updateLatitude,
  updateLongitude,
  updatePosition,
  reset: resetMapStore,
} = useMapStore.getState().actions;

export default useMapStore;
