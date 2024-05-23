import dayjs from 'dayjs';
import { Region } from '@/types/map';
import { RegionScope } from '@/constants/region';
import { TargetPathRegionScope } from '@/constants/imgPath';
import { imageBaseUrl } from '@/configs/image';
import { isNotNullOrUndefined } from './general';
import { getRegionByRegionTitle } from './region';
import { buildArgoImageUrl, buildProductImageUrl } from './dataImgBuilder';

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

vi.mock('@/data/regionData', () => {
  const mockedRegions: Region[] = [
    { region: 'Au', title: 'Australia/NZ', coords: [100.5, 179.5, -49, -5.5], scope: RegionScope.Au },
    { region: 'SO', title: 'Southern Ocean', coords: [130, 155, -55, -35], scope: RegionScope.State },
    { region: 'SNSW', title: 'Southern NSW', coords: [149.5, 155.5, -37.4, -31.6], scope: RegionScope.Local },
  ];
  return {
    allRegions: mockedRegions,
  };
});

describe('getRegionByRegionTitle', () => {
  it('should return the region object if the region title exists', async () => {
    // Arrange
    const regionTitle = 'Southern NSW';

    // Act
    const region = getRegionByRegionTitle(regionTitle);

    // Assert
    expect(region).toEqual({
      region: 'SNSW',
      title: 'Southern NSW',
      coords: [149.5, 155.5, -37.4, -31.6],
      scope: RegionScope.Local,
    });
  });

  it('should return undefined if the region title does not exist', () => {
    // Arrange
    const regionTitle = 'NonExistentRegion';

    // Act
    const region = getRegionByRegionTitle(regionTitle);

    // Assert
    expect(region).toBeUndefined();
  });
});

describe('calculateOffsetByCoords', async () => {
  vi.doMock('@/constants/argo', () => ({
    argoMapImgParamsNew: {
      imageWidth: 1000,
      imageHeight: 600,
      imageBounds: [100, 200, -50, 10],
    },
  }));

  const { calculateOffsetByCoords } = await import('./argo');
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

describe('buildProductImageUrl', () => {
  it('should return the correct image url if pass correct state region for six day sst', () => {
    // Arrange
    const productType = 'sixDaySst';
    const subProduct = 'SST';
    const region = 'Au';
    const regionScope = TargetPathRegionScope.State;
    const date = '20240519';
    // Act
    const imageUrl = buildProductImageUrl(productType, subProduct, region, regionScope, date);
    // Assert
    expect(imageUrl).toBe(`${imageBaseUrl}/STATE_daily/SST/Au/20240519.gif`);
  });

  it('should return the correct image url if pass correct local region for six day sst', () => {
    // Arrange
    const productType = 'sixDaySst';
    const subProduct = 'SST';
    const region = 'Adelaide';
    const regionScope = TargetPathRegionScope.Local;
    const date = '20240519';
    // Act
    const imageUrl = buildProductImageUrl(productType, subProduct, region, regionScope, date);
    // Assert
    expect(imageUrl).toBe(`${imageBaseUrl}/DR_SST_daily/SST/Adelaide/20240519.gif`);
  });

  it('should return the correct image url if pass correct local region for four hour sst', () => {
    // Arrange
    const productType = 'fourHourSst';
    const subProduct = 'SST';
    const region = 'Adelaide';
    const regionScope = TargetPathRegionScope.Local;
    const date = '2024051922';
    // Act
    const imageUrl = buildProductImageUrl(productType, subProduct, region, regionScope, date);
    // Assert
    expect(imageUrl).toBe(`${imageBaseUrl}/SST_4hr/SST/Adelaide/2024051922.gif`);
  });

  it('should throw an error if pass state region for four hour sst', () => {
    // Arrange
    const productType = 'fourHourSst';
    const subProduct = 'SST';
    const region = 'Au';
    const regionScope = TargetPathRegionScope.State;
    const date = '20240519';
    // Act and Assert
    expect(() => buildProductImageUrl(productType, subProduct, region, regionScope, date)).toThrowError(
      `Product ${productType} does not support state region`,
    );
  });

  it('should throw an error if the product type is not supported', () => {
    // Arrange
    const productType = 'unsupportedProduct';
    const subProduct = 'SST';
    const region = 'Adelaide';
    const regionScope = TargetPathRegionScope.Local;
    const date = '20240519';
    // Act and Assert
    expect(() => buildProductImageUrl(productType, subProduct, region, regionScope, date)).toThrowError(
      `Product type ${productType} is not supported`,
    );
  });
});

describe('buildArgoImageUrl ', () => {
  it('should return the correct image url if pass correct parameters', () => {
    // Arrange
    const worldMeteorologicalOrgId = '1234';
    const date = dayjs('20240519');
    const cycle = '12';
    const depth = '0';

    // Act
    const imageUrl = buildArgoImageUrl(worldMeteorologicalOrgId, date, cycle, depth);

    // Assert
    expect(imageUrl).toBe(`${imageBaseUrl}/profiles/1234/20240519_1234_12.gif`);
  });

  it('should return the formatted date image url when pass different date format', () => {
    // Arrange
    const worldMeteorologicalOrgId = '1234';
    const date = dayjs('2024-05-19');
    const cycle = '12';
    const depth = '0';

    // Act
    const imageUrl = buildArgoImageUrl(worldMeteorologicalOrgId, date, cycle, depth);

    // Assert
    expect(imageUrl).toBe(`${imageBaseUrl}/profiles/1234/20240519_1234_12.gif`);
  });

  it('should return the profiles_s image url if depth is 1', () => {
    // Arrange
    const worldMeteorologicalOrgId = '1234';
    const date = dayjs('20240519');
    const cycle = '12';
    const depth = '1';

    // Act
    const imageUrl = buildArgoImageUrl(worldMeteorologicalOrgId, date, cycle, depth);

    // Assert
    expect(imageUrl).toBe(`${imageBaseUrl}/profiles_s/1234/20240519_1234_12.gif`);
  });
});
