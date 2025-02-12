import { Region } from '@/types/map';
import { RegionScope } from '@/constants/region';
import { getRegionByRegionTitleOrCode } from './region';

vi.mock('@/data/regionData', () => {
  const mockedRegions: Region[] = [
    { code: 'Au', title: 'Australia/NZ', coords: [100.5, -49, 179.5, -5.5], scope: RegionScope.Au },
    { code: 'SO', title: 'Southern Ocean', coords: [130, -55, 155, -35], scope: RegionScope.State },
    { code: 'SNSW', title: 'Southern NSW', coords: [149.5, -37.4, 155.5, -31.6], scope: RegionScope.Local },
  ];
  return {
    allRegions: mockedRegions,
  };
});

describe('getRegionByRegionTitleOrCode', () => {
  it('should return the region object if the region title exists', async () => {
    // Arrange
    const regionTitle = 'Southern NSW';

    // Act
    const region = getRegionByRegionTitleOrCode(regionTitle);

    // Assert
    expect(region).toEqual({
      code: 'SNSW',
      title: 'Southern NSW',
      coords: [149.5, -37.4, 155.5, -31.6],
      scope: RegionScope.Local,
    });
  });

  it('should return the region object if the region code exists', async () => {
    // Arrange
    const regionTitle = 'SNSW';

    // Act
    const region = getRegionByRegionTitleOrCode(regionTitle);

    // Assert
    expect(region).toEqual({
      code: 'SNSW',
      title: 'Southern NSW',
      coords: [149.5, -37.4, 155.5, -31.6],
      scope: RegionScope.Local,
    });
  });

  it('should return undefined if the region title does not exist', () => {
    // Arrange
    const regionTitle = 'NonExistentRegion';

    // Act
    const region = getRegionByRegionTitleOrCode(regionTitle);

    // Assert
    expect(region).toBeUndefined();
  });
});
