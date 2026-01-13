import { screen } from '@testing-library/react';
import { mapConfig } from '@/configs/map';
import { renderWithQueryClient } from '@/test/queryClientUtils';
import BasicMap from '../BasicMap';

vi.mock('react-map-gl/mapbox', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="test-map">{children}</div>,
  Source: ({ children }: { children: React.ReactNode }) => <div>{children}</div>, // Mock Source
  Layer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>, // Mock Layer
  ViewStateChangeEvent: () => <div>ViewStateChangeEvent</div>,
  useMap: vi.fn(() => ({ current: null })),
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

// Mock React Router hooks
vi.mock('react-router', async () => {
  const originalModule = await vi.importActual('react-router');

  return {
    ...originalModule,
    useSearchParams: vi.fn(() => [new URLSearchParams(), vi.fn()]),
    useNavigate: vi.fn(),
    useLocation: vi.fn(() => ({ pathname: '/map' })),
  };
});

describe('BasicMap Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    //Arrange
    mapConfig.accessToken = 'test-api-key';

    // Act
    renderWithQueryClient(<BasicMap />);

    // Assert
    expect(screen.getByTestId('test-map')).toBeInTheDocument();
  });

  it('displays error message when API key is missing', () => {
    // Arrange
    mapConfig.accessToken = '';

    // Act
    renderWithQueryClient(<BasicMap />);

    // Assert
    expect(screen.getByText('Map cannot be loaded.')).toBeInTheDocument();
    expect(screen.getByText('Mapbox API Key is not configured.')).toBeInTheDocument();
  });

  it('loads map correctly when API key is provided', () => {
    // Arrange
    mapConfig.accessToken = 'test-api-key';

    // Act
    renderWithQueryClient(<BasicMap />);

    // Assert
    expect(screen.getByTestId('test-map')).toBeInTheDocument();
  });

  it('renders navigation control when enabled', () => {
    mapConfig.accessToken = 'test-api-key';
    renderWithQueryClient(<BasicMap navigationControl />);
    expect(screen.getByTestId('test-map')).toBeInTheDocument();
  });
});

// TODO: Add tests for other layers, see https://github.com/aodn/backlog/issues/6367
