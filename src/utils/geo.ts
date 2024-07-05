import { BoundingBox, GeoJsonPolygon } from '@/types/map';
import { validateCoords } from '@/utils/validators/map';

const calculateAreaFromCoords = (coords: BoundingBox) => {
  try {
    validateCoords(coords);
    const [westLongitude, southLatitude, eastLongitude, northLatitude] = coords;
    return Math.abs(eastLongitude - westLongitude) * Math.abs(southLatitude - northLatitude);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error calculating area from coordinates: ${error.message}`);
    }
    throw new Error('Error calculating area from coordinates');
  }
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

export {
  calculateAreaFromCoords,
  convertAreaCoordsToGeoJsonCoordinates,
  convertGeoJsonCoordinatesToBBox,
  convertOldOceanCurrentCoordsToBBox,
};
