import React from 'react';
import dayjs from 'dayjs';
import { useDateNavigation } from '@/hooks/useDateNavigation/useDateNavigation';
import { useDateList } from '@/hooks';
import { DateFormat } from '@/types/date';
import { ProductID } from '@/types/product';
import { ProductMenubarText } from '@/constants/textConstant';
import OceanCurrentDatePicker from './DatePicker/OceanCurrentDatePicker';
import { Loading } from './Shared';

interface DatePaginationProps {
  productId: ProductID;
  dateFormat: DateFormat;
  initialDate?: string;
  mode?: 'range' | 'list';
  showVideo?: boolean;
  isImageLoading?: boolean;
}

/**
 * DatePagination have two modes: 'range' and 'list'.
 * In 'range' mode, it allows users to select a single date within the range (start date and end date).
 * In 'list' mode, it allows users to select a single date from a list of available dates.
 */
const DatePagination: React.FC<DatePaginationProps> = ({
  productId,
  dateFormat,
  initialDate,
  mode = 'range',
  showVideo,
  isImageLoading,
}) => {
  const { isLoading, dateList, dateRange } = useDateList({ productId, mode });

  // For range mode, use DAY format
  const effectiveDateFormat = mode === 'range' ? DateFormat.DAY : dateFormat;
  const { navigationMode, dateListNavigation, dateRangeNavigation } = useDateNavigation({
    availableDates: dateList,
    dateFormat: effectiveDateFormat,
    initialDate,
    dateRange,
    productId,
  });
  const { currentDate, updateDate, goToPrevious, goToNext, canGoPrevious, canGoNext } =
    navigationMode === 'dateList' ? dateListNavigation : dateRangeNavigation;
  // For product only with fixed date range (sst timeseries)
  const isSstTimeseries = productId === 'sixDaySst-timeseries';
  const isDatePickerDisabled = isSstTimeseries;
  const displayText = isSstTimeseries ? ProductMenubarText.SIX_DAY_SST_TIMESERIES_DATE : undefined;

  const adjustedCanGoNext = canGoNext && !isSstTimeseries;
  const adjustedCanGoPrevious = canGoPrevious && !isSstTimeseries;

  // Initial data load — date picker data not yet available, spinner only
  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center" aria-busy="true" aria-label="Loading content">
        <Loading loadingSize="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full">
      <OceanCurrentDatePicker
        productId={productId}
        dateList={dateList}
        selectedDate={currentDate.toDate()}
        goToNext={goToNext}
        goToPrevious={goToPrevious}
        canGoNext={adjustedCanGoNext && !showVideo}
        canGoPrevious={adjustedCanGoPrevious && !showVideo}
        dateFormat={effectiveDateFormat}
        onChange={(date: Date | null) => updateDate(dayjs(date), { reStart: true })}
        isDatePickerDisabled={isDatePickerDisabled || !!showVideo || isImageLoading}
        displayText={displayText}
        startDate={dateRange?.startDate}
        endDate={dateRange?.endDate}
      />
    </div>
  );
};

export default DatePagination;
