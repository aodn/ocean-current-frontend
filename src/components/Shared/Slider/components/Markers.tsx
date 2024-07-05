import React from 'react';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import { MarkersProps } from '../types/slider.types';

const Markers: React.FC<MarkersProps> = ({ min, max, step, labelFormatter, allDates }) => {
  const { mainProduct } = useProductConvert();
  const isClimatology = mainProduct?.key === 'climatology';

  const showWeekMarker = (index: number) => isClimatology || index % 7 === 0;

  return (
    <>
      {allDates.map((marker, index) => (
        <div
          key={index}
          className={`absolute -top-0.5 w-0.5 translate-y-1/2 select-none ${
            marker.active ? 'bg-[#7C8EA9]' : 'bg-gray-300'
          }`}
          style={{
            left: `${((index * step) / (max - min)) * 100}%`,
            height: showWeekMarker(index) ? '12px' : '8px',
          }}
        >
          {showWeekMarker(index) && (
            <span className="absolute right-1/2 mt-3 block translate-x-1/2 select-none whitespace-nowrap">
              {labelFormatter ? labelFormatter(index) : index}
            </span>
          )}
        </div>
      ))}
    </>
  );
};

export default Markers;
