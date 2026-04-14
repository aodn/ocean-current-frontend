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

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders about content for a valid product with aboutDescription', () => {
    renderWithRoute('/about/eac-mooring-array');

    expect(screen.getByText('EAC Mooring Array (2012-2022)')).toBeInTheDocument();
    expect(screen.getByText(/The East Australian Current \(EAC\) is the complex/)).toBeInTheDocument();
  });

  it('renders "Explore dataset" button', () => {
    renderWithRoute('/about/eac-mooring-array');

    expect(screen.getByText('Explore dataset')).toBeInTheDocument();
  });

  it('renders "Explore dataset" as a button element, not a link', () => {
    renderWithRoute('/about/eac-mooring-array');

    const btn = screen.getByText('Explore dataset').closest('button');
    expect(btn).toBeInTheDocument();
    expect(screen.getByText('Explore dataset').closest('a')).toBeNull();
  });

  it('renders error state for a product without aboutDescription', () => {
    renderWithRoute('/about/four-hour-sst/sst');

    expect(screen.getByText('About Content Not Available')).toBeInTheDocument();
  });

  it('renders error state for an invalid product path', () => {
    renderWithRoute('/about/nonexistent-product');

    expect(screen.getByText('About Content Not Available')).toBeInTheDocument();
  });

  it('renders about content for the Argo profiles product', () => {
    renderWithRoute('/about/argo');

    expect(screen.getByText("Argo temperature and salinity down to 2000m - what's shown")).toBeInTheDocument();
    expect(screen.getByText(/show floats that reported data within a few days/)).toBeInTheDocument();
  });

  it('renders error state for a sub-product route without about content', () => {
    renderWithRoute('/about/six-day-sst/sst');

    expect(screen.getByText('About Content Not Available')).toBeInTheDocument();
    expect(screen.queryByText('Explore dataset')).not.toBeInTheDocument();
  });
});
