import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRegionLatestDates } from '@/services/hooks/useRegionLatestDates';
import AboutView from './AboutView';

vi.mock('@/services/hooks/useRegionLatestDates', () => ({
  useRegionLatestDates: vi.fn(),
}));

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

const renderWithRoute = (path: string) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/about/:product/:subProduct" element={<AboutView />} />
          <Route path="/about/:product" element={<AboutView />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

describe('AboutView', () => {
  beforeEach(() => {
    vi.mocked(useRegionLatestDates).mockReturnValue({
      data: undefined,
    } as ReturnType<typeof useRegionLatestDates>);
  });

  it('renders about content for a valid product with aboutDescription', () => {
    renderWithRoute('/about/eac-mooring-array');

    expect(screen.getByText('EAC Mooring Array (2012-2022)')).toBeInTheDocument();
    expect(screen.getByText(/The East Australian Current \(EAC\) is the complex/)).toBeInTheDocument();
  });

  it('renders "Explore dataset" button linking to the product page', () => {
    renderWithRoute('/about/eac-mooring-array');

    const link = screen.getByText('Explore dataset').closest('a');
    expect(link).toHaveAttribute('href', '/product/eac-mooring-array');
  });

  it('includes region and date in explore link when latest dates are available', () => {
    vi.mocked(useRegionLatestDates).mockReturnValue({
      data: {
        productId: 'EACMooringArray',
        regionLatestDates: [{ region: 'Brisbane', latestDate: '20240315', path: '' }],
      },
    } as ReturnType<typeof useRegionLatestDates>);

    renderWithRoute('/about/eac-mooring-array');

    const link = screen.getByText('Explore dataset').closest('a');
    expect(link).toHaveAttribute('href', '/product/eac-mooring-array?region=Brisbane&date=20240315');
  });

  it('renders error state for a product without aboutDescription', () => {
    renderWithRoute('/about/four-hour-sst/sst');

    expect(screen.getByText('About Content Not Available')).toBeInTheDocument();
  });

  it('renders error state for an invalid product path', () => {
    renderWithRoute('/about/nonexistent-product');

    expect(screen.getByText('About Content Not Available')).toBeInTheDocument();
  });

  it('renders error state for a sub-product route without about content', () => {
    renderWithRoute('/about/six-day-sst/sst');

    expect(screen.getByText('About Content Not Available')).toBeInTheDocument();
    expect(screen.queryByText('Explore dataset')).not.toBeInTheDocument();
  });
});
