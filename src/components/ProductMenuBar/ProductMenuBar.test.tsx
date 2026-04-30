import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import '@/configs/dayjs';
import { useDateList, useQueryParams, useArgoProductValidQueryParams } from '@/hooks';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import { useRegionLatestDates } from '@/services/hooks';
import { useTidalCurrentPoint } from '@/pages/DataView/product-content/hooks/useTidalCurrentPoint';
import ProductMenuBar from './ProductMenuBar';

vi.mock('@/components/VideoCreation', () => ({
  default: () => <div>Download</div>,
}));

vi.mock('../DatePagination', () => ({
  default: () => <div data-testid="date-pagination" />,
}));

vi.mock('@/stores/product-store/hooks/useProductCheck', () => ({
  default: vi.fn(),
}));

vi.mock('@/stores/product-store/productStore', () => ({
  default: vi.fn((selector: (state: unknown) => unknown) =>
    selector({ productParams: { productId: 'sixDaySst-climatology' }, isProductImageLoading: false }),
  ),
  setIsProductImageLoading: vi.fn(),
}));

vi.mock('@/stores/product-store/hooks/useProductDateFormat', () => ({
  default: vi.fn(() => 'MM'),
}));

vi.mock('@/stores/product-store/hooks/useShowProductOverMap', () => ({
  useShowProductOverMap: vi.fn(() => true),
}));

vi.mock('@/stores/current-meters-store/currentMeters', () => ({
  default: vi.fn(() => ({ date: '', property: '', depth: '', region: '', deploymentPlot: '' })),
  initialState: {},
  resetCurrentMetersStore: vi.fn(),
  setCurrentMetersDate: vi.fn(),
}));

vi.mock('@/stores/argo-store/argoStore', () => ({
  default: vi.fn((selector: (state: unknown) => unknown) => selector({ argoProfileCycles: [] })),
}));

vi.mock('@/services/hooks', () => ({
  useRegionLatestDates: vi.fn(),
}));

vi.mock('@/pages/DataView/product-content/hooks/useTidalCurrentPoint', () => ({
  useTidalCurrentPoint: vi.fn(),
}));

vi.mock('@/hooks', () => ({
  useDateList: vi.fn(),
  useQueryParams: vi.fn(),
  useArgoProductValidQueryParams: vi.fn(),
}));

const ALL_MONTHS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((date) => ({
  date,
}));

const renderComponent = () =>
  render(
    <MemoryRouter>
      <ProductMenuBar setShowVideo={vi.fn()} setShowMap={vi.fn()} />
    </MemoryRouter>,
  );

describe('ProductMenuBar', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.skip('should render successfully with correct date', () => {
    renderComponent();
    const dateElement = screen.getByText('13 Jun 24');
    expect(dateElement).toBeInTheDocument();
  });

  it.skip('should display navigation arrows', () => {
    renderComponent();
    const rightArrow = screen.getByRole('button', {
      name: /right arrow icon/i,
    });
    const leftArrow = screen.getByRole('button', { name: /left arrow icon/i });
    expect(rightArrow).toBeInTheDocument();
    expect(leftArrow).toBeInTheDocument();
  });

  it.skip('should display video creation component', () => {
    renderComponent();
    const downloadElement = screen.getByText('Download');
    expect(downloadElement).toBeInTheDocument();
  });

  describe('handleReset - climatology', () => {
    beforeEach(() => {
      vi.useFakeTimers();

      vi.mocked(useProductCheck).mockReturnValue({
        isClimatology: true,
        isArgo: false,
        isCurrentMeters: false,
        isCurrentMetersMooredInstrumentArray: false,
        isMonthlyMeans: false,
        isEACMooringArray: false,
        isTidalCurrents: false,
        isSealCtd: false,
        isSealCtdTags: false,
        isSurfaceWaves: false,
        isSurfaceWavesBuoyTimeseries: false,
        isRegionRequired: true,
      } as ReturnType<typeof useProductCheck>);

      vi.mocked(useArgoProductValidQueryParams).mockReturnValue({
        isArgoValid: false,
      } as ReturnType<typeof useArgoProductValidQueryParams>);

      vi.mocked(useRegionLatestDates).mockReturnValue({
        data: undefined,
        isLoading: false,
      } as ReturnType<typeof useRegionLatestDates>);

      vi.mocked(useTidalCurrentPoint).mockReturnValue({
        isTidalCurrentsPointSelected: false,
      } as ReturnType<typeof useTidalCurrentPoint>);
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('resets to the month matching the current system month', () => {
      vi.setSystemTime(new Date('2024-04-15')); // April → month 3 (0-indexed)
      const mockUpdateQueryParams = vi.fn();
      vi.mocked(useQueryParams).mockReturnValue({
        updateQueryParams: mockUpdateQueryParams,
        updateQueryParamsAndNavigate: vi.fn(),
      } as unknown as ReturnType<typeof useQueryParams>);
      vi.mocked(useDateList).mockReturnValue({
        isLoading: false,
        dateList: ALL_MONTHS,
      } as ReturnType<typeof useDateList>);

      renderComponent();
      fireEvent.click(screen.getByRole('button', { name: 'Reset to latest date' }));

      expect(mockUpdateQueryParams).toHaveBeenCalledWith({ date: '04' });
    });

    it('falls back to the last date in the list when the current month is not available', () => {
      vi.setSystemTime(new Date('2024-04-15')); // April
      const mockUpdateQueryParams = vi.fn();
      vi.mocked(useQueryParams).mockReturnValue({
        updateQueryParams: mockUpdateQueryParams,
        updateQueryParamsAndNavigate: vi.fn(),
      } as unknown as ReturnType<typeof useQueryParams>);
      // dateList without April ('04')
      vi.mocked(useDateList).mockReturnValue({
        isLoading: false,
        dateList: ALL_MONTHS.filter((d) => d.date !== '04'),
      } as ReturnType<typeof useDateList>);

      renderComponent();
      fireEvent.click(screen.getByRole('button', { name: 'Reset to latest date' }));

      expect(mockUpdateQueryParams).toHaveBeenCalledWith({ date: '12' });
    });
  });
});
