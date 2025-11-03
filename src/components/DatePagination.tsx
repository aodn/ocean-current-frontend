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
  isFreeMode?: boolean;
}

const DatePagination: React.FC<DatePaginationProps> = ({ productId, dateFormat, initialDate, isFreeMode = false }) => {
  const { isLoading, dateList, dateRange } = useDateList({ productId, isFreeMode });

  // For free mode, use DAY format
  const effectiveDateFormat = isFreeMode ? DateFormat.DAY : dateFormat;

  const { navigationMode, dateListNavigation, dateRangeNavigation } = useDateNavigation({
    availableDates: dateList,
    dateFormat: effectiveDateFormat,
    initialDate,
    dateRange,
  });
  const { currentDate, updateDate, goToPrevious, goToNext, canGoPrevious, canGoNext } =
    navigationMode === 'dateList' ? dateListNavigation : dateRangeNavigation;

  // For product only with fixed date range (sst timeseries)
  const isSstTimeseries = productId === 'sixDaySst-timeseries';
  const isDatePickerDisabled = isSstTimeseries;
  const displayText = isSstTimeseries ? ProductMenubarText.SIX_DAY_SST_TIMESERIES_DATE : undefined;

  const adjustedCanGoNext = canGoNext && !isSstTimeseries;
  const adjustedCanGoPrevious = canGoPrevious && !isSstTimeseries;

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center" aria-busy="true" aria-label="Loading content">
        <Loading loadingSize="h-8 w-8" />
      </div>
    );
  }

  return (
    <OceanCurrentDatePicker
      productId={productId}
      dateList={dateList}
      selectedDate={currentDate.toDate()}
      goToNext={goToNext}
      goToPrevious={goToPrevious}
      canGoNext={adjustedCanGoNext}
      canGoPrevious={adjustedCanGoPrevious}
      dateFormat={effectiveDateFormat}
      onChange={(date: Date | null) => updateDate(dayjs(date), { reStart: true })}
      isDatePickerDisabled={isDatePickerDisabled}
      displayText={displayText}
      startDate={dateRange?.startDate}
      endDate={dateRange?.endDate}
      isFreeMode={isFreeMode}
    />
  );
};

export default DatePagination;
