import { validateCoords } from '@/utils/validators/map';
import { BoundingBox, GeoJsonPolygon } from '@/types/map';
import {
  calculateAreaFromCoords,
  convertAreaCoordsToGeoJsonCoordinates,
  convertGeoJsonCoordinatesToBBox,
  convertOldOceanCurrentCoordsToBBox,
} from './geo';

vi.mock('@/utils/validators/map', () => ({
  validateCoords: vi.fn(),
}));

describe('calculateAreaFromCoords', () => {
  it('should calculate the correct area', () => {
    const coords: BoundingBox = [141, -47, 152, -40]; // [west, south, east, north]
    const expectedArea = 11 * 7; // (152 - 141) * (-40 - (-47))
    const result = calculateAreaFromCoords(coords);
    expect(result).toBe(expectedArea);
  });

  it('should throw an error for invalid coordinates', () => {
    const invalidCoords: BoundingBox = [-10, -10, -20, 10];
    vi.mocked(validateCoords).mockImplementation(() => {
      throw new Error('Invalid coordinates');
    });
    expect(() => calculateAreaFromCoords(invalidCoords)).toThrow('Invalid coordinates');
  });
});

describe('convertAreaCoordsToGeoJsonCoordinates', () => {
  it('should convert bounding box coordinates to GeoJSON Polygon', () => {
    const coords: BoundingBox = [141, -47, 152, -40];
    const result = convertAreaCoordsToGeoJsonCoordinates(coords);
    expect(result).toEqual([
      [
        [141, -40],
        [152, -40],
        [152, -47],
        [141, -47],
        [141, -40],
      ],
    ]);
  });
});

describe('convertGeoJsonCoordinatesToBBox', () => {
  it('should convert GeoJSON Polygon to bounding box coordinates', () => {
    const geoJsonPolygon: GeoJsonPolygon = [
      [
        [141, -40],
        [152, -40],
        [152, -47],
        [141, -47],
        [141, -40],
      ],
    ];
    const result = convertGeoJsonCoordinatesToBBox(geoJsonPolygon);
    expect(result).toEqual([141, -47, 152, -40]);
  });

  it('should throw an error for invalid GeoJSON Polygon', () => {
    const invalidPolygon: GeoJsonPolygon = [
      [
        [141, -40],
        [152, -40],
        [152, -47],
      ],
    ];
    expect(() => convertGeoJsonCoordinatesToBBox(invalidPolygon)).toThrow(
      'Invalid GeoJsonPolygon: must contain at least 5 coordinate pairs',
    );
  });
});

describe('convertOldOceanCurrentCoordsToBBox', () => {
  it('should convert old ocean current coordinates to bounding box', () => {
    const oldCoords = [141, 152, -47, -40];
    const result = convertOldOceanCurrentCoordsToBBox(oldCoords);
    expect(result).toEqual([141, -47, 152, -40]);
  });
});
