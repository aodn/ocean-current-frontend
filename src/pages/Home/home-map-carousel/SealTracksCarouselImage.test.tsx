import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { vi } from 'vitest';
import { useRegionLatestDates } from '@/services/hooks/useRegionLatestDates';
import SealTracksCarouselImage from './SealTracksCarouselImage';

vi.mock('@/utils/data-image-builder-utils/latestEntryImage', () => ({
  buildLatestEntryImageUrl: vi.fn(() => 'https://example.com/seal-tracks/latest.gif'),
}));

vi.mock('@/services/hooks/useRegionLatestDates', () => ({
  useRegionLatestDates: vi.fn(),
}));

const renderComponent = () =>
  render(
    <MemoryRouter>
      <SealTracksCarouselImage alt="SealCTD" />
    </MemoryRouter>,
  );

describe('SealTracksCarouselImage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('links to the POLAR region with the latest date when available', () => {
    vi.mocked(useRegionLatestDates).mockReturnValue({
      data: {
        regionLatestDates: [{ region: 'POLAR', latestDate: '20250101' }],
      },
    } as unknown as ReturnType<typeof useRegionLatestDates>);

    renderComponent();

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/product/seal-ctd/tracks?region=POLAR&date=20250101');
  });

  it('links to the POLAR region without a date when latest date is unavailable', () => {
    vi.mocked(useRegionLatestDates).mockReturnValue({
      data: { regionLatestDates: [] },
    } as unknown as ReturnType<typeof useRegionLatestDates>);

    renderComponent();

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/product/seal-ctd/tracks?region=POLAR');
  });

  it('renders the image with the correct src and alt', () => {
    vi.mocked(useRegionLatestDates).mockReturnValue({
      data: { regionLatestDates: [] },
    } as unknown as ReturnType<typeof useRegionLatestDates>);

    renderComponent();

    const img = screen.getByRole('img', { name: 'SealCTD' });
    expect(img).toHaveAttribute('src', 'https://example.com/seal-tracks/latest.gif');
  });
});
