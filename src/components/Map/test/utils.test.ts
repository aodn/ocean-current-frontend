import { MapboxGeoJSONFeature } from 'react-map-gl';
import { isNotNullOrUndefined } from '../utils/generalUtils';
import { extractPropertyFromFeatures } from '../utils/mapUtils';
import * as generalUtils from '../utils/generalUtils';

describe('extractPropertyFromFeatures', async () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockFeatures: MapboxGeoJSONFeature[] = [
    {
      type: 'Feature',
      properties: { id: 1, name: 'Test Feature', value: 42 },
      geometry: { type: 'Point', coordinates: [0, 0] },
    },
  ] as unknown as MapboxGeoJSONFeature[];

  const mockEmptyFeatures = [] as unknown as MapboxGeoJSONFeature[];

  it('should extract properties when all conditions are met', async () => {
    // Arrange
    vi.spyOn(generalUtils, 'isNotNullOrUndefined').mockReturnValue(true);

    //Act
    const result = extractPropertyFromFeatures(mockFeatures, ['id', 'name', 'value']);

    // Assert
    expect(result).toEqual({ id: 1, name: 'Test Feature', value: 42 });
  });

  it('should throw an error if features array is empty', () => {
    // Arrange
    vi.spyOn(generalUtils, 'isNotNullOrUndefined').mockReturnValue(false);

    // Act and Assert
    expect(() => extractPropertyFromFeatures(mockEmptyFeatures, ['id'])).toThrowError(
      /Features are empty or properties are not found in the features/,
    );
  });

  it('should throw an error if property is undefined', () => {
    // Arrange
    vi.spyOn(generalUtils, 'isNotNullOrUndefined').mockReturnValue(false);

    // Act and Assert
    expect(() => extractPropertyFromFeatures(mockFeatures, ['missingProp'])).toThrowError(
      /Property .* is not found in the features/,
    );
  });

  it('should extract properties correctly from features', () => {
    // Arrange
    vi.spyOn(generalUtils, 'isNotNullOrUndefined').mockReturnValue(true);

    // Act
    const result = extractPropertyFromFeatures(mockFeatures, ['id', 'name']);

    // Assert
    expect(result).toEqual({ id: 1, name: 'Test Feature' });
  });
});

describe('isNotNullOrUndefined', () => {
  it('should return true if the value is not null or undefined', () => {
    // Act and Assert
    expect(isNotNullOrUndefined(1)).toBe(true);
    expect(isNotNullOrUndefined('')).toBe(true);
    expect(isNotNullOrUndefined(0)).toBe(true);
    expect(isNotNullOrUndefined([])).toBe(true);
    expect(isNotNullOrUndefined({})).toBe(true);
    expect(isNotNullOrUndefined(false)).toBe(true);
  });

  it('should return false if the value is null or undefined', () => {
    // Act and Assert
    expect(isNotNullOrUndefined(null)).toBe(false);
    expect(isNotNullOrUndefined(undefined)).toBe(false);
  });
});
