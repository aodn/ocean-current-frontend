import { BoundingBoxCoords } from '@/types/map';

const validateCoords = (coords: BoundingBoxCoords) => {
  const [westLongitude, eastLongitude, southLatitude, northLatitude] = coords;
  if (coords.length !== 4) {
    throw new Error('Invalid coordinates, must be an array of four numbers.');
  }
  if (coords.some((coord) => typeof coord !== 'number')) {
    throw new Error('Invalid coordinates, all coordinates must be numbers.');
  }
  if (westLongitude > eastLongitude) {
    throw new Error('Invalid coordinates, west coordinate cannot be greater than east coordinate.');
  }
  if (northLatitude < southLatitude) {
    throw new Error('Invalid coordinates, north coordinate cannot be less than south coordinate.');
  }

  return true;
};

export { validateCoords };
