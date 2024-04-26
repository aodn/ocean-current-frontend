import { ViewState } from 'react-map-gl';

export type State = {
  mapViewState: ViewState;
};

export type Actions = {
  actions: {
    setMapViewState: (mapViewState: State['mapViewState']) => void;
    updateZoom: (zoom: number) => void;
    updateLatitude: (latitude: number) => void;
    updateLongitude: (longitude: number) => void;
    updatePosition: (latitude: number, longitude: number) => void;
    updatePositionAndZoom: (latitude: number, longitude: number, zoom: number) => void;
  };
};
