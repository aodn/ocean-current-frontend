import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import React from 'react';
import arrowIcon from '@/assets/icons/arrow.svg';
import calendarIcon from '@/assets/icons/calendar-icon.svg';
import { DateRangePickerProps } from './types/datePicker.types';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  handleDateChange,
  modifyDate,
  selectedDate,
}) => {
  return (
    <div className="flex items-center justify-evenly">
      <div className="max-w-11">
        <DatePicker
          customInput={<img src={calendarIcon} alt="calendar icon" className="mt-2 cursor-pointer" />}
          selected={startDate}
          onChange={handleDateChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
        />
      </div>
      <div className="my-4 flex items-center justify-between rounded-md border px-2 py-1 text-lg text-imos-title-blue shadow">
        <button onClick={() => modifyDate('subtract')} className="cursor-pointer rounded bg-white p-2 font-semibold">
          <img className="h-2.5 w-2.5 rotate-90" src={arrowIcon} alt="right arrow icon" />
        </button>
        <span className="text-l px-5">{dayjs(selectedDate).format('DD MMM YYYY')}</span>
        <button onClick={() => modifyDate('add')} className="cursor-pointer rounded bg-white p-2 font-semibold ">
          <img className="h-2.5 w-2.5 -rotate-90" src={arrowIcon} alt="left arrow icon" />
        </button>
      </div>
    </div>
  );
};

export default DateRangePicker;
