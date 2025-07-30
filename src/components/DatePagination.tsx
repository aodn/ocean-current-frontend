import React from 'react';
import dayjs from 'dayjs';
import useDateNavigation from '@/hooks/useDateNavigation/useDateNavigation';
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
  isMobile?: boolean;
}

const DatePagination: React.FC<DatePaginationProps> = ({ productId, dateFormat, initialDate, isMobile }) => {
  const { isLoading, dateList } = useDateList(productId);

  const { currentDate, updateDate, goToPrevious, goToNext, canGoPrevious, canGoNext } = useDateNavigation({
    availableDates: dateList,
    dateFormat,
    initialDate,
  });

  // Product-specific logic moved from OceanCurrentDatePicker
  const isSstTimeseries = productId === 'sixDaySst-timeseries';
  const isDatePickerDisabled = isSstTimeseries;
  const displayText = isSstTimeseries ? ProductMenubarText.SIX_DAY_SST_TIMESERIES_DATE : undefined;

  // Adjust navigation capabilities based on product
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
      dateFormat={dateFormat}
      onChange={(date: Date | null) => updateDate(dayjs(date), { reStart: true })}
      isMobile={isMobile}
      isDatePickerDisabled={isDatePickerDisabled}
      displayText={displayText}
    />
  );
};

export default DatePagination;
