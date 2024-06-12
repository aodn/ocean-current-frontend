import dayjs from 'dayjs';
import React from 'react';
import { Slider } from '@/components/Shared/index';
import { DateSliderProps } from './types/dateSlider.types';

const DateSlider: React.FC<DateSliderProps> = ({ allDates, selectedDateIndex, handleSliderChange, steps }) => {
  const formatDateLabel = (index: number) => dayjs(allDates[index]).format('DD-MM');

  return (
    <div className="my-2 flex w-full items-center justify-between rounded p-4 px-6 pb-10 ">
      {allDates.length > 0 && (
        <div className="w-full px-2">
          <Slider
            value={selectedDateIndex}
            onChange={handleSliderChange}
            min={0}
            max={allDates.length - 1}
            step={steps}
            labelFormatter={formatDateLabel}
          />
        </div>
      )}
    </div>
  );
};

export default DateSlider;
