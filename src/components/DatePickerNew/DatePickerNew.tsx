import React, { useEffect, useCallback } from 'react';
import ReactDatePicker from 'react-datepicker';
import dayjs, { Dayjs } from 'dayjs';
import arrowIcon from '@/assets/icons/arrow.svg';
import calendarIcon from '@/assets/icons/calendar-icon.svg';
import 'react-datepicker/dist/react-datepicker.css';
import { DateFormat } from '@/types/date';
import { DatePickerNewProps } from './types/datePickerNew.types';

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

const DatePicker: React.FC<DatePickerNewProps> = ({
  minDate,
  maxDate = new Date(),
  goToPrevious,
  goToNext,
  canGoNext,
  selectedDate,
  dateFormat,
  onChange,
  isMobile,
}) => {
  const renderDate = (date: Dayjs, dateFormat: DateFormat) => {
    switch (dateFormat) {
      case DateFormat.Hour:
        return date.format('DD MMM YYYY HH:00');
      case DateFormat.Day:
        return date.format('DD MMM YY');
      case DateFormat.Month:
        return date.format('MMM YYYY');
      case DateFormat.MonthOnly:
        return date.format('MMM');
      case DateFormat.Year:
        return date.format('YYYY');
      default:
        return date.format('DD MMM YY');
    }
  };

  const getDateFormatFlags = (format: DateFormat) => ({
    isMonthFormat: format === DateFormat.Month,
    isYearFormat: format === DateFormat.Year,
    isHourFormat: format === DateFormat.Hour,
  });

  const { isMonthFormat, isYearFormat } = getDateFormatFlags(dateFormat);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPrevious();
      } else if (event.key === 'ArrowRight') {
        if (!(isMonthFormat && canGoNext)) {
          goToNext();
        }
      }
    },
    [goToPrevious, isMonthFormat, canGoNext, goToNext],
  );

  const handleDateChange = (date: Date | null) => {
    if (date) {
      onChange(date);
    }
  };

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
          onClick={goToPrevious}
          className="hidden cursor-pointer rounded bg-transparent p-2 font-semibold md:block"
        >
          <img className="h-4 w-4 rotate-90" src={arrowIcon} alt="left arrow icon" />
        </button>
      </div>

      <div className="flex-center h-full">
        <div className="flex items-center justify-center text-center">
          {isMonthFormat || isYearFormat ? (
            <ReactDatePicker
              customInput={isMobile ? customInputMobile() : customInput()}
              selected={selectedDate}
              onChange={handleDateChange}
              showYearPicker
              dateFormat="yyyy"
            />
          ) : (
            <ReactDatePicker
              customInput={isMobile ? customInputMobile() : customInput()}
              selected={selectedDate}
              onChange={handleDateChange}
              minDate={minDate}
              maxDate={maxDate}
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
            />
          )}
        </div>
        <div className="text-l">{renderDate(dayjs(selectedDate), dateFormat)}</div>
      </div>

      <div className="flex-center h-full w-12 border-l-2 text-lg text-imos-title-blue">
        <button
          onClick={goToNext}
          disabled={canGoNext}
          className="hidden cursor-pointer rounded bg-transparent p-2 font-semibold disabled:cursor-not-allowed disabled:opacity-50 md:block"
        >
          <img className="h-4 w-4 -rotate-90" src={arrowIcon} alt="right arrow icon" />
        </button>
      </div>
    </div>
  );
};

export default DatePicker;
