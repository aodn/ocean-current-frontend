import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import { DateFormat, DateItem } from '@/types/date';
import { useArgoStore } from '@/stores/argo-store/argoStore';

interface UseDateNavigationProps {
  dateFormat: DateFormat;
  availableDates: DateItem[];
  initialDate?: string;
}

const useDateNavigation = ({ dateFormat, availableDates, initialDate }: UseDateNavigationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dates = useMemo(() => availableDates.map((item) => item.date).sort(), [availableDates]);

  const formatDate = useCallback((date: dayjs.Dayjs) => date.format(dateFormat), [dateFormat]);

  const argoProfiles = useArgoStore((state) => state.argoProfileCycles);
  const currentDate = useMemo(() => {
    if (initialDate) {
      return dayjs(initialDate, dateFormat);
    }

    const dateParam = searchParams.get('date');
    if (dateParam) {
      let date: Dayjs = dayjs(dateParam);
      if (!date.isValid()) {
        date = dayjs();
      }
      return date;
    }

    if (dates.length > 0) {
      return dayjs(dates[0], dateFormat);
    }

    return dayjs();
  }, [initialDate, searchParams, dates, dateFormat]);

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
    if (currentIndex > 0) {
      const prevDate = dayjs(dates[currentIndex - 1], dateFormat);
      updateDate(prevDate);
    }
    return null;
  }, [currentIndex, dateFormat, dates, updateDate]);

  const goToNext = useCallback(() => {
    if (currentIndex < dates.length - 1) {
      const nextDate = dayjs(dates[currentIndex + 1], dateFormat);
      updateDate(nextDate);
    }
    return null;
  }, [currentIndex, dateFormat, dates, updateDate]);

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
