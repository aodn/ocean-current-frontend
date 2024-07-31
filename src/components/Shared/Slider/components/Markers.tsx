import React from 'react';
import { MarkersProps } from '../types/slider.types';

const Markers: React.FC<MarkersProps> = ({ min, max, step, labelFormatter, allDates }) => {
  return (
    <>
      {allDates.map(({ active, showLabel }, index) => (
        <div
          key={index}
          className={`absolute -top-0.5 w-0.5 translate-y-1/2 select-none ${active ? 'bg-[#7C8EA9]' : 'bg-gray-300'}`}
          style={{
            left: `${((index * step) / (max - min)) * 100}%`,
            height: showLabel ? '12px' : '8px',
          }}
        >
          {showLabel && (
            <span
              className={`absolute right-1/2 mt-3 block translate-x-1/2 select-none whitespace-nowrap ${active ? '' : 'text-gray-300'}`}
            >
              {labelFormatter ? labelFormatter(index) : index}
            </span>
          )}
        </div>
      ))}
    </>
  );
};

export default Markers;
