import { validateCoords } from '@/utils/validators/map';
import { BoundingBox, GeoJsonPolygon } from '@/types/map';
import {
  calculateAreaFromCoords,
  calculateCenterByCoords,
  calculateOffsetByCoords,
  convertAreaCoordsToGeoJsonCoordinates,
  convertGeoJsonCoordinatesToBBox,
  convertOldOceanCurrentCoordsToBBox,
  getBoundsFromCoordsArray,
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

vi.mock('@/constants/argo', () => ({
  argoMapImgParamsNew: {
    imageWidth: 1000,
    imageHeight: 600,
    imageBounds: [100, 200, -50, 10],
  },
}));

describe('calculateOffsetByCoords', async () => {
  it('should return the correct offset values', () => {
    // Arrange
    const coords = [500, 300, 505, 305];
    const imageParameter = {
      imageWidth: 1000,
      imageHeight: 600,
      imageBounds: [100, 200, -50, 10],
    };

    // Act
    const offset = calculateOffsetByCoords(coords, imageParameter);

    // Assert
    // 5/1000 = 0.005
    expect(offset).toEqual([150, -20, 150.5, -20.5]);
  });

  it('should return the correct offset values for different coords', () => {
    // Arrange
    const coords = [100, 200, 200, 300];
    const imageParameter = {
      imageWidth: 1000,
      imageHeight: 600,
      imageBounds: [100, 200, -50, 10],
    };

    // Act
    const offset = calculateOffsetByCoords(coords, imageParameter);

    //100/1000 = 10
    // Assert
    expect(offset).toEqual([110, -10, 120, -20]);
  });
});

describe('calculateCenterByCoords', () => {
  it('calculates the center point correctly for positive coordinates', () => {
    const coords = [0, 0, 4, 4];
    const result = calculateCenterByCoords(coords);
    expect(result).toEqual([2, 2]);
  });

  it('calculates the center point correctly for negative coordinates', () => {
    const coords = [-2, -2, 2, 2];
    const result = calculateCenterByCoords(coords);
    expect(result).toEqual([0, 0]);
  });

  it('handles decimal coordinates', () => {
    const coords = [1.5, 2.5, 3.5, 4.5];
    const result = calculateCenterByCoords(coords);
    expect(result).toEqual([2.5, 3.5]);
  });

  it('returns the same point if both coordinates are the same', () => {
    const coords = [3, 3, 3, 3];
    const result = calculateCenterByCoords(coords);
    expect(result).toEqual([3, 3]);
  });
});

describe('getBoundsFromCoordsArray', () => {
  it('should correctly calculate bounds for a single coordinate', () => {
    const coordinates: [number, number][] = [[100, 50]];
    const bounds = getBoundsFromCoordsArray(coordinates);

    expect(bounds).toEqual([
      [100, 50], // Southwest
      [100, 50], // Northeast
    ]);
  });

  it('should correctly calculate bounds for multiple coordinates', () => {
    const coordinates: [number, number][] = [
      [100, 50],
      [200, 60],
      [150, 40],
    ];
    const bounds = getBoundsFromCoordsArray(coordinates);

    expect(bounds).toEqual([
      [100, 40], // Southwest (min lng, min lat)
      [200, 60], // Northeast (max lng, max lat)
    ]);
  });

  it('should handle negative coordinates correctly', () => {
    const coordinates: [number, number][] = [
      [-100, -50],
      [-200, -60],
      [-150, -40],
    ];
    const bounds = getBoundsFromCoordsArray(coordinates);

    expect(bounds).toEqual([
      [-200, -60], // Southwest
      [-100, -40], // Northeast
    ]);
  });

  it('should handle mixed positive and negative coordinates', () => {
    const coordinates: [number, number][] = [
      [-100, 50],
      [100, -50],
      [0, 0],
    ];
    const bounds = getBoundsFromCoordsArray(coordinates);

    expect(bounds).toEqual([
      [-100, -50], // Southwest
      [100, 50], // Northeast
    ]);
  });

  it('should handle coordinates around the prime meridian', () => {
    const coordinates: [number, number][] = [
      [-5, 5],
      [5, -5],
      [0, 0],
    ];
    const bounds = getBoundsFromCoordsArray(coordinates);

    expect(bounds).toEqual([
      [-5, -5], // Southwest
      [5, 5], // Northeast
    ]);
  });

  it('should throw error for empty coordinates array', () => {
    const coordinates: [number, number][] = [];

    expect(() => getBoundsFromCoordsArray(coordinates)).toThrow('Coordinates array cannot be empty');
  });

  it('should handle your specific coordinates correctly', () => {
    const coordinates: [number, number][] = [
      [212, -20],
      [107, -30],
      [202, -28],
      [100, -9],
      [187, -45],
      [174, -7],
      [160, -28],
      [207, -2],
      [169, -14],
      [114, -43],
      [166, -1],
      [171, -24],
      [187, -53],
      [199, 3],
      [96, -58],
      [181, 2],
      [154, -61],
      [168, -22],
    ];

    const bounds = getBoundsFromCoordsArray(coordinates);

    expect(bounds).toEqual([
      [96, -61], // Southwest (min lng, min lat)
      [212, 3], // Northeast (max lng, max lat)
    ]);
  });

  it('should handle decimal coordinates', () => {
    const coordinates: [number, number][] = [
      [100.5, 50.25],
      [200.75, 60.125],
      [150.125, 40.875],
    ];
    const bounds = getBoundsFromCoordsArray(coordinates);

    expect(bounds).toEqual([
      [100.5, 40.875], // Southwest
      [200.75, 60.125], // Northeast
    ]);
  });

  it('should handle coordinates at the same latitude', () => {
    const coordinates: [number, number][] = [
      [100, 50],
      [200, 50],
      [150, 50],
    ];
    const bounds = getBoundsFromCoordsArray(coordinates);

    expect(bounds).toEqual([
      [100, 50], // Southwest
      [200, 50], // Northeast
    ]);
  });

  it('should handle coordinates at the same longitude', () => {
    const coordinates: [number, number][] = [
      [100, 40],
      [100, 60],
      [100, 50],
    ];
    const bounds = getBoundsFromCoordsArray(coordinates);

    expect(bounds).toEqual([
      [100, 40], // Southwest
      [100, 60], // Northeast
    ]);
  });
});
