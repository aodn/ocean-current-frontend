import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { initialMapViewState, initialMiniMapViewState } from '@/configs/map';
import { State, Actions } from './map.types';

const useMapStore = create<State & Actions>()(
  devtools((set) => ({
    ...initialMapViewState,
    interactiveLayerClickTimestamp: 0,
    actions: {
      setMapViewState: (mapViewState) => {
        set((state) => ({ mapViewState: { ...state.mapViewState, ...mapViewState } }), false, 'setMapViewState');
      },
      patchMapViewState: (partialViewState) =>
        set(
          (state) => ({
            mapViewState: { ...state.mapViewState, ...partialViewState },
          }),
          false,
          'patchMapViewState',
        ),
      updateZoom: (zoom) => set((state) => ({ mapViewState: { ...state.mapViewState, zoom } }), false, 'updateZoom'),
      updateLatitude: (latitude) =>
        set((state) => ({ mapViewState: { ...state.mapViewState, latitude } }), false, 'updateLatitude'),
      updateLongitude: (longitude) =>
        set((state) => ({ mapViewState: { ...state.mapViewState, longitude } }), false, 'updateLongitude'),
      updatePosition: (latitude, longitude) =>
        set(
          (state) => ({
            mapViewState: { ...state.mapViewState, latitude, longitude },
          }),
          false,
          'updatePosition',
        ),
      updatePositionAndZoom: (latitude, longitude, zoom) =>
        set(
          (state) => ({
            mapViewState: { ...state.mapViewState, latitude, longitude, zoom },
          }),
          false,
          'updatePositionAndZoom',
        ),
      updateInteractiveLayerClickTimestamp: () =>
        set(() => ({ interactiveLayerClickTimestamp: Date.now() }), false, 'updateInteractiveLayerClickTimestamp'),
      reset: (isMiniMap = false) => {
        if (isMiniMap) {
          set((state) => ({ ...state, ...initialMiniMapViewState }), false, 'resetMapStore (mini map)');
        } else {
          set((state) => ({ ...state, ...initialMapViewState }), false, 'resetMapStore (normal map)');
        }
      },
    },
  })),
);

export const {
  setMapViewState,
  patchMapViewState,
  updatePositionAndZoom,
  updateZoom,
  updateLatitude,
  updateLongitude,
  updatePosition,
  updateInteractiveLayerClickTimestamp,
  reset: resetMapStore,
} = useMapStore.getState().actions;

export default useMapStore;
