import React from 'react';
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';
import useDateNavigation from '@/hooks/useDateNavigation/useDateNavigation';
import { useDateList } from '@/hooks';
import { RegionScope } from '@/constants/region';
import { DateFormat } from '@/types/date';
import DatePicker from './DatePicker/DatePicker';

interface DatePaginationProps {
  productId: string;
  regionScope: RegionScope;
  dateFormat: DateFormat;
  initialDate?: string;
  isMobile?: boolean;
}

const DatePagination: React.FC<DatePaginationProps> = ({
  productId,
  regionScope,
  dateFormat,
  initialDate,
  isMobile,
}) => {
  const [searchParams] = useSearchParams();
  const dateFromUrl = searchParams.get('date');

  const selectedDate = dateFromUrl || dayjs().format(dateFormat);

  const { isLoading, dateList } = useDateList(productId, regionScope, selectedDate) || [];

  const { currentDate, updateDate, goToPrevious, goToNext, canGoPrevious, canGoNext } = useDateNavigation({
    availableDates: dateList,
    dateFormat,
    initialDate,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <DatePicker
      selectedDate={currentDate.toDate()}
      goToNext={goToNext}
      goToPrevious={goToPrevious}
      canGoNext={canGoNext}
      canGoPrevious={canGoPrevious}
      dateFormat={dateFormat}
      onChange={(date: Date | null) => updateDate(dayjs(date), true)}
      maxDate={new Date()}
      isMobile={isMobile}
    />
  );
};

export default DatePagination;
