const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string;
const MAPBOX_MAP_STYLE = import.meta.env.VITE_MAPBOX_MAP_STYLE as string;

export const mapConfig = {
  accessToken: MAPBOX_ACCESS_TOKEN,
  style: MAPBOX_MAP_STYLE,
};
