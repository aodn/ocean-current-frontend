import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import dayjs, { Dayjs } from 'dayjs';
import { DateFormat, DateItem } from '@/types/date';
import { useArgoStore } from '@/stores/argo-store/argoStore';
import { isHourlyFormat, findFirstDateTimeForSelectedDay } from '@/utils/date-utils/hourly';
import { findClosestDateIndex } from '@/utils/date-utils/date';

type NavigationMode = 'dateList' | 'dateRange';

interface UseDateListNavigationProps {
  dateFormat: DateFormat;
  availableDates: DateItem[];
  initialDate?: string;
}

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
    if (initialDate) {
      return dayjs(initialDate, dateFormat);
    }

    const dateParam = searchParams.get('date');
    if (dateParam) {
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

      if (!date.isValid()) {
        return dayjs();
      }

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
    }

    if (dates.length > 0) {
      return dayjs(dates[0], dateFormat);
    }

    return dayjs();
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
    if (currentIndex === -1) {
      // Handle case when currentDate is not in the dates list
      const currentDateStr = formatDate(currentDate);
      const prevIndex = findClosestDateIndex(dates, currentDateStr, 'previous');

      if (prevIndex !== -1) {
        updateDate(dayjs(dates[prevIndex], dateFormat), { replace: true });
      }
      return;
    }

    // Handle circular navigation for month-only format
    if (dateFormat === DateFormat.MONTH_ONLY && currentIndex === 0 && dates.length > 0) {
      // If we're at January, go to December
      const prevDate = dayjs(currentDate).subtract(1, 'month');
      updateDate(prevDate);
      return;
    }

    if (currentIndex > 0) {
      const prevDate = dayjs(dates[currentIndex - 1], dateFormat);
      updateDate(prevDate);
    }
  }, [currentIndex, dateFormat, dates, updateDate, currentDate, formatDate]);

  const goToNext = useCallback(() => {
    if (currentIndex === -1) {
      // Handle case when currentDate is not in the dates list
      const currentDateStr = formatDate(currentDate);
      const nextIndex = findClosestDateIndex(dates, currentDateStr, 'next');

      if (nextIndex !== -1) {
        updateDate(dayjs(dates[nextIndex], dateFormat), { replace: true });
      }
      return;
    }

    // Handle circular navigation for month-only format
    if (dateFormat === DateFormat.MONTH_ONLY && currentIndex === dates.length - 1 && dates.length > 0) {
      // If we're at December, go to January
      const nextDate = dayjs(currentDate).add(1, 'month');
      updateDate(nextDate);
      return;
    }

    if (currentIndex < dates.length - 1) {
      const nextDate = dayjs(dates[currentIndex + 1], dateFormat);
      updateDate(nextDate);
    }
  }, [currentIndex, dateFormat, dates, updateDate, currentDate, formatDate]);

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
    if (dateParam) {
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

      if (!date.isValid()) {
        return dayjs(dateRange.startDate);
      }

      // Ensure the date is within the valid range
      const parsedDate = dayjs(date);
      const startDate = dayjs(dateRange.startDate);
      const endDate = dayjs(dateRange.endDate);

      if (parsedDate.isBefore(startDate)) {
        return startDate;
      }
      if (parsedDate.isAfter(endDate)) {
        return endDate;
      }

      return parsedDate;
    }

    // Default to start date if no date param
    return dayjs(dateRange.startDate);
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
