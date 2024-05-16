import React from 'react';
import { MarkersProps } from '../types/slider.types';

const Markers: React.FC<MarkersProps> = ({ min, max, step, labelFormatter }) => {
  return Array.from({ length: (max - min) / step + 1 }).map((_, index) => (
    <div
      key={index}
      className="absolute -top-0.5 w-0.5 translate-y-1/2 select-none bg-gray-300"
      style={{
        left: `${((index * step) / (max - min)) * 100}%`,
        height: index % 7 === 0 ? '12px' : '6px',
      }}
    >
      {index % 7 === 0 && (
        <span className="absolute right-1/2 mt-3 block translate-x-1/2 select-none whitespace-nowrap">
          {labelFormatter ? labelFormatter(index) : index}
        </span>
      )}
    </div>
  ));
};

export default Markers;
