import dayjs from 'dayjs';
import React from 'react';
import { Slider } from '@/components/Shared/index';
import { DateSliderProps } from './types/dateSlider.types';

const DateSlider: React.FC<DateSliderProps> = ({
  allDates,
  selectedDateIndex,
  handleSliderChange,
  steps,
  isMonthRange,
}) => {
  const formatDateLabel = (index: number) =>
    isMonthRange ? dayjs(allDates[index].date).format('MMM') : dayjs(allDates[index].date).format('DD-MM');

  const handleSliderUpdate = (newValue: number) => {
    handleSliderChange(newValue);
  };

  return (
    <div className="flex w-full items-center justify-between rounded bg-slate-200 p-6 pb-10 shadow-inset-custom">
      {allDates.length > 0 && (
        <div className="w-full px-2">
          <Slider
            value={selectedDateIndex}
            onChange={handleSliderUpdate}
            min={0}
            max={allDates.length - 1}
            step={steps}
            labelFormatter={formatDateLabel}
            allDates={allDates}
          />
        </div>
      )}
    </div>
  );
};

export default DateSlider;
