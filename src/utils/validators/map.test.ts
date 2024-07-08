import { describe, it, expect } from 'vitest';
import { BoundingBox } from '@/types/map';
import { validateCoords } from './map';

describe('validateCoords', () => {
  it('should return true for valid coordinates', () => {
    const validCoords: BoundingBox = [141, -47, 152, -40];
    expect(validateCoords(validCoords)).toBe(true);
  });

  it('should throw an error if the array does not contain exactly 4 elements', () => {
    const invalidCoords: BoundingBox = [-10, -10, 10] as unknown as BoundingBox;
    expect(() => validateCoords(invalidCoords)).toThrow('Invalid coordinates, must be an array of four numbers.');
  });

  it('should throw an error if any coordinate is not a number', () => {
    const invalidCoords: BoundingBox = [-10, -10, '10' as never, 10];
    expect(() => validateCoords(invalidCoords)).toThrow('Invalid coordinates, all coordinates must be numbers.');
  });

  it('should throw an error if longitude is out of range', () => {
    const westTooLow: BoundingBox = [-181, 0, 0, 1];
    const westTooHigh: BoundingBox = [181, 0, 182, 1];
    const eastTooLow: BoundingBox = [-10, 0, -181, 1];
    const eastTooHigh: BoundingBox = [-10, 0, 181, 1];

    expect(() => validateCoords(westTooLow)).toThrow(
      'Invalid coordinates, longitude must be between -180 and 180 degrees.',
    );
    expect(() => validateCoords(westTooHigh)).toThrow(
      'Invalid coordinates, longitude must be between -180 and 180 degrees.',
    );
    expect(() => validateCoords(eastTooLow)).toThrow(
      'Invalid coordinates, longitude must be between -180 and 180 degrees.',
    );
    expect(() => validateCoords(eastTooHigh)).toThrow(
      'Invalid coordinates, longitude must be between -180 and 180 degrees.',
    );
  });

  it('should throw an error if latitude is out of range', () => {
    const southTooLow: BoundingBox = [0, -91, 1, 0];
    const southTooHigh: BoundingBox = [0, 91, 1, 92];
    const northTooLow: BoundingBox = [0, -10, 1, -91];
    const northTooHigh: BoundingBox = [0, -10, 1, 91];

    expect(() => validateCoords(southTooLow)).toThrow(
      'Invalid coordinates, latitude must be between -90 and 90 degrees.',
    );
    expect(() => validateCoords(southTooHigh)).toThrow(
      'Invalid coordinates, latitude must be between -90 and 90 degrees.',
    );
    expect(() => validateCoords(northTooLow)).toThrow(
      'Invalid coordinates, latitude must be between -90 and 90 degrees.',
    );
    expect(() => validateCoords(northTooHigh)).toThrow(
      'Invalid coordinates, latitude must be between -90 and 90 degrees.',
    );
  });

  it('should throw an error if west longitude is greater than or equal to east longitude', () => {
    const greaterCoords: BoundingBox = [10, -10, -10, 10];
    const equalCoords: BoundingBox = [0, -10, 0, 10];
    expect(() => validateCoords(greaterCoords)).toThrow(
      'Invalid coordinates, west longitude must be less than east longitude.',
    );
    expect(() => validateCoords(equalCoords)).toThrow(
      'Invalid coordinates, west longitude must be less than east longitude.',
    );
  });

  it('should throw an error if south latitude is greater than or equal to north latitude', () => {
    const greaterCoords: BoundingBox = [-10, 10, 10, -10];
    const equalCoords: BoundingBox = [-10, 0, 10, 0];
    expect(() => validateCoords(greaterCoords)).toThrow(
      'Invalid coordinates, south latitude must be less than north latitude.',
    );
    expect(() => validateCoords(equalCoords)).toThrow(
      'Invalid coordinates, south latitude must be less than north latitude.',
    );
  });

  it('should accept coordinates near the edge of validity', () => {
    const nearEdgeCoords: BoundingBox = [-179.9, -89.9, 179.9, 89.9];
    expect(validateCoords(nearEdgeCoords)).toBe(true);
  });
});
