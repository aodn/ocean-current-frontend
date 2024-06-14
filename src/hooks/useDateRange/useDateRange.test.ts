import { renderHook, act } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useDateStore, setStartDate, setEndDate } from '@/stores/date-store/dateStore';
import useDateRange from './useDateRange';
import '@/configs/dayjs';

vi.mock('react-router-dom', () => ({
  useSearchParams: vi.fn(),
}));

vi.mock('@/stores/date-store/dateStore', () => {
  const actualDateStore = vi.importActual('@/stores/date-store/dateStore');
  return {
    ...actualDateStore,
    useDateStore: vi.fn(),
    setStartDate: vi.fn(),
    setEndDate: vi.fn(),
  };
});

describe('useDateRange', () => {
  let searchParamsMock: URLSearchParams;

  beforeEach(() => {
    searchParamsMock = new URLSearchParams();
    vi.mocked(useSearchParams).mockReturnValue([searchParamsMock, vi.fn()]);
    vi.mocked(useDateStore).mockReturnValue({
      startDate: dayjs().subtract(1, 'month').toDate(),
      endDate: dayjs().toDate(),
    });
  });

  test('should update date slider correctly', () => {
    const { result } = renderHook(() => useDateRange());

    act(() => {
      result.current.handleSliderChange(1);
    });

    expect(result.current.selectedDateIndex).toBe(1);
  });

  test('should handle date change correctly', () => {
    const { result } = renderHook(() => useDateRange());

    const newStartDate = dayjs().subtract(2, 'months').toDate();
    const newEndDate = dayjs().subtract(1, 'months').toDate();

    act(() => {
      result.current.handleDateChange([newStartDate, newEndDate]);
    });

    expect(setStartDate).toHaveBeenCalledWith(dayjs(newStartDate));
    expect(setEndDate).toHaveBeenCalledWith(dayjs(newEndDate));
  });

  test('should update URL parameters correctly on slider change', () => {
    const setSearchParamsMock = vi.fn();
    vi.mocked(useSearchParams).mockReturnValue([searchParamsMock, setSearchParamsMock]);

    const { result } = renderHook(() => useDateRange());

    act(() => {
      result.current.handleSliderChange(1);
    });

    const expectedParams = new URLSearchParams();
    expectedParams.set('date', dayjs(result.current.allDates[1]).format('YYYYMMDD'));
    expectedParams.set('startDate', dayjs(result.current.startDate).format('YYYYMMDD'));
    expectedParams.set('endDate', dayjs(result.current.endDate).format('YYYYMMDD'));

    expect(setSearchParamsMock).toHaveBeenCalledWith(expectedParams);
  });
});
