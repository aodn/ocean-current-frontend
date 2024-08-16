import React, { useEffect, useCallback } from 'react';
import ReactDatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import arrowIcon from '@/assets/icons/arrow.svg';
import calendarIcon from '@/assets/icons/calendar-icon.svg';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePickerProps } from './types/datePicker.types';

const customInput = () => (
  <div className="mr-5 mt-1 flex w-full cursor-pointer items-center justify-center">
    <img src={calendarIcon} alt="calendar icon" className="mr-4" />
    <p className="font-medium text-imos-sea-blue">Time Range</p>
  </div>
);

const DatePicker: React.FC<DatePickerProps> = ({
  startDate,
  endDate,
  minDate,
  maxDate = new Date(),
  addButtonDisabled = false,
  handleDateChange,
  modifyDate,
  handleYearDateChange,
  selectedDate,
  isLastMonthOfTheYear,
  isYearRange,
  isWeekRange,
}) => {
  const formattedDate = () => {
    if (isYearRange) {
      return dayjs(selectedDate).format('MMM YYYY');
    } else if (isWeekRange) {
      return dayjs(selectedDate).format('DD MMM HH:mm ');
    } else {
      return dayjs(selectedDate).format('DD MMM YY');
    }
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        modifyDate('subtract');
      } else if (event.key === 'ArrowRight') {
        if (!(isYearRange ? isLastMonthOfTheYear() : addButtonDisabled)) {
          modifyDate('add');
        }
      }
    },
    [modifyDate, isYearRange, isLastMonthOfTheYear, addButtonDisabled],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="flex items-center justify-evenly">
      <div>
        {isYearRange ? (
          <ReactDatePicker
            customInput={customInput()}
            selected={startDate}
            onChange={handleYearDateChange}
            showYearPicker
            dateFormat="yyyy"
          />
        ) : (
          <ReactDatePicker
            customInput={customInput()}
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            minDate={minDate}
            maxDate={maxDate}
            selectsRange
          />
        )}
      </div>

      <div className="flex min-w-44 items-center justify-between border-l-2 text-lg text-imos-title-blue">
        <button
          onClick={() => modifyDate('subtract')}
          className="cursor-pointer rounded bg-transparent p-2 font-semibold"
        >
          <img className="h-4 w-4 rotate-90" src={arrowIcon} alt="left arrow icon" />
        </button>
        <span className="text-l px-1">{formattedDate()}</span>
        <button
          onClick={() => modifyDate('add')}
          disabled={isYearRange ? isLastMonthOfTheYear() : addButtonDisabled}
          className="cursor-pointer rounded bg-transparent p-2 font-semibold disabled:cursor-not-allowed disabled:opacity-50"
        >
          <img className="h-4 w-4 -rotate-90" src={arrowIcon} alt="right arrow icon" />
        </button>
      </div>
    </div>
  );
};

export default DatePicker;
