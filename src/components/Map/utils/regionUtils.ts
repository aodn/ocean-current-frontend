import { BoundingBoxCoords, GeoJsonPolygon } from '@/types/map';
import { validateCoords } from '@/utils/validators/map';

export const calculateAreaFromCoords = (coords: BoundingBoxCoords) => {
  try {
    validateCoords(coords);
    const [westLongitude, eastLongitude, southLatitude, northLatitude] = coords;
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
 * @param {BoundingBoxCoords} coords An array of four numbers representing the coordinates
 * of the bounding box in the order [west, east, south, north].
 * @returns {GeoJsonPolygon} A GeoJSON Polygon object as an array of arrays, representing
 * the bounding box defined by the input coordinates.
 */
export const convertAreaCoordsToGeoJsonCoordinates = (coords: BoundingBoxCoords): GeoJsonPolygon => {
  const [west, east, south, north] = coords;
  return [
    [
      [west, north],
      [east, north],
      [east, south],
      [west, south],
      [west, north],
    ],
  ];
};
