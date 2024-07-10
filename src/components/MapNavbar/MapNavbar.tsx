import React from 'react';
import dayjs from 'dayjs';
import DatePicker from '@/components/DatePicker/DatePicker';
import DateSlider from '@/components/DateSlider/DateSlider';
import useDateRange from '@/hooks/useDateRange/useDateRange';

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
  } = useDateRange();

  const isSelectedDayYesterdayOrLater = dayjs(allDates[selectedDateIndex]?.date).isSameOrAfter(
    dayjs().subtract(1, 'day'),
    'day',
  );

  return (
    <div className="mb-2 bg-[#FAFAFA] p-1 shadow-lg">
      <div className="flex items-center justify-between rounded">
        <div className="w-4/12">
          <DatePicker
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
      </div>
      <div className="mb-2 flex items-center justify-center">
        <DateSlider
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
