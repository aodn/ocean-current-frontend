import { render, screen } from '@testing-library/react';
import { mapConfig } from '@/configs/map';
import BasicMap from '../BasicMap';

vi.mock('react-map-gl', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="test-map">{children}</div>,
  NavigationControl: () => <div>NavigationControl</div>,
  Source: ({ children }: { children: React.ReactNode }) => <div>{children}</div>, // Mock Source
  Layer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>, // Mock Layer
  ViewStateChangeEvent: () => <div>ViewStateChangeEvent</div>,
  useMap: vi.fn(() => ({})),
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
vi.mock('react-router-dom', async () => {
  const originalModule = await vi.importActual('react-router-dom');

  return {
    ...originalModule,
    useSearchParams: vi.fn(() => [new URLSearchParams(), vi.fn()]),
    useNavigate: vi.fn(),
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
    render(<BasicMap />);

    // Assert
    expect(screen.getByText('NavigationControl')).toBeInTheDocument();
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

  it('renders navigation control when enabled', () => {
    render(<BasicMap navigationControl />);
    expect(screen.getByText('NavigationControl')).toBeInTheDocument();
  });
});

// TODO: Add tests for other layers, see https://github.com/aodn/backlog/issues/6367
