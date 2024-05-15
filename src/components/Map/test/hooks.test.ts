import { renderHook } from '@testing-library/react';
import useMapStore from '@/stores/map-store/mapStore';
import useRegionData from '../hooks/useRegionData';

const mockRegions = [
  { region: 'SE', title: 'South East', coords: [145, 162.5, -45, -24.5] },
  { region: 'SW', title: 'South West', coords: [101, 125, -40, -20] },
  { region: 'NE', title: 'North East', coords: [142, 160, -27, -7] },
  { region: 'NW', title: 'North West', coords: [101.1, 132, -25, -5] },
];

vi.mock('@/stores/map-store/mapStore');
vi.doMock('../data/regionData', () => ({
  allRegions: mockRegions,
}));

describe('useRegionData hook', () => {
  it('should only show one or zero box when zoom out', () => {
    vi.mocked(useMapStore).mockReturnValue(2);
    const { result } = renderHook(() => useRegionData());

    expect(result.current.regionData.features.length).toBeLessThanOrEqual(1);
  });
});
