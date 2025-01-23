import { LngLatBoundsLike } from 'mapbox-gl';
import { BoundingBox, GeoJsonPolygon } from '@/types/map';
import { validateCoords } from '@/utils/validators/map';

const calculateAreaFromCoords = (coords: BoundingBox, shouldValidate: boolean = true) => {
  if (shouldValidate) {
    validateCoords(coords);
  }
  const [westLongitude, southLatitude, eastLongitude, northLatitude] = coords;
  return Math.abs((eastLongitude - westLongitude) * (northLatitude - southLatitude));
};

/**
 * Converts a list of four coordinates representing the corners of a bounding box
 * into a GeoJSON Polygon representation.
 *
 * @param {BoundingBox} coords An array of four numbers representing the coordinates
 * of the bounding box in the order [west, south, east, north].
 * @returns {GeoJsonPolygon} A GeoJSON Polygon object as an array of arrays, representing
 * the bounding box defined by the input coordinates.
 */
const convertAreaCoordsToGeoJsonCoordinates = (coords: BoundingBox): GeoJsonPolygon => {
  const [westLongitude, southLatitude, eastLongitude, northLatitude] = coords;

  return [
    [
      [westLongitude, northLatitude],
      [eastLongitude, northLatitude],
      [eastLongitude, southLatitude],
      [westLongitude, southLatitude],
      [westLongitude, northLatitude],
    ],
  ];
};

const convertGeoJsonCoordinatesToBBox = (geoJsonPolygon: GeoJsonPolygon): BoundingBox => {
  const coordinates = geoJsonPolygon[0];

  if (coordinates.length < 5) {
    throw new Error('Invalid GeoJsonPolygon: must contain at least 5 coordinate pairs');
  }

  const [westLongitude, northLatitude] = coordinates[0];
  const [eastLongitude] = coordinates[1];
  const [, southLatitude] = coordinates[2];

  return [westLongitude, southLatitude, eastLongitude, northLatitude];
};

const convertOldOceanCurrentCoordsToBBox = (coords: number[]): BoundingBox => {
  const [westLongitude, eastLongitude, southLatitude, northLatitude] = coords;
  return [westLongitude, southLatitude, eastLongitude, northLatitude];
};

const calculateOffsetByCoords = (
  coords: number[],
  imageParameter: { imageWidth: number; imageHeight: number; imageBounds: number[] },
): number[] => {
  const { imageWidth, imageHeight, imageBounds } = imageParameter;
  const imageToGeo = (x: number, y: number) => {
    const longitude = imageBounds[0] + (x / imageWidth) * (imageBounds[1] - imageBounds[0]);
    const latitude = imageBounds[3] + (y / imageHeight) * (imageBounds[2] - imageBounds[3]);
    return { longitude, latitude };
  };
  const [x1, y1, x2, y2] = coords;
  const topLeftGeo = imageToGeo(x1, y1);
  const bottomRightGeo = imageToGeo(x2, y2);
  return [topLeftGeo.longitude, topLeftGeo.latitude, bottomRightGeo.longitude, bottomRightGeo.latitude];
};

const calculateCenterByCoords = (coords: number[]): number[] => {
  const [x1, y1, x2, y2] = coords;
  return [(x1 + x2) / 2, (y1 + y2) / 2];
};

const getBoundsFromCoordsArray = (coordinates: [number, number][]): LngLatBoundsLike => {
  if (!coordinates.length) {
    throw new Error('Coordinates array cannot be empty');
  }
  const bounds = {
    minLng: coordinates[0][0],
    maxLng: coordinates[0][0],
    minLat: coordinates[0][1],
    maxLat: coordinates[0][1],
  };

  coordinates.forEach(([lng, lat]) => {
    bounds.minLng = Math.min(bounds.minLng, lng);
    bounds.maxLng = Math.max(bounds.maxLng, lng);
    bounds.minLat = Math.min(bounds.minLat, lat);
    bounds.maxLat = Math.max(bounds.maxLat, lat);
  });

  return [
    [bounds.minLng, bounds.minLat],
    [bounds.maxLng, bounds.maxLat],
  ];
};

export {
  calculateAreaFromCoords,
  convertAreaCoordsToGeoJsonCoordinates,
  convertGeoJsonCoordinatesToBBox,
  convertOldOceanCurrentCoordsToBBox,
  calculateOffsetByCoords,
  calculateCenterByCoords,
  getBoundsFromCoordsArray,
};
