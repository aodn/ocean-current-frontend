import { MapboxGeoJSONFeature } from 'react-map-gl';
import * as generalUtils from '@/utils/general-utils/general';
import { extractPropertyFromFeatures } from '../utils/mapUtils';

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
