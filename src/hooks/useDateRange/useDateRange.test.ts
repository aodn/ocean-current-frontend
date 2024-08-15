import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import { setStartDate, setEndDate } from '@/stores/date-store/dateStore';
import useDateRange from './useDateRange';

type Product = {
  key: string;
  title: string;
  path: string;
};

vi.mock('react-router-dom', () => ({
  useSearchParams: vi.fn(() => [new URLSearchParams(), vi.fn()]),
}));

vi.mock('@/stores/date-store/dateStore', () => ({
  useDateStore: vi.fn(() => ({
    startDate: dayjs().subtract(1, 'month'),
    endDate: dayjs(),
  })),
  setStartDate: vi.fn(),
  setEndDate: vi.fn(),
}));

vi.mock('@/stores/product-store/hooks/useProductConvert', () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe('useDateRange', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useProductConvert).mockReturnValue({
      mainProduct: { key: 'default', title: 'Default Product', path: '/default' } as Product,
      subProduct: null,
      subProducts: [],
    });
  });

  it('should initialize with correct default values', () => {
    // Arrange & Act
    const { result } = renderHook(() => useDateRange());

    // Assert
    expect(result.current.startDate).toBeDefined();
    expect(result.current.endDate).toBeDefined();
    expect(result.current.allDates).toBeInstanceOf(Array);
    expect(result.current.selectedDateIndex).toBe(0);
    expect(result.current.steps).toBe(1);
  });

  it('should modify date forward', () => {
    // Arrange
    const { result } = renderHook(() => useDateRange());
    const initialIndex = result.current.selectedDateIndex;

    // Act
    act(() => {
      result.current.modifyDate('add');
    });

    // Assert
    expect(result.current.selectedDateIndex).toBeGreaterThan(initialIndex);
  });

  it('should modify date backward', () => {
    // Arrange
    const { result } = renderHook(() => useDateRange());
    act(() => {
      result.current.handleSliderChange(5);
    });
    const initialIndex = result.current.selectedDateIndex;

    // Act
    act(() => {
      result.current.modifyDate('subtract');
    });

    // Assert
    expect(result.current.selectedDateIndex).toBeLessThan(initialIndex);
  });

  it('should update URL params when date changes', () => {
    // Arrange
    const setSearchParamsMock = vi.fn();
    vi.mocked(useSearchParams).mockReturnValue([new URLSearchParams(), setSearchParamsMock]);
    const { result } = renderHook(() => useDateRange());
    const newStartDate = dayjs().subtract(2, 'weeks').toDate();
    const newEndDate = dayjs().add(2, 'weeks').toDate();

    // Act
    act(() => {
      result.current.handleDateChange([newStartDate, newEndDate]);
    });

    // Assert
    expect(setSearchParamsMock).toHaveBeenCalled();
    expect(setStartDate).toHaveBeenCalledWith(expect.any(dayjs));
    expect(setEndDate).toHaveBeenCalledWith(expect.any(dayjs));
  });

  it('should generate correct date range', () => {
    // Arrange
    const { result } = renderHook(() => useDateRange());
    const startDate = dayjs().subtract(1, 'week').toDate();
    const endDate = dayjs().add(1, 'week').toDate();

    // Act
    act(() => {
      result.current.handleDateChange([startDate, endDate]);
    });

    // Assert
    expect(result.current.allDates.length).toBe(dayjs(endDate).diff(startDate, 'day') + 1);
  });

  it('should detect if it is the last month of the year', () => {
    // Arrange
    const { result } = renderHook(() => useDateRange());

    // Act
    act(() => {
      result.current.handleDateChange([new Date(2023, 11, 15), new Date(2023, 11, 31)]);
    });

    // Assert
    expect(result.current.isLastMonthOfTheYear()).toBe(true);
  });

  it('should handle year range correctly for climatology product', () => {
    // Arrange
    vi.mocked(useProductConvert).mockReturnValue({
      mainProduct: { key: 'climatology', title: 'Climatology', path: '/climatology' } as Product,
      subProduct: null,
      subProducts: [],
    });

    // Act
    const { result } = renderHook(() => useDateRange());

    // Assert
    expect(result.current.allDates.length).toBe(12);
  });

  it('should handle year date change correctly', () => {
    // Arrange
    vi.mocked(useProductConvert).mockReturnValue({
      mainProduct: { key: 'climatology', title: 'Climatology', path: '/climatology' } as Product,
      subProduct: null,
      subProducts: [],
    });
    const { result } = renderHook(() => useDateRange());
    const newDate = new Date(2023, 5, 15); // June 15, 2023

    // Act
    act(() => {
      result.current.handleYearDateChange(newDate);
    });

    // Assert
    expect(setStartDate).toHaveBeenCalledWith(expect.any(dayjs));
    expect(setEndDate).toHaveBeenCalledWith(expect.any(dayjs));
    expect(result.current.allDates[0].date.getFullYear()).toBe(2023);
  });

  it('should handle four hour SST product correctly', () => {
    // Arrange
    vi.mocked(useProductConvert).mockReturnValue({
      mainProduct: { key: 'fourHourSst', title: 'Four Hour SST', path: '/four-hour-sst' } as Product,
      subProduct: null,
      subProducts: [],
    });

    // Act
    const { result } = renderHook(() => useDateRange());

    // Assert
    expect(result.current.isFourHourSst).toBe(true);
    expect(result.current.allDates[0].date.getHours() % 4).toBe(2);
  });

  it('should handle date change for four hour SST product', () => {
    // Arrange
    vi.mocked(useProductConvert).mockReturnValue({
      mainProduct: { key: 'fourHourSst', title: 'Four Hour SST', path: '/four-hour-sst' } as Product,
      subProduct: null,
      subProducts: [],
    });
    const { result } = renderHook(() => useDateRange());
    const newStartDate = dayjs().startOf('day').toDate();
    const newEndDate = dayjs().add(1, 'day').endOf('day').toDate();

    // Act
    act(() => {
      result.current.handleDateChange([newStartDate, newEndDate]);
    });

    // Assert
    expect(result.current.allDates.length).toBe(12); // 6 four-hour intervals per day * 2 days
    expect(result.current.allDates.every((date) => date.date.getHours() % 2 === 0)).toBe(true);
  });

  it('should handle monthly means anomalies correctly', () => {
    // Arrange
    vi.mocked(useProductConvert).mockReturnValue({
      mainProduct: { key: 'monthlyMeans', title: 'Monthly Means', path: '/monthly-means' } as Product,
      subProduct: { key: 'monthlyMeans-anomalies', title: 'Anomalies', path: '/anomalies' } as Product,
      subProducts: [],
    });

    // Act
    const { result } = renderHook(() => useDateRange());

    // Assert
    expect(result.current.isYearRange).toBe(true);
    expect(result.current.allDates.filter((date) => !date.active).length).toBeGreaterThan(0);
  });

  it('should handle slider change correctly', () => {
    // Arrange
    const { result } = renderHook(() => useDateRange());
    const initialIndex = result.current.selectedDateIndex;

    // Act
    act(() => {
      result.current.handleSliderChange(5);
    });

    // Assert
    expect(result.current.selectedDateIndex).toBe(5);
    expect(result.current.selectedDateIndex).not.toBe(initialIndex);
  });

  it('should disable video creation for specific products', () => {
    // Arrange
    vi.mocked(useProductConvert).mockReturnValue({
      mainProduct: { key: 'climatology', title: 'Climatology', path: '/climatology' } as Product,
      subProduct: null,
      subProducts: [],
    });

    // Act
    const { result } = renderHook(() => useDateRange());

    // Assert
    expect(result.current.disableVideoCreation()).toBe(true);

    // Test for other cases
    vi.mocked(useProductConvert).mockReturnValue({
      mainProduct: { key: 'fourHourSst', title: 'Four Hour SST', path: '/four-hour-sst' } as Product,
      subProduct: { key: 'fourHourSst-sstAge', title: 'SST Age', path: '/sst-age' } as Product,
      subProducts: [],
    });
    const { result: result2 } = renderHook(() => useDateRange());
    expect(result2.current.disableVideoCreation()).toBe(true);

    vi.mocked(useProductConvert).mockReturnValue({
      mainProduct: { key: 'snapshotSst', title: 'Snapshot SST', path: '/snapshot-sst' } as Product,
      subProduct: null,
      subProducts: [],
    });
    const { result: result3 } = renderHook(() => useDateRange());
    expect(result3.current.disableVideoCreation()).toBe(false);
  });

  it('should handle surface waves product correctly', () => {
    // Arrange
    vi.mocked(useProductConvert).mockReturnValue({
      mainProduct: { key: 'surfaceWaves', title: 'Surface Waves', path: '/surface-waves' } as Product,
      subProduct: null,
      subProducts: [],
    });

    // Act
    const { result } = renderHook(() => useDateRange());

    // Assert
    expect(result.current.isSurfaceWaves).toBe(true);
    expect(result.current.allDates[0].date.getHours() % 2).toBe(0);
  });

  it('should use correct format date based on product type', () => {
    // Arrange & Act
    vi.mocked(useProductConvert).mockReturnValue({
      mainProduct: { key: 'fourHourSst', title: 'Four Hour SST', path: '/four-hour-sst' } as Product,
      subProduct: null,
      subProducts: [],
    });
    const { result: resultFourHour } = renderHook(() => useDateRange());

    vi.mocked(useProductConvert).mockReturnValue({
      mainProduct: { key: 'snapshotSst', title: 'Snapshot SST', path: '/snapshot-sst' } as Product,
      subProduct: null,
      subProducts: [],
    });
    const { result: resultSnapshot } = renderHook(() => useDateRange());

    // Assert
    expect(resultFourHour.current.formatDate).toBe('YYYYMMDDHH');
    expect(resultSnapshot.current.formatDate).toBe('YYYYMMDD');
  });

  it('should update correctly when product changes', () => {
    // Arrange
    const { result, rerender } = renderHook(() => useDateRange());
    const initialAllDates = result.current.allDates;

    // Act
    vi.mocked(useProductConvert).mockReturnValue({
      mainProduct: { key: 'climatology', title: 'Climatology', path: '/climatology' } as Product,
      subProduct: null,
      subProducts: [],
    });
    rerender();

    // Assert
    expect(result.current.allDates).not.toEqual(initialAllDates);
    expect(result.current.isYearRange).toBe(true);
    expect(result.current.allDates.length).toBe(12);
  });
});
