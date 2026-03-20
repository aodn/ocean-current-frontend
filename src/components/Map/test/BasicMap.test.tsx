import { screen } from '@testing-library/react';
import { useMap } from 'react-map-gl/mapbox';
import { mapConfig } from '@/configs/map';
import { renderWithQueryClient } from '@/test/queryClientUtils';
import BasicMap from '../BasicMap';

let lastMapProps: Record<string, unknown> = {};

const simulateMobile = () =>
  vi.mocked(window.matchMedia).mockImplementation(
    (query: string) =>
      ({
        matches: query.includes('max-width'),
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }) as unknown as MediaQueryList,
  );

const mockAddControl = vi.fn();
const mockRemoveControl = vi.fn();
const mockMap = {
  addControl: mockAddControl,
  removeControl: mockRemoveControl,
  on: vi.fn(),
  off: vi.fn(),
  getMap: vi.fn(),
};

vi.mock('react-map-gl/mapbox', () => ({
  default: (props: Record<string, unknown>) => {
    lastMapProps = props;
    return <div data-testid="test-map">{props.children as React.ReactNode}</div>;
  },
  Source: ({ children }: { children: React.ReactNode }) => <div>{children}</div>, // Mock Source
  Layer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>, // Mock Layer
  ViewStateChangeEvent: () => <div>ViewStateChangeEvent</div>,
  useMap: vi.fn(() => ({ current: null })),
}));

vi.mock('../layers/RegionPolygonLayer', () => ({
  default: () => <div>RegionPolygonLayer</div>,
}));

vi.mock('../layers/ArgoAsProductLayer', () => ({
  default: () => <div>ArgoAsProductLayer</div>,
}));

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
    // Restore desktop matchMedia (all queries return false) after any mobile test
    vi.mocked(window.matchMedia).mockImplementation(
      (query: string) =>
        ({
          matches: false,
          media: query,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        }) as unknown as MediaQueryList,
    );
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

  it('calls addControl when navigationControl is enabled', () => {
    mapConfig.accessToken = 'test-api-key';
    vi.mocked(useMap).mockReturnValue({ current: mockMap } as unknown as ReturnType<typeof useMap>);
    renderWithQueryClient(<BasicMap navigationControl={true} />);
    expect(mockAddControl).toHaveBeenCalled();
  });

  it('does not call addControl when navigationControl is disabled', () => {
    mapConfig.accessToken = 'test-api-key';
    vi.mocked(useMap).mockReturnValue({ current: mockMap } as unknown as ReturnType<typeof useMap>);
    renderWithQueryClient(<BasicMap navigationControl={false} />);
    expect(mockAddControl).not.toHaveBeenCalled();
  });

  it('disables cooperativeGestures on desktop', () => {
    mapConfig.accessToken = 'test-api-key';
    // matchMedia returns false (desktop) — default from setup.ts
    renderWithQueryClient(<BasicMap />);
    expect(lastMapProps.cooperativeGestures).toBe(false);
  });

  it('enables cooperativeGestures on mobile main map', () => {
    mapConfig.accessToken = 'test-api-key';
    simulateMobile();
    renderWithQueryClient(<BasicMap isMiniMap={false} />);
    expect(lastMapProps.cooperativeGestures).toBe(true);
  });

  it('disables cooperativeGestures on mobile mini-map', () => {
    mapConfig.accessToken = 'test-api-key';
    simulateMobile();
    renderWithQueryClient(<BasicMap isMiniMap={true} />);
    expect(lastMapProps.cooperativeGestures).toBe(false);
  });
});

// TODO: Add tests for other layers, see https://github.com/aodn/backlog/issues/6367
