import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { setProductId } from '@/stores/product-store/productStore';
import useMapStore from '@/stores/map-store/mapStore';
import HomeMapCarousel from './HomeMapCarousel';
import { productsData } from './data';

// Mock
vi.mock('@/stores/product-store/productStore', () => ({
  setProductId: vi.fn(),
}));

vi.mock('@/stores/map-store/mapStore', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    mapViewState: {
      zoom: 10,
      latitude: 12.34,
      longitude: 56.78,
    },
  })),
}));

vi.mock('@/components/Map/BasicMap', () => {
  return {
    __esModule: true,
    default: vi.fn(() => <div>BasicMap</div>),
  };
});

describe('HomeMapCarousel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders product details and carousel pagination dots', () => {
    render(<HomeMapCarousel />);

    // Check that the first product is displayed
    const productTitle = screen.getByText(productsData[0].title);
    const productDescription = screen.getByText(productsData[0].description);

    expect(productTitle).toBeInTheDocument();
    expect(productDescription).toBeInTheDocument();

    // Check that the carousel pagination dots are rendered
    const carouselDots = screen.getAllByRole('button');
    expect(carouselDots).toHaveLength(productsData.length);
    expect(carouselDots[0]).toHaveClass('bg-imos-sea-blue');
  });

  it('updates the selected product when a carousel dot is clicked', async () => {
    render(<HomeMapCarousel />);

    const thirdDot = screen.getAllByRole('button')[2];
    await userEvent.click(thirdDot);

    await waitFor(() => {
      const productTitle = screen.getByText(productsData[2].title);
      const productDescription = screen.getByText(productsData[2].description);
      expect(productTitle).toBeInTheDocument();
      expect(productDescription).toBeInTheDocument();
    });

    expect(setProductId).toHaveBeenCalledWith(productsData[2].id);
  });

  it('cycles through products automatically', async () => {
    vi.useFakeTimers();

    render(<HomeMapCarousel />);

    // Check that the first product is initially displayed
    const productTitle = screen.getByText(productsData[0].title);
    expect(productTitle).toBeInTheDocument();

    // Simulate first cycle
    act(() => {
      vi.advanceTimersByTime(2500);
    });

    // After first cycle, the second product should be displayed
    const productTitleAfterCycle = screen.getByText(productsData[1].title);
    expect(productTitleAfterCycle).toBeInTheDocument();

    // Cleanup
    vi.useRealTimers();
  });

  it('stops the carousel when the map view state changes', async () => {
    vi.useFakeTimers();

    render(<HomeMapCarousel />);

    // Check that the first product is initially displayed
    const productTitle = screen.getByText(productsData[0].title);
    expect(productTitle).toBeInTheDocument();

    // Change map zoom
    vi.mocked(useMapStore).mockReturnValue(() => ({
      mapViewState: {
        zoom: 12,
        latitude: 34.56,
        longitude: 78.9,
      },
    }));

    // Simulate the next cycle
    act(() => {
      vi.advanceTimersByTime(2500);
    });

    // Product should not change, since cycling is stopped
    expect(productTitle).toBeInTheDocument();

    // Cleanup
    vi.useRealTimers();
  });

  it('calls setProductId with the selected product ID when it changes', () => {
    render(<HomeMapCarousel />);

    const firstProduct = productsData[0];
    expect(setProductId).toHaveBeenCalledWith(firstProduct.id);

    // Change product using the carousel button
    const secondDot = screen.getAllByRole('button')[1];
    fireEvent.click(secondDot);

    const secondProduct = productsData[1];
    expect(setProductId).toHaveBeenCalledWith(secondProduct.id);
  });

  it('renders error boundary and basic map without crashing', () => {
    render(<HomeMapCarousel />);

    const mapComponent = screen.getByText('BasicMap');
    expect(mapComponent).toBeInTheDocument();
  });
});
