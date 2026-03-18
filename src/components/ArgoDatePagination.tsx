import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router';
import { DateFormat } from '@/types/date';
import { useRegionLatestDates } from '@/services/hooks';
import { Loading } from '@/components/Shared';
import OceanCurrentDatePicker from './DatePicker/OceanCurrentDatePicker';

const START_DATE = dayjs('2010-01-01').toDate();

/**
 * A minimal date picker for the Argo map view, used in place of DatePagination.
 *
 * Only reads/writes the `?date` URL param — no cycle, no depth, no other side-effects.
 * Avoids useDateList / useDateNavigation to keep map-view date selection self-contained.
 */
const ArgoDatePagination: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: latestDatesData, isLoading } = useRegionLatestDates('argo', true);
  const latestDateString = latestDatesData?.regionLatestDates[0]?.latestDate;
  const endDate = latestDateString ? dayjs(latestDateString, DateFormat.DAY).toDate() : undefined;

  const currentDate = useMemo(() => {
    if (!endDate) return dayjs();

    const dateParam = searchParams.get('date');
    if (!dateParam) return dayjs(endDate);

    const parsed = dayjs(dateParam, DateFormat.DAY, true);
    if (!parsed.isValid()) return dayjs(endDate);

    const start = dayjs(START_DATE);
    const end = dayjs(endDate);
    if (parsed.isBefore(start) || parsed.isAfter(end)) return end;

    return parsed;
  }, [searchParams, endDate]);

  if (isLoading || !endDate) {
    return (
      <div className="flex h-full w-full items-center justify-center" aria-busy="true" aria-label="Loading content">
        <Loading loadingSize="h-8 w-8" />
      </div>
    );
  }

  const setDate = (date: dayjs.Dayjs) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set('date', date.format(DateFormat.DAY));
        return next;
      },
      { replace: false },
    );
  };

  const goToPrevious = () => {
    const prev = currentDate.subtract(1, 'day');
    if (!prev.isBefore(dayjs(START_DATE))) setDate(prev);
  };

  const goToNext = () => {
    const next = currentDate.add(1, 'day');
    if (!next.isAfter(dayjs(endDate))) setDate(next);
  };

  const canGoPrevious = !currentDate.subtract(1, 'day').isBefore(dayjs(START_DATE));
  const canGoNext = !currentDate.add(1, 'day').isAfter(dayjs(endDate));

  return (
    <OceanCurrentDatePicker
      productId="argo"
      dateList={[]}
      selectedDate={currentDate.toDate()}
      goToPrevious={goToPrevious}
      goToNext={goToNext}
      canGoPrevious={canGoPrevious}
      canGoNext={canGoNext}
      dateFormat={DateFormat.DAY}
      onChange={(date: Date | null) => {
        if (date) setDate(dayjs(date));
      }}
      startDate={START_DATE}
      endDate={endDate}
    />
  );
};

export default ArgoDatePagination;
