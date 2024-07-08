import { BoundingBox } from '@/types/map';

const validateCoords = (coords: BoundingBox) => {
  const [westLongitude, southLatitude, eastLongitude, northLatitude] = coords;
  if (coords.length !== 4) {
    throw new Error('Invalid coordinates, must be an array of four numbers.');
  }

  if (coords.some((coord) => typeof coord !== 'number')) {
    throw new Error('Invalid coordinates, all coordinates must be numbers.');
  }

  if (westLongitude < -180 || westLongitude > 180 || eastLongitude < -180 || eastLongitude > 180) {
    throw new Error('Invalid coordinates, longitude must be between -180 and 180 degrees.');
  }

  if (southLatitude < -90 || southLatitude > 90 || northLatitude < -90 || northLatitude > 90) {
    throw new Error('Invalid coordinates, latitude must be between -90 and 90 degrees.');
  }

  if (westLongitude >= eastLongitude) {
    throw new Error('Invalid coordinates, west longitude must be less than east longitude.');
  }

  if (southLatitude >= northLatitude) {
    throw new Error('Invalid coordinates, south latitude must be less than north latitude.');
  }

  return true;
};

export { validateCoords };
