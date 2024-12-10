import React from 'react';
import dayjs from 'dayjs';
import DatePicker from '@/components/DatePicker/DatePicker';
import ResetIcon from '@/assets/icons/reset-icon.svg';
import { useDateRange } from '@/hooks';

const MapNavbar: React.FC = () => {
  const {
    startDate,
    endDate,
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

  return (
    <div className="mb-2 rounded-md bg-[#FAFAFA] p-3">
      <div className="mb-0 flex items-center rounded md:mb-2">
        <div className="flex h-11 items-center justify-center rounded-md border border-[#3A6F8F] p-2">
          <DatePicker
            isMobile
            isMonthRange={isMonthRange}
            isWeekRange={isWeekRange}
            startDate={startDate}
            endDate={endDate}
            addButtonDisabled={isSelectedDayYesterdayOrLater}
            handleDateChange={handleDateChange}
            handleYearDateChange={handleYearDateChange}
            modifyDate={modifyDate}
            selectedDate={allDates[selectedDateIndex]?.date}
            isLastMonthOfTheYear={isLastMonthOfTheYear}
          />
        </div>
        <div
          onClick={() => handleReset()}
          aria-hidden
          className="ml-4 flex h-11 w-2/12 cursor-pointer items-center justify-center rounded-md border border-[#3A6F8F] p-2 md:w-1/12"
        >
          <img src={ResetIcon} alt="" srcSet="" />
        </div>
      </div>
    </div>
  );
};

export default MapNavbar;
