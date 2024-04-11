export const calculateAreaFromCoords = (coords: number[]) => {
  const [west, east, south, north] = coords;
  if (west > east) {
    throw new Error('Invalid coordinates, west coordinate is greater than east coordinate.');
  }
  if (Math.abs(north) > Math.abs(south)) {
    throw new Error('Invalid coordinates, north coordinate is greater than south coordinate in absolute value.');
  }
  return Math.abs(east - west) * Math.abs(south - north);
};

type GeoJsonPolygon = number[][][];
/**
 * Converts a list of four coordinates representing the corners of a bounding box
 * into a GeoJSON Polygon representation.
 *
 * @param coords An array of four numbers representing the coordinates
 * of the bounding box in the order [west, east, south, north].
 * @returns {GeoJsonPolygon} A GeoJSON Polygon object as an array of arrays, representing
 * the bounding box defined by the input coordinates.
 */
export const convertAreaCoordsToGeoJsonCoordinates = (coords: number[]): GeoJsonPolygon => {
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
