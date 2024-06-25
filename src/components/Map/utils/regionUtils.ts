import { BoundingBoxCoords, GeoJsonPolygon } from '@/types/map';

export const calculateAreaFromCoords = (coords: BoundingBoxCoords) => {
  const [westLongitude, eastLongitude, southLatitude, northLatitude] = coords;
  if (westLongitude > eastLongitude) {
    throw new Error('Invalid coordinates, west coordinate cannot be greater than east coordinate.');
  }
  if (Math.abs(northLatitude) > Math.abs(southLatitude)) {
    throw new Error('Invalid coordinates, north coordinate cannot be greater than south coordinate in absolute value.');
  }
  return Math.abs(eastLongitude - westLongitude) * Math.abs(southLatitude - northLatitude);
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
