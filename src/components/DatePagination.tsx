import React from 'react';
import dayjs from 'dayjs';
import useDateNavigation from '@/hooks/useDateNavigation/useDateNavigation';
import { useDateList } from '@/hooks';
import { RegionScope } from '@/constants/region';
import { DateFormat } from '@/types/date';
import { ProductID } from '@/types/product';
import useProductStore from '@/stores/product-store/productStore';
import DatePicker from './DatePicker/DatePicker';

interface DatePaginationProps {
  productId: ProductID;
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
  const regionCodeFromStore = useProductStore((state) => state.productParams.regionCode);

  const { isLoading, dateList } = useDateList(productId, regionScope, regionCodeFromStore!);

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
      productId={productId}
      dateList={dateList}
      selectedDate={currentDate.toDate()}
      goToNext={goToNext}
      goToPrevious={goToPrevious}
      canGoNext={canGoNext}
      canGoPrevious={canGoPrevious}
      dateFormat={dateFormat}
      onChange={(date: Date | null) => updateDate(dayjs(date), true)}
      isMobile={isMobile}
    />
  );
};

export default DatePagination;
