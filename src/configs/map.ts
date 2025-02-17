const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string;
const MAPBOX_MAP_STYLE = import.meta.env.VITE_MAPBOX_MAP_STYLE as string;

export const mapConfig = {
  accessToken: MAPBOX_ACCESS_TOKEN,
  style: MAPBOX_MAP_STYLE,
};

export const initialMapViewState = {
  mapViewState: {
    latitude: -28.5,
    longitude: 140,
    bearing: 0,
    pitch: 0,
    zoom: 3.055,
    padding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
};
