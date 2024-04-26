import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { State, Actions } from './map.types';

const useMapStore = create<State & Actions>()(
  devtools((set) => ({
    mapViewState: {
      latitude: -25.824806,
      longitude: 140.265399,
      bearing: 0,
      pitch: 0,
      zoom: 2.6,
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
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
    },
  })),
);

export const { setMapViewState, updatePositionAndZoom, updateZoom, updateLatitude, updateLongitude, updatePosition } =
  useMapStore.getState().actions;

export default useMapStore;
