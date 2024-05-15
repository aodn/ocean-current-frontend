import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SliderProps } from './types/slider.types';

const Slider: React.FC<SliderProps> = ({ min, max, step, value, onChange, labelFormatter }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const calculateValue = useCallback(
    (clientX: number) => {
      const { left, width } = sliderRef.current!.getBoundingClientRect();
      const position = Math.min(Math.max(clientX - left, 0), width);
      const newValue = Math.round((min + (position / width) * (max - min)) / step) * step;
      onChange(newValue);
    },
    [min, max, step, onChange],
  );

  const startDragging = (event: React.MouseEvent) => {
    setDragging(true);
    setShowTooltip(true);
    calculateValue(event.clientX);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (dragging) {
        calculateValue(event.clientX);
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
      setShowTooltip(false);
    };

    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, calculateValue]);

  const renderMarks = () => {
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

  return (
    <div
      ref={sliderRef}
      className="relative h-1 w-full cursor-pointer bg-gray-300"
      onMouseDown={startDragging}
      aria-hidden
      data-testid="slider-base"
    >
      {renderMarks()}
      <div
        className="absolute -top-2 h-5 w-5 -translate-x-1/2 rounded-full border bg-white shadow-md"
        data-testid="slider-thumb"
        style={{
          left: `${((value - min) / (max - min)) * 100}%`,
        }}
      >
        {showTooltip && (
          <span className="absolute -top-11 right-1/2 w-max translate-x-1/2 select-none rounded bg-gray-800 px-2 py-1 text-center text-white">
            {labelFormatter ? labelFormatter(value) : value}
            <div className="absolute -bottom-2 right-1/2 translate-x-1/2 transform border-b-0 border-l-8 border-r-8 border-t-8 border-solid border-l-transparent border-r-transparent border-t-gray-800"></div>
          </span>
        )}
      </div>
    </div>
  );
};

export default Slider;
