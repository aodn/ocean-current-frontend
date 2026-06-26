import type { LngLatBoundsLike } from 'mapbox-gl';

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string;
const MAPBOX_MAP_STYLE = import.meta.env.VITE_MAPBOX_MAP_STYLE as string;

export const mapConfig = {
  accessToken: MAPBOX_ACCESS_TOKEN,
  style: MAPBOX_MAP_STYLE,
};

export const mapAnimation = {
  duration: 600,
};

/**
 * Bounds used to limit how far the user can zoom out / pan on the main map.
 * This does NOT control the initial view.
 * Format: [[west, south], [east, north]]
 */
export const MAP_LIMIT_BOUNDS: LngLatBoundsLike = [
  [60, -65], // west, south
  [-140, 20], // east, north
];

export const MAP_MAX_ZOOM = 6;
export const MAP_MINIMAP_MAX_ZOOM = 5;

export const initialMapViewState = {
  mapViewState: {
    latitude: -28.5,
    longitude: 140,
    bearing: 0,
    pitch: 0,
    zoom: 2.92,
    padding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
};

export const initialMiniMapViewState = {
  mapViewState: {
    ...initialMapViewState.mapViewState,
    zoom: 1.3,
  },
};

export const initialMobileMapViewState = {
  mapViewState: {
    ...initialMapViewState.mapViewState,
    latitude: -27.5,
    longitude: 133,
    zoom: 2.3,
  },
};
