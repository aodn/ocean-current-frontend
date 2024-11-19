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
  </div>
);

const customInputMobile = () => (
  <div className="mr-5 mt-1 flex w-full cursor-pointer items-center justify-center">
    <img src={calendarIcon} alt="calendar icon" className="mr-4" />
  </div>
);

const DatePicker: React.FC<DatePickerProps> = ({
  startDate,
  minDate,
  maxDate = new Date(),
  addButtonDisabled = false,
  handleDateChange,
  modifyDate,
  handleYearDateChange,
  selectedDate,
  isLastMonthOfTheYear,
  isMonthRange,
  isWeekRange,
  isYearRange,
  isMobile,
}) => {
  const formattedDate = () => {
    if (isMonthRange) {
      return dayjs(selectedDate).format('MMM YYYY');
    } else if (isWeekRange) {
      return dayjs(selectedDate).format('DD MMM HH:mm ');
    } else if (isYearRange) {
      return dayjs(selectedDate).format('YYYY');
    } else {
      return dayjs(selectedDate).format('DD MMM YY');
    }
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        modifyDate('subtract');
      } else if (event.key === 'ArrowRight') {
        if (!(isMonthRange ? isLastMonthOfTheYear() : addButtonDisabled)) {
          modifyDate('add');
        }
      }
    },
    [modifyDate, isMonthRange, isLastMonthOfTheYear, addButtonDisabled],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="flex h-full w-full items-center justify-between">
      <div className="flex-center h-full w-12 border-r-2 text-lg text-imos-title-blue">
        <button
          onClick={() => modifyDate('subtract')}
          className="hidden cursor-pointer rounded bg-transparent p-2 font-semibold md:block"
        >
          <img className="h-4 w-4 rotate-90" src={arrowIcon} alt="left arrow icon" />
        </button>
      </div>

      <div className="flex-center h-full">
        <div className="flex items-center justify-center text-center">
          {isMonthRange || isYearRange ? (
            <ReactDatePicker
              customInput={isMobile ? customInputMobile() : customInput()}
              selected={startDate}
              onChange={handleYearDateChange}
              showYearPicker
              dateFormat="yyyy"
            />
          ) : (
            <ReactDatePicker
              customInput={isMobile ? customInputMobile() : customInput()}
              selected={startDate}
              onChange={handleDateChange}
              minDate={minDate}
              maxDate={maxDate}
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
            />
          )}
        </div>
        <div className="text-l">{formattedDate()}</div>
      </div>

      <div className="flex-center h-full w-12 border-l-2 text-lg text-imos-title-blue">
        <button
          onClick={() => modifyDate('add')}
          disabled={isMonthRange ? isLastMonthOfTheYear() : addButtonDisabled}
          className="hidden cursor-pointer rounded bg-transparent p-2 font-semibold disabled:cursor-not-allowed disabled:opacity-50 md:block"
        >
          <img className="h-4 w-4 -rotate-90" src={arrowIcon} alt="right arrow icon" />
        </button>
      </div>
    </div>
  );
};

export default DatePicker;
