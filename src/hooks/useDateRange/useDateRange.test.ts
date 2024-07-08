import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
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
    // Arrange
    const { result } = renderHook(() => useDateRange());

    // Act
    const { startDate, endDate, allDates, selectedDateIndex, steps } = result.current;

    // Assert
    expect(startDate).toBeDefined();
    expect(endDate).toBeDefined();
    expect(allDates).toBeInstanceOf(Array);
    expect(selectedDateIndex).toBe(0);
    expect(steps).toBe(1);
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

  it('should detect if it is the last month', () => {
    // Arrange
    const { result } = renderHook(() => useDateRange());

    // Act
    const isLastMonthOfTheYear = result.current.isLastMonthOfTheYear();

    // Assert
    expect(isLastMonthOfTheYear).toBeDefined();
    expect(typeof isLastMonthOfTheYear).toBe('boolean');
  });

  it('should handle year range correctly', () => {
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
});
