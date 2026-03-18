import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import { useRegionLatestDates } from '@/services/hooks';
import ArgoDatePagination from './ArgoDatePagination';

vi.mock('@/services/hooks', () => ({
  useRegionLatestDates: vi.fn(),
}));

const LATEST_DATE = '20260301';

const renderWithRouter = (initialUrl = '/') =>
  render(
    <MemoryRouter initialEntries={[initialUrl]}>
      <ArgoDatePagination />
    </MemoryRouter>,
  );

describe('ArgoDatePagination', () => {
  beforeEach(() => {
    vi.mocked(useRegionLatestDates).mockReturnValue({
      data: { regionLatestDates: [{ latestDate: LATEST_DATE }] },
      isLoading: false,
    } as ReturnType<typeof useRegionLatestDates>);
  });

  it('shows a loading spinner while the latest date is being fetched', () => {
    vi.mocked(useRegionLatestDates).mockReturnValue({
      data: undefined,
      isLoading: true,
    } as ReturnType<typeof useRegionLatestDates>);

    renderWithRouter();

    expect(screen.getByLabelText('Loading content')).toBeInTheDocument();
    expect(screen.queryByTestId('date-pagination')).not.toBeInTheDocument();
  });

  it('renders the date picker once the latest date is available', () => {
    renderWithRouter();
    expect(screen.getByTestId('date-pagination')).toBeInTheDocument();
  });

  it('defaults to the latest date when no ?date param is in the URL', () => {
    renderWithRouter('/');
    // The date picker should display 1 March 2026 (LATEST_DATE = 20260301)
    expect(screen.getByText(/01 Mar 2026/i)).toBeInTheDocument();
  });

  it('displays the date from the ?date URL param when provided', () => {
    renderWithRouter('/?date=20260201');
    expect(screen.getByText(/01 Feb 2026/i)).toBeInTheDocument();
  });

  it('disables the previous button when at the start of the allowed range', () => {
    renderWithRouter('/?date=20100101');
    expect(screen.getByTestId('date-previous-button')).toBeDisabled();
  });

  it('disables the next button when at the latest date', () => {
    renderWithRouter(`/?date=${LATEST_DATE}`);
    expect(screen.getByTestId('date-next-button')).toBeDisabled();
  });

  it('enables both buttons for a date in the middle of the range', () => {
    renderWithRouter('/?date=20230101');
    expect(screen.getByTestId('date-previous-button')).not.toBeDisabled();
    expect(screen.getByTestId('date-next-button')).not.toBeDisabled();
  });

  it('navigates to the previous day when the previous button is clicked', () => {
    renderWithRouter('/?date=20260215');
    fireEvent.click(screen.getByTestId('date-previous-button'));
    expect(screen.getByText(/14 Feb 2026/i)).toBeInTheDocument();
  });

  it('navigates to the next day when the next button is clicked', () => {
    renderWithRouter('/?date=20260215');
    fireEvent.click(screen.getByTestId('date-next-button'));
    expect(screen.getByText(/16 Feb 2026/i)).toBeInTheDocument();
  });
});
