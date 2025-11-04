import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import dayjs, { Dayjs } from 'dayjs';
import { DateFormat, DateItem } from '@/types/date';
import { useArgoStore } from '@/stores/argo-store/argoStore';
import { isHourlyFormat, findFirstDateTimeForSelectedDay } from '@/utils/date-utils/hourly';
import { findClosestDateIndex } from '@/utils/date-utils/date';
import { isCurrentYearOptionId } from '@/data/current-meter/sidebarOptions';

type NavigationMode = 'dateList' | 'dateRange';

interface UseDateListNavigationProps {
  dateFormat: DateFormat;
  availableDates: DateItem[];
  initialDate?: string;
}

type NavigateDate = {
  direction: 'next' | 'previous';
  currentDate: Dayjs;
  currentIndex: number;
  dates: string[];
  dateFormat: DateFormat;
  updateDate: (date: Dayjs, options?: { reStart?: boolean; replace?: boolean }) => void;
  formatDate: (date: Dayjs) => string;
};

/**
 * Core date parsing logic shared between list and range navigation
 * Handles current year option IDs and various date format edge cases
 */
const parseBasicDate = (dateParam: string, dateFormat: DateFormat): Dayjs | null => {
  // Handle current year option IDs
  if (isCurrentYearOptionId(dateParam)) {
    let date = dayjs(`${dateParam}0101`, dateFormat);

    if (!date.isValid()) {
      if (dateFormat === DateFormat.MONTH_ONLY && dateParam.length === 2) {
        const year = dayjs().year();
        date = dayjs(`${year}${dateParam.padStart(2, '0')}01`, DateFormat.DAY);
      } else if (dateFormat === DateFormat.MONTH && dateParam.length === 2) {
        const year = dayjs().year();
        date = dayjs(`${year}${dateParam.padStart(2, '0')}`, DateFormat.MONTH);
      } else {
        date = dayjs(dateParam);
      }
    }

    return date.isValid() ? date : null;
  }

  // Regular date parsing
  let date = dayjs(dateParam, dateFormat, true);

  if (!date.isValid()) {
    if (dateFormat === DateFormat.MONTH_ONLY && dateParam.length === 2) {
      const year = dayjs().year();
      date = dayjs(`${year}${dateParam.padStart(2, '0')}01`, DateFormat.DAY);
    } else if (dateFormat === DateFormat.MONTH && dateParam.length === 2) {
      const year = dayjs().year();
      date = dayjs(`${year}${dateParam.padStart(2, '0')}`, DateFormat.MONTH);
    } else {
      date = dayjs(dateParam);
    }
  }

  return date.isValid() ? date : null;
};

/**
 * Parses a date parameter from URL into a dayjs object for list-based navigation
 * Handles hourly format conversion and updates search params when needed
 */
const parseDateParamForList = (
  dateParam: string,
  dateFormat: DateFormat,
  dates: string[],
  setSearchParams: (update: (prev: URLSearchParams) => URLSearchParams) => void,
): Dayjs | null => {
  const date = parseBasicDate(dateParam, dateFormat);

  if (!date) {
    return null;
  }

  // Handle hourly format conversion - only needed for list navigation
  const isDateParamHourly = dayjs(dateParam, DateFormat.HOUR, true).isValid();
  if (isHourlyFormat(dateFormat) && !isDateParamHourly) {
    const dayStr = date.format(DateFormat.DAY);
    const firstHourlyDate = findFirstDateTimeForSelectedDay(dates, dayStr, dateFormat);
    if (firstHourlyDate) {
      setSearchParams((prev) => {
        prev.set('date', firstHourlyDate);
        return prev;
      });
      return dayjs(firstHourlyDate, dateFormat);
    }
  }

  return date;
};

/**
 * Navigate to the next or previous date in the list
 * Handles circular navigation for month-only format and out-of-range dates
 */
const navigateDate = ({
  direction,
  currentDate,
  currentIndex,
  dateFormat,
  dates,
  updateDate,
  formatDate,
}: NavigateDate) => {
  const isNext = direction === 'next';

  // Handle case when currentDate is not in the dates list
  if (currentIndex === -1) {
    const currentDateStr = formatDate(currentDate);
    const targetIndex = findClosestDateIndex(dates, currentDateStr, isNext ? 'next' : 'previous');

    if (targetIndex !== -1) {
      updateDate(dayjs(dates[targetIndex], dateFormat), { replace: true });
    }
    return;
  }

  // Handle circular navigation for month-only format
  if (dateFormat === DateFormat.MONTH_ONLY && dates.length > 0) {
    const isAtEdge = isNext ? currentIndex === dates.length - 1 : currentIndex === 0;
    if (isAtEdge) {
      const nextDate = dayjs(currentDate).add(isNext ? 1 : -1, 'month');
      updateDate(nextDate);
      return;
    }
  }

  // Regular navigation within the dates list
  const canNavigate = isNext ? currentIndex < dates.length - 1 : currentIndex > 0;
  if (canNavigate) {
    const newIndex = isNext ? currentIndex + 1 : currentIndex - 1;
    const newDate = dayjs(dates[newIndex], dateFormat);
    updateDate(newDate);
  }
};

/**
 * Custom hook for date list-based navigation
 *
 * Provides navigation through a predefined list of available dates with support for:
 * - URL parameter synchronization
 * - Multiple date formats (hourly, daily, monthly, etc.)
 * - Circular navigation for month-only format
 * - Handling dates outside the available list
 *
 * @param dateFormat - The format to use for date parsing and formatting
 * @param availableDates - Array of available dates to navigate through (must be sorted)
 * @param initialDate - Optional initial date to use instead of URL params
 *
 * @returns Object containing current date, navigation functions, and state flags
 */
export const useDateListNavigation = ({ dateFormat, availableDates, initialDate }: UseDateListNavigationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // The `availableDates` array must be sorted by the backend API to ensure correct functionality.
  // A runtime assertion is added to verify this requirement during development and testing.
  if (process.env.NODE_ENV !== 'production') {
    const isSorted = availableDates.every((item, index, arr) => index === 0 || arr[index - 1].date <= item.date);
    if (!isSorted) {
      console.error('The `availableDates` array is not sorted. Ensure the backend API returns sorted data.');
    }
  }
  const dates = useMemo(() => availableDates.map((item) => item.date).sort(), [availableDates]);

  const formatDate = useCallback((date: dayjs.Dayjs) => date.format(dateFormat), [dateFormat]);

  const argoProfiles = useArgoStore((state) => state.argoProfileCycles);

  const currentDate = useMemo(() => {
    // Use initialDate if provided
    if (initialDate) {
      return dayjs(initialDate, dateFormat);
    }

    const dateParam = searchParams.get('date');

    // No date parameter, use first available date or today
    if (!dateParam || dateParam === '0000') {
      return dates.length > 0 ? dayjs(dates.at(-1), dateFormat) : dayjs();
    }

    // Parse date parameter
    const parsedDate = parseDateParamForList(dateParam, dateFormat, dates, setSearchParams);

    // Return parsed date or fallback to first available date or today
    if (parsedDate && parsedDate.isValid()) {
      return parsedDate;
    }

    return dates.length > 0 ? dayjs(dates[0], dateFormat) : dayjs();
  }, [initialDate, searchParams, dates, dateFormat, setSearchParams]);

  const updateDate = useCallback(
    (newDate: Dayjs, options?: { reStart?: boolean; replace?: boolean }) => {
      const { reStart = false, replace = false } = options || {};
      const formatted = formatDate(newDate);

      if (dates.includes(formatted) || reStart) {
        setSearchParams(
          (prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set('date', formatted);
            const correctCycle = argoProfiles.find(({ date }) => date === formatted)?.cycle;
            if (correctCycle) {
              newParams.set('cycle', correctCycle);
            }
            return newParams;
          },
          { replace },
        );
      }
    },
    [formatDate, dates, setSearchParams, argoProfiles],
  );

  const currentIndex = useMemo(
    () => dates.findIndex((date) => date === formatDate(currentDate)),
    [dates, currentDate, formatDate],
  );

  const goToPrevious = useCallback(() => {
    navigateDate({ direction: 'previous', currentDate, currentIndex, dates, dateFormat, updateDate, formatDate });
  }, [currentDate, currentIndex, dates, dateFormat, updateDate, formatDate]);

  const goToNext = useCallback(() => {
    navigateDate({ direction: 'next', currentDate, currentIndex, dates, dateFormat, updateDate, formatDate });
  }, [currentDate, currentIndex, dates, dateFormat, updateDate, formatDate]);

  const canGoPrevious = useMemo(() => {
    if (dateFormat === DateFormat.MONTH_ONLY) {
      return true;
    }

    return currentIndex > 0 || currentIndex === -1;
  }, [dateFormat, currentIndex]);

  const canGoNext = useMemo(() => {
    return dateFormat === DateFormat.MONTH_ONLY || currentIndex < dates.length - 1;
  }, [dateFormat, currentIndex, dates]);

  return {
    currentDate,
    updateDate,
    formatDate,
    goToPrevious,
    goToNext,
    canGoPrevious,
    canGoNext,
    currentIndex,
  };
};

interface UseDateRangeNavigationProps {
  dateFormat: DateFormat;
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
}

export const useDateRangeNavigation = ({ dateFormat, dateRange }: UseDateRangeNavigationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const formatDate = useCallback((date: dayjs.Dayjs) => date.format(dateFormat), [dateFormat]);

  const argoProfiles = useArgoStore((state) => state.argoProfileCycles);

  const currentDate = useMemo(() => {
    const dateParam = searchParams.get('date');

    // No date parameter, return today
    if (!dateParam || dateParam === '0000') {
      return dayjs();
    }

    // Parse the date using shared logic
    const parsedDate = parseBasicDate(dateParam, dateFormat);

    // If parsing failed, return start date
    if (!parsedDate) {
      return dayjs(dateRange.startDate);
    }

    // Ensure the date is within the valid range
    const startDate = dayjs(dateRange.startDate);
    const endDate = dayjs(dateRange.endDate);

    if (parsedDate.isBefore(startDate)) {
      return startDate;
    }
    if (parsedDate.isAfter(endDate)) {
      return endDate;
    }

    return parsedDate;
  }, [searchParams, dateFormat, dateRange]);

  const updateDate = useCallback(
    (newDate: Dayjs, options?: { reStart?: boolean; replace?: boolean }) => {
      const { reStart = false, replace = false } = options || {};
      const formatted = formatDate(newDate);

      // Check if the new date is within the valid range
      const startDate = dayjs(dateRange.startDate);
      const endDate = dayjs(dateRange.endDate);

      if (newDate.isBefore(startDate) || newDate.isAfter(endDate)) {
        if (!reStart) {
          return; // Don't update if outside range and not forcing restart
        }
      }

      setSearchParams(
        (prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.set('date', formatted);
          const correctCycle = argoProfiles.find(({ date }) => date === formatted)?.cycle;
          if (correctCycle) {
            newParams.set('cycle', correctCycle);
          }
          return newParams;
        },
        { replace },
      );
    },
    [formatDate, dateRange, setSearchParams, argoProfiles],
  );

  const goToPrevious = useCallback(() => {
    const startDate = dayjs(dateRange.startDate);

    // Handle circular navigation for month-only format
    if (dateFormat === DateFormat.MONTH_ONLY) {
      const prevDate = dayjs(currentDate).subtract(1, 'month');
      updateDate(prevDate);
      return;
    }

    // Check if we can go to previous date within range
    let prevDate;
    if (isHourlyFormat(dateFormat)) {
      prevDate = dayjs(currentDate).subtract(1, 'hour');
    } else if (dateFormat === DateFormat.DAY) {
      prevDate = dayjs(currentDate).subtract(1, 'day');
    } else if (dateFormat === DateFormat.MONTH) {
      prevDate = dayjs(currentDate).subtract(1, 'month');
    } else {
      prevDate = dayjs(currentDate).subtract(1, 'day'); // default fallback
    }

    if (prevDate.isBefore(startDate)) {
      return; // Don't go beyond start date
    }

    updateDate(prevDate);
  }, [currentDate, dateFormat, dateRange, updateDate]);

  const goToNext = useCallback(() => {
    const endDate = dayjs(dateRange.endDate);

    // Handle circular navigation for month-only format
    if (dateFormat === DateFormat.MONTH_ONLY) {
      const nextDate = dayjs(currentDate).add(1, 'month');
      updateDate(nextDate);
      return;
    }

    // Check if we can go to next date within range
    let nextDate;
    if (isHourlyFormat(dateFormat)) {
      nextDate = dayjs(currentDate).add(1, 'hour');
    } else if (dateFormat === DateFormat.DAY) {
      nextDate = dayjs(currentDate).add(1, 'day');
    } else if (dateFormat === DateFormat.MONTH) {
      nextDate = dayjs(currentDate).add(1, 'month');
    } else {
      nextDate = dayjs(currentDate).add(1, 'day'); // default fallback
    }

    if (nextDate.isAfter(endDate)) {
      return; // Don't go beyond end date
    }

    updateDate(nextDate);
  }, [currentDate, dateFormat, dateRange, updateDate]);

  const canGoPrevious = useMemo(() => {
    if (dateFormat === DateFormat.MONTH_ONLY) {
      return true;
    }

    const startDate = dayjs(dateRange.startDate);
    let prevDate;

    if (isHourlyFormat(dateFormat)) {
      prevDate = dayjs(currentDate).subtract(1, 'hour');
    } else if (dateFormat === DateFormat.DAY) {
      prevDate = dayjs(currentDate).subtract(1, 'day');
    } else if (dateFormat === DateFormat.MONTH) {
      prevDate = dayjs(currentDate).subtract(1, 'month');
    } else {
      prevDate = dayjs(currentDate).subtract(1, 'day');
    }

    return !prevDate.isBefore(startDate);
  }, [dateFormat, currentDate, dateRange]);

  const canGoNext = useMemo(() => {
    if (dateFormat === DateFormat.MONTH_ONLY) {
      return true;
    }

    const endDate = dayjs(dateRange.endDate);
    let nextDate;

    if (isHourlyFormat(dateFormat)) {
      nextDate = dayjs(currentDate).add(1, 'hour');
    } else if (dateFormat === DateFormat.DAY) {
      nextDate = dayjs(currentDate).add(1, 'day');
    } else if (dateFormat === DateFormat.MONTH) {
      nextDate = dayjs(currentDate).add(1, 'month');
    } else {
      nextDate = dayjs(currentDate).add(1, 'day');
    }

    return !nextDate.isAfter(endDate);
  }, [dateFormat, currentDate, dateRange]);

  return {
    currentDate,
    updateDate,
    formatDate,
    goToPrevious,
    goToNext,
    canGoPrevious,
    canGoNext,
  };
};

type UseNavigationProps = Pick<UseDateListNavigationProps, 'dateFormat'> &
  Partial<Omit<UseDateListNavigationProps, 'dateFormat'>> &
  Partial<UseDateRangeNavigationProps>;

export const useDateNavigation = ({ dateFormat, availableDates = [], initialDate, dateRange }: UseNavigationProps) => {
  const listNav = useDateListNavigation({
    dateFormat,
    availableDates,
    initialDate,
  });

  const rangeNav = useDateRangeNavigation({
    dateFormat,
    dateRange: dateRange || { startDate: new Date(), endDate: new Date() },
  });

  const navigationMode: NavigationMode = availableDates.length > 0 && !dateRange ? 'dateList' : 'dateRange';

  return useMemo(() => {
    return {
      navigationMode,
      dateListNavigation: listNav,
      dateRangeNavigation: rangeNav,
    };
  }, [navigationMode, listNav, rangeNav]);
};
