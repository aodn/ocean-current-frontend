import dayjs from 'dayjs';
import React from 'react';
import { Slider } from '@/components/Shared/index';
import { DateSliderProps } from './types/dateSlider.types';

const DateSlider: React.FC<DateSliderProps> = ({ allDates, selectedDateIndex, handleSliderChange, steps }) => {
  const formatDateLabel = (index: number) => dayjs(allDates[index].date).format('DD-MM');

  const nextActiveIndex = (index: number, direction: 'forward' | 'backward') => {
    let newIndex = index;
    while (newIndex >= 0 && newIndex < allDates.length) {
      newIndex = direction === 'forward' ? newIndex + 1 : newIndex - 1;
      if (allDates[newIndex]?.active) break;
    }
    return newIndex >= 0 && newIndex < allDates.length ? newIndex : index;
  };

  const handleSliderUpdate = (newValue: number) => {
    const newIndex = nextActiveIndex(newValue, newValue > selectedDateIndex ? 'forward' : 'backward');
    handleSliderChange(newIndex);
  };

  return (
    <div className="my-2 flex w-full items-center justify-between rounded p-4 px-6 pb-10">
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
