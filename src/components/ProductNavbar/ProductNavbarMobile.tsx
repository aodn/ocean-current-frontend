import React from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import DatePicker from '@/components/DatePicker/DatePicker';
import { useDateRange } from '@/hooks';
import { Button } from '@/components/Shared';
import ResetIcon from '@/assets/icons/reset-icon.svg';
import MapIcon from '@/assets/icons/map-icon.svg';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import { ProductNavbarProps } from './types/productNavbarProps.types';

const ProductNavbarMobile: React.FC<ProductNavbarProps> = () => {
  const { mainProduct, subProduct } = useProductConvert();
  const navigate = useNavigate();

  const {
    startDate,
    endDate,
    minDate,
    maxDate,
    allDates,
    selectedDateIndex,
    handleYearDateChange,
    handleDateChange,
    modifyDate,
    isLastMonthOfTheYear,
    isMonthRange,
    resetDateRange,
    isWeekRange,
  } = useDateRange();

  const isSelectedDayYesterdayOrLater = dayjs(allDates[selectedDateIndex]?.date).isSameOrAfter(
    dayjs().subtract(1, 'day'),
    'day',
  );

  const handleReset = () => {
    resetDateRange();
  };

  const handleRegionClick = () => {
    if (mainProduct?.path && subProduct?.path) {
      const path = `/map/${mainProduct.path}/${subProduct.path}`;
      navigate(path);
    }
  };

  return (
    <div className="mb-2 rounded-md bg-[#FAFAFA] p-3 ">
      <div className="mb-2 w-full">
        <Button
          borderRadius="small"
          icon={<img src={MapIcon} alt="Map Icon" />}
          type="secondary"
          size="full"
          onClick={handleRegionClick}
        >
          Select Region
        </Button>
      </div>
      <div className="mb-2 flex items-center justify-between ">
        <div className="flex h-11 items-center justify-center rounded-md border border-[#3A6F8F] p-2">
          <DatePicker
            isMobile
            startDate={startDate}
            endDate={endDate}
            minDate={minDate}
            maxDate={maxDate}
            addButtonDisabled={isSelectedDayYesterdayOrLater}
            handleDateChange={handleDateChange}
            handleYearDateChange={handleYearDateChange}
            modifyDate={modifyDate}
            selectedDate={allDates[selectedDateIndex]?.date}
            isLastMonthOfTheYear={isLastMonthOfTheYear}
            isWeekRange={isWeekRange}
            isMonthRange={isMonthRange}
          />
        </div>

        <div
          onClick={handleReset}
          aria-hidden
          className="flex h-11 cursor-pointer items-center justify-center rounded-md border border-[#3A6F8F] p-2"
        >
          <img src={ResetIcon} alt="" />
        </div>
      </div>

      <div className="flex w-full justify-between">
        <div className="mr-1 w-1/2">
          <Button borderRadius="small" type="secondary" size="full" onClick={() => modifyDate('add')}>
            Next image
          </Button>
        </div>

        <div className="ml-1 w-1/2">
          <Button borderRadius="small" type="secondary" size="full" onClick={() => modifyDate('subtract')}>
            Previous image
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductNavbarMobile;
