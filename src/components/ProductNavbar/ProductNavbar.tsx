import React from 'react';
import dayjs from 'dayjs';
import DateRangePicker from '@/components/DateRangePicker/DateRangePicker';
import DateSlider from '@/components/DateSlider/DateSlider';
import VideoCreation from '@/components/VideoCreation/VideoCreation';
import useDateRange from '@/hooks/useDateRange/useDateRange';

const ProductNavbar: React.FC = () => {
  const { startDate, endDate, allDates, selectedDateIndex, handleSliderChange, handleDateChange, modifyDate, steps } =
    useDateRange();

  const isSelectedDayYesterdayOrLater = dayjs(allDates[selectedDateIndex]).isSameOrAfter(
    dayjs().subtract(1, 'day'),
    'day',
  );

  return (
    <div className="mb-2 p-1 shadow-lg">
      <div className="flex items-center justify-between rounded ">
        <div className="w-4/12">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            addButtonDisabled={isSelectedDayYesterdayOrLater}
            handleDateChange={handleDateChange}
            modifyDate={modifyDate}
            selectedDate={allDates[selectedDateIndex]}
          />
        </div>
        <VideoCreation allDates={allDates} />
      </div>
      <DateSlider
        allDates={allDates}
        selectedDateIndex={selectedDateIndex}
        handleSliderChange={handleSliderChange}
        steps={steps}
      />
    </div>
  );
};

export default ProductNavbar;
