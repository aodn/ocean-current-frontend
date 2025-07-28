import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import dayjs, { Dayjs } from 'dayjs';
import { DateFormat, DateItem } from '@/types/date';
import { useArgoStore } from '@/stores/argo-store/argoStore';
import { isHourlyFormat, findFirstHourlyDateForDay } from '@/utils/date-utils/hourly';
import { findClosestDateIndex } from '@/utils/date-utils/date';

interface UseDateNavigationProps {
  dateFormat: DateFormat;
  availableDates: DateItem[];
  initialDate?: string;
}

const useDateNavigation = ({ dateFormat, availableDates, initialDate }: UseDateNavigationProps) => {
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
      const date = dayjs(dateParam);
      if (!date.isValid()) {
        return dayjs();
      }

      const isDateParamHourly = dayjs(dateParam, DateFormat.HOUR, true).isValid();
      if (isHourlyFormat(dateFormat) && !isDateParamHourly) {
        const dayStr = date.format(DateFormat.DAY);
        const firstHourlyDate = findFirstHourlyDateForDay(dates, dayStr, dateFormat);
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
    (newDate: Dayjs, reStart: boolean = false) => {
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
          { replace: false },
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
        updateDate(dayjs(dates[prevIndex], dateFormat));
      }
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
        updateDate(dayjs(dates[nextIndex], dateFormat));
      }
      return;
    }
    if (currentIndex < dates.length - 1) {
      const nextDate = dayjs(dates[currentIndex + 1], dateFormat);
      updateDate(nextDate);
    }
  }, [currentIndex, dateFormat, dates, updateDate, currentDate, formatDate]);

  return {
    currentDate,
    updateDate,
    formatDate,
    goToPrevious,
    goToNext,
    canGoPrevious: currentIndex > 0,
    canGoNext: currentIndex < dates.length - 1,
    currentIndex,
  };
};

export default useDateNavigation;
