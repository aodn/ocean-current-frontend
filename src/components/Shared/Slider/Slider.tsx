import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SliderProps } from './types/slider.types';
import Markers from './components/Markers';

const Slider: React.FC<SliderProps> = ({ min, max, step, value, onChange, labelFormatter, allDates }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const calculateValue = useCallback(
    (clientX: number) => {
      const { left, width } = sliderRef.current!.getBoundingClientRect();
      const position = Math.min(Math.max(clientX - left, 0), width);
      const newValue = Math.round((min + (position / width) * (max - min)) / step) * step;
      return Math.max(min, Math.min(newValue, max));
    },
    [min, max, step],
  );

  const startDragging = (event: React.MouseEvent) => {
    setDragging(true);
    setShowTooltip(true);
    const newValue = calculateValue(event.clientX);
    onChange(newValue);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (dragging) {
        const newValue = calculateValue(event.clientX);
        onChange(newValue);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragging, calculateValue]);

  return (
    <div className="relative">
      <Markers min={min} max={max} step={step} labelFormatter={labelFormatter} allDates={allDates} />
      <div
        ref={sliderRef}
        className="relative h-1 w-full cursor-pointer bg-[#7C8EA9]"
        onMouseDown={startDragging}
        aria-hidden
        data-testid="slider-base"
      >
        <div
          className="absolute -top-4 -translate-x-1/2 border-l-[10px] border-r-[10px] border-t-[15px] border-l-transparent border-r-transparent border-t-imos-sea-blue"
          data-testid="slider-thumb"
          style={{
            left: `${((value - min) / (max - min)) * 100}%`,
          }}
        >
          <div className="h-5 w-1 bg-imos-sea-blue"></div>
          {showTooltip && (
            <span className="absolute -top-16 right-1/2 w-max translate-x-1/2 select-none rounded bg-gray-800 px-2 py-1 text-center text-white">
              {labelFormatter ? labelFormatter(value) : value}
              <div className="absolute -bottom-2 right-1/2 translate-x-1/2 transform border-b-0 border-l-8 border-r-8 border-t-8 border-solid border-l-transparent border-r-transparent border-t-gray-800"></div>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Slider;
