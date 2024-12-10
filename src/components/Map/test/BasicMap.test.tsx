import { render, screen, renderHook } from '@testing-library/react';
import { mapConfig } from '@/configs/map';
import useMapStore from '@/stores/map-store/mapStore';
import BasicMap from '../BasicMap';
import useRegionData from '../hooks/useRegionData';

vi.mock('react-map-gl', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="test-map">{children}</div>,
  FullscreenControl: () => <div>FullscreenControl</div>,
  NavigationControl: () => <div>NavigationControl</div>,
  ViewStateChangeEvent: () => <div>ViewStateChangeEvent</div>,
}));

vi.mock('../layers/RegionPolygonLayer/RegionPolygonLayer', () => {
  return {
    default: () => <div>RegionPolygonLayer</div>,
  };
});

vi.mock('../layers/ArgoAsProductLayer/ArgoAsProductLayer.tsx', () => {
  return {
    default: () => <div>ArgoAsProductLayerLayer</div>,
  };
});

describe('BasicMap Component', () => {
  it.skip('renders correctly with default props', () => {
    //Arrange
    mapConfig.accessToken = 'test-api-key';

    // Act
    render(<BasicMap />);

    // Assert
    expect(screen.getByText('NavigationControl')).toBeInTheDocument();
    expect(screen.getByText('RegionPolygonLayer')).toBeInTheDocument();
  });

  it.skip('displays error message when API key is missing', () => {
    // Arrange
    mapConfig.accessToken = '';

    // Act
    render(<BasicMap />);

    // Assert
    expect(screen.getByText('Map cannot be loaded.')).toBeInTheDocument();
    expect(screen.getByText('Mapbox API Key is not configured.')).toBeInTheDocument();
  });

  it.skip('loads map correctly when API key is provided', () => {
    // Arrange
    mapConfig.accessToken = 'test-api-key';

    // Act
    render(<BasicMap />);

    // Assert
    expect(screen.getByTestId('test-map')).toBeInTheDocument();
  });
});

const mockRegions = [
  { code: 'SE', title: 'South East', coords: [145, -45, 162.5, -24.5] },
  { code: 'SW', title: 'South West', coords: [101, -40, 125, -20] },
  { code: 'NE', title: 'North East', coords: [142, -27, 160, -7] },
  { code: 'NW', title: 'North West', coords: [101.1, -25, 132, -5] },
];

vi.mock('@/stores/map-store/mapStore');
vi.doMock('../data/regionData', () => ({
  allRegions: mockRegions,
}));

describe('useRegionData', () => {
  beforeEach(() => {
    vi.mocked(useMapStore).mockReturnValue(2.6);
  });

  it('should only show one or zero box when zoom out in large scale', () => {
    // Arrange
    vi.mocked(useMapStore).mockReturnValue(2);

    // Act
    const { result } = renderHook(() => useRegionData());

    // Assert
    expect(result.current.regionData.features.length).toBeLessThanOrEqual(1);
  });
});
