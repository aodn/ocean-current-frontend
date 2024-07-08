import { calculateOffsetByCoords, calculateCenterByCoords } from './argo';

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

    // Act
    const offset = calculateOffsetByCoords(coords);

    // Assert
    // 5/1000 = 0.005
    expect(offset).toEqual([150, -20, 150.5, -20.5]);
  });

  it('should return the correct offset values for different coords', () => {
    // Arrange
    const coords = [100, 200, 200, 300];

    // Act
    const offset = calculateOffsetByCoords(coords);

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
