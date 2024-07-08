import dayjs from 'dayjs';
import { TargetPathRegionScope } from '@/constants/imgPath';
import { imageBaseUrl } from '@/configs/image';
import { buildProductImageUrl, buildArgoImageUrl } from './dataImgBuilder';

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

  it('should return the correct image url if pass correct local region for ocean colour chl', () => {
    // Arrange
    const productType = 'oceanColour';
    const subProduct = 'CHL';
    const region = 'Adelaide';
    const regionScope = TargetPathRegionScope.Local;
    const date = '2024051922';
    // Act
    const imageUrl = buildProductImageUrl(productType, subProduct, region, regionScope, date);
    // Assert
    expect(imageUrl).toBe(`${imageBaseUrl}/Adelaide_chl/2024051904.gif`);
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
