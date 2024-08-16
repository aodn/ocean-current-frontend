import React from 'react';
import dayjs from 'dayjs';
import DatePicker from '@/components/DatePicker/DatePicker';
import DateSlider from '@/components/DateSlider/DateSlider';
import ResetIcon from '@/assets/icons/reset-icon.svg';
import { useDateRange } from '@/hooks';

const MapNavbar: React.FC = () => {
  const {
    startDate,
    endDate,
    allDates,
    selectedDateIndex,
    handleSliderChange,
    handleYearDateChange,
    handleDateChange,
    modifyDate,
    steps,
    isLastMonthOfTheYear,
    isYearRange,
    resetDateRange,
    isWeakRange,
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
      <div className="mb-2 flex items-center rounded">
        <div className="flex h-11 items-center justify-center rounded-md border border-[#3A6F8F] p-2">
          <DatePicker
            isYearRange={isYearRange}
            isWeakRange={isWeakRange}
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
          className="ml-4 flex h-11 w-1/12 cursor-pointer items-center justify-center rounded-md border border-[#3A6F8F] p-2"
        >
          <img src={ResetIcon} alt="" srcSet="" />
        </div>
      </div>
      <div className="mb-2 flex items-center justify-center">
        <DateSlider
          isYearRange={isYearRange}
          allDates={allDates}
          selectedDateIndex={selectedDateIndex}
          handleSliderChange={handleSliderChange}
          steps={steps}
        />
      </div>
    </div>
  );
};

export default MapNavbar;
