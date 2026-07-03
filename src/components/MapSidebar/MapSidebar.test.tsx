import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useQueryParams } from '@/hooks';
import useProductStore from '@/stores/product-store/productStore';
import { sidebarProductsNav } from '@/data/sidebarProductsNav';
import { getProductPathWithSubProduct } from '@/utils/product-utils/product';
import MapSidebar from './MapSidebar';

vi.mock('@/hooks', () => ({ useQueryParams: vi.fn() }));
vi.mock('@/stores/product-store/productStore', () => ({ default: vi.fn() }));

const mockNavigate = vi.fn();

const setActiveProductId = (productId: string) => {
  vi.mocked(useProductStore).mockImplementation((selector) => selector({ productParams: { productId } } as never));
};

describe('MapSidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useQueryParams).mockReturnValue({
      updateQueryParamsAndNavigate: mockNavigate,
    } as unknown as ReturnType<typeof useQueryParams>);
    setActiveProductId('argo');
  });

  it('renders every product from sidebarProductsNav', () => {
    render(<MapSidebar />);
    sidebarProductsNav.forEach(({ label }) => expect(screen.getByText(label)).toBeInTheDocument());
  });

  it('navigates to a relative path, staying under /map, even for products with a dedicated /product landing', () => {
    render(<MapSidebar />);

    fireEvent.click(screen.getByText('Surface Waves'));

    expect(mockNavigate).toHaveBeenCalledWith(getProductPathWithSubProduct('surfaceWaves'), { region: null });
  });

  it('does nothing when clicking the already-active product', () => {
    setActiveProductId('argo');
    render(<MapSidebar />);

    fireEvent.click(screen.getByText('Argo'));

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('auto-selects the Brisbane region for EAC Mooring Array', () => {
    render(<MapSidebar />);

    fireEvent.click(screen.getByText('EAC Mooring Array'));

    expect(mockNavigate).toHaveBeenCalledWith(getProductPathWithSubProduct('EACMooringArray'), {
      region: 'Brisbane',
    });
  });

  it('clears region for Current Meters', () => {
    render(<MapSidebar />);

    fireEvent.click(screen.getByText('Current Meters'));

    expect(mockNavigate).toHaveBeenCalledWith(getProductPathWithSubProduct('currentMeters'), { region: null });
  });
});
