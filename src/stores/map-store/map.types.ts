import { ViewState } from 'react-map-gl/mapbox';

export type State = {
  mapViewState: ViewState;
  interactiveLayerClickTimestamp: number;
};

export type Actions = {
  actions: {
    setMapViewState: (mapViewState: State['mapViewState']) => void;
    patchMapViewState: (partialViewState: Partial<State['mapViewState']>) => void;
    updateZoom: (zoom: number) => void;
    updateLatitude: (latitude: number) => void;
    updateLongitude: (longitude: number) => void;
    updatePosition: (latitude: number, longitude: number) => void;
    updatePositionAndZoom: (latitude: number, longitude: number, zoom: number) => void;
    updateInteractiveLayerClickTimestamp: () => void;
    reset: (isMiniMap?: boolean) => void;
  };
};
