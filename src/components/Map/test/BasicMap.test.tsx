import { render, screen, renderHook } from '@testing-library/react';
import { mapConfig } from '@/configs/map';
import useMapStore from '@/stores/map-store/mapStore';
import { BoundingBoxCoords } from '@/types/map';
import { calculateAreaFromCoords, convertAreaCoordsToGeoJsonCoordinates } from '../utils/regionUtils';
import BasicMap from '../BasicMap';
import useRegionData from '../hooks/useRegionData';

describe('Map utils', () => {
  describe('calculateAreaFromCoords', () => {
    it('should calculate the correct area for valid coordinates', () => {
      // Arrange
      const coords: BoundingBoxCoords = [141, 152, -47, -40]; // [west, east, south, north]
      const expectedArea = 11 * 7; // (152 - 141) * (-40 - (-47))

      // Act & Assert
      expect(calculateAreaFromCoords(coords)).toBe(expectedArea);
    });

    it('should throw an error for invalid coordinates where west is greater than east', () => {
      // Arrange
      const coords: BoundingBoxCoords = [152, 141, -47, -40];

      // Act & Assert
      expect(() => calculateAreaFromCoords(coords)).toThrow('Invalid coordinates');
    });

    it('should throw an error for invalid coordinates where north is greater than south', () => {
      // Arrange
      const coords: BoundingBoxCoords = [141, 152, -40, -47];

      // Act & Assert
      expect(() => calculateAreaFromCoords(coords)).toThrow('Invalid coordinates');
    });
  });
  describe('convertAreaCoordsToGeoJsonCoordinates', () => {
    it('should convert area coordinates to GeoJSON polygon', () => {
      // Arrange
      const mockCoords: BoundingBoxCoords = [141, 152, -47, -40];
      const expectedGeoJsonPolygon = [
        [
          [141, -40],
          [152, -40],
          [152, -47],
          [141, -47],
          [141, -40],
        ],
      ];

      // Act
      const result = convertAreaCoordsToGeoJsonCoordinates(mockCoords);

      // Assert
      expect(result).toEqual(expectedGeoJsonPolygon);
    });
  });
});

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

describe('BasicMap Component', () => {
  it('renders correctly with default props', () => {
    //Arrange
    mapConfig.accessToken = 'test-api-key';

    // Act
    render(<BasicMap />);

    // Assert
    expect(screen.getByText('FullscreenControl')).toBeInTheDocument();
    expect(screen.getByText('NavigationControl')).toBeInTheDocument();
    expect(screen.getByText('RegionPolygonLayer')).toBeInTheDocument();
  });

  it('displays error message when API key is missing', () => {
    // Arrange
    mapConfig.accessToken = '';

    // Act
    render(<BasicMap />);

    // Assert
    expect(screen.getByText('Map cannot be loaded.')).toBeInTheDocument();
    expect(screen.getByText('Mapbox API Key is not configured.')).toBeInTheDocument();
  });

  it('loads map correctly when API key is provided', () => {
    // Arrange
    mapConfig.accessToken = 'test-api-key';

    // Act
    render(<BasicMap />);

    // Assert
    expect(screen.getByTestId('test-map')).toBeInTheDocument();
  });
});

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
