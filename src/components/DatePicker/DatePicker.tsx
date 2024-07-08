import React from 'react';
import ReactDatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import arrowIcon from '@/assets/icons/arrow.svg';
import calendarIcon from '@/assets/icons/calendar-icon.svg';
import 'react-datepicker/dist/react-datepicker.css';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import { DatePickerProps } from './types/DatePicker.types';

const customInput = () => (
  <div className="mr-4 flex cursor-pointer items-center justify-center">
    <img src={calendarIcon} alt="calendar icon" className="mr-4" />
    <p className="font-medium text-imos-sea-blue">Date</p>
  </div>
);

const DatePicker: React.FC<DatePickerProps> = ({
  startDate,
  endDate,
  maxDate = new Date(),
  addButtonDisabled = false,
  handleDateChange,
  modifyDate,
  handleYearDateChange,
  selectedDate,
  isLastMonthOfTheYear,
}) => {
  const { mainProduct } = useProductConvert();
  const isClimatology = mainProduct?.key === 'climatology';
  const formattedDate = isClimatology
    ? dayjs(selectedDate).format('MMM YYYY')
    : dayjs(selectedDate).format('DD MMM YYYY');

  return (
    <div className="flex items-center justify-evenly">
      <div className="max-w-28">
        {isClimatology ? (
          <ReactDatePicker
            customInput={customInput()}
            selected={startDate}
            onChange={handleYearDateChange}
            showMonthYearPicker
            dateFormat="yyyy"
          />
        ) : (
          <ReactDatePicker
            customInput={customInput()}
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            maxDate={maxDate}
            selectsRange
          />
        )}
      </div>

      <div className="my-4 flex items-center justify-between rounded-md border px-2 py-1 text-lg text-imos-title-blue shadow">
        <button
          onClick={() => modifyDate('subtract')}
          className="cursor-pointer rounded bg-transparent p-2 font-semibold"
        >
          <img className="h-2.5 w-2.5 rotate-90" src={arrowIcon} alt="left arrow icon" />
        </button>
        <span className="text-l px-1">{formattedDate}</span>
        <button
          onClick={() => modifyDate('add')}
          disabled={isClimatology ? isLastMonthOfTheYear() : addButtonDisabled}
          className="cursor-pointer rounded bg-transparent p-2 font-semibold disabled:cursor-not-allowed disabled:opacity-50"
        >
          <img className="h-2.5 w-2.5 -rotate-90" src={arrowIcon} alt="right arrow icon" />
        </button>
      </div>
    </div>
  );
};

export default DatePicker;
