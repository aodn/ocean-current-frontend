import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRegionLatestDates } from '@/services/hooks';
import { useQueryParams } from '@/hooks';
import ArgoMapMenuBar from './ArgoMapMenuBar';

vi.mock('@/services/hooks', () => ({
  useRegionLatestDates: vi.fn(),
}));

vi.mock('@/hooks', () => ({
  useQueryParams: vi.fn(),
}));

// Stub ArgoDatePagination so the unit test doesn't need to set up its dependencies
vi.mock('@/components/ArgoDatePagination', () => ({
  default: () => <div data-testid="argo-date-pagination" />,
}));

vi.mock('@/components/DataVisualisationSidebar/components/WmoListPopup', () => ({
  default: () => null,
}));

const LATEST_DATE = '20260301';

const renderComponent = () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <ArgoMapMenuBar />
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

describe('ArgoMapMenuBar', () => {
  beforeEach(() => {
    vi.mocked(useRegionLatestDates).mockReturnValue({
      data: { regionLatestDates: [{ latestDate: LATEST_DATE }] },
      isLoading: false,
    } as ReturnType<typeof useRegionLatestDates>);

    vi.mocked(useQueryParams).mockReturnValue({
      updateQueryParams: vi.fn(),
    } as unknown as ReturnType<typeof useQueryParams>);
  });

  it('renders the date picker and reset button', () => {
    renderComponent();
    expect(screen.getByTestId('argo-date-pagination')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset to latest date' })).toBeInTheDocument();
  });

  it('renders the Share button', () => {
    renderComponent();
    expect(screen.getByText('Share')).toBeInTheDocument();
  });

  it('calls updateQueryParams with the latest date when reset is clicked', () => {
    const mockUpdateQueryParams = vi.fn();
    vi.mocked(useQueryParams).mockReturnValue({
      updateQueryParams: mockUpdateQueryParams,
    } as unknown as ReturnType<typeof useQueryParams>);

    renderComponent();
    fireEvent.click(screen.getByRole('button', { name: 'Reset to latest date' }));

    expect(mockUpdateQueryParams).toHaveBeenCalledWith({ date: LATEST_DATE });
  });

  it('does not call updateQueryParams when latest date is not yet available', () => {
    const mockUpdateQueryParams = vi.fn();
    vi.mocked(useRegionLatestDates).mockReturnValue({
      data: undefined,
      isLoading: true,
    } as ReturnType<typeof useRegionLatestDates>);
    vi.mocked(useQueryParams).mockReturnValue({
      updateQueryParams: mockUpdateQueryParams,
    } as unknown as ReturnType<typeof useQueryParams>);

    renderComponent();
    fireEvent.click(screen.getByRole('button', { name: 'Reset to latest date' }));

    expect(mockUpdateQueryParams).not.toHaveBeenCalled();
  });
});
