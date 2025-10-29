import React, { useMemo } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { DateFormat } from '@/types/date';
import { getDateFormatFlags } from '@/utils/date-utils/date';
import { findFirstDateTimeForSelectedDay } from '@/utils/date-utils/hourly';
import { MultiFormatDatePickerProps } from '../types/multiFormatDatePicker.types';
import CustomInput from './CustomInput';
import MonthOnlyHeader from './MonthOnlyHeader';

const MultiFormatDatePicker: React.FC<MultiFormatDatePickerProps> = ({
  dateFormat,
  dateList = [],
  selectedDate,
  onChange,
  isDisabled = false,
  startDate, //startDate and endDate have the highest priority; if they exist, they will overwrite dateList.
  endDate,
}) => {
  const { isMonthFormat, isMonthOnlyFormat, isYearFormat, isHourFormat, isMinuteFormat } =
    getDateFormatFlags(dateFormat);

  const { availableDatesSet, firstDate, lastDate } = useMemo(() => {
    const dates = dateList.map(({ date }) => date);
    if (dates.length === 0) {
      return { availableDatesSet: new Set<string>(), firstDate: new Date(), lastDate: new Date() };
    }

    const sortedDates = [...dates].sort();
    const firstDateStr = sortedDates[0];
    const lastDateStr = sortedDates[sortedDates.length - 1];

    const availableDatesSet = new Set<string>();
    dates.forEach((dateStr) => {
      const date = dayjs(dateStr, dateFormat);
      const dayStr = date.format(DateFormat.DAY);
      availableDatesSet.add(dayStr);
    });

    return {
      availableDatesSet,
      firstDate: dayjs(firstDateStr, dateFormat).toDate(),
      lastDate: dayjs(lastDateStr, dateFormat).toDate(),
    };
  }, [dateList, dateFormat]);

  const filterAvailableDate = (date: Date): boolean => {
    const dayStr = dayjs(date).format(DateFormat.DAY);
    return availableDatesSet.has(dayStr);
  };

  const handleDateChange = (date: Date | null) => {
    if (isDisabled) return;

    if (date && (isHourFormat || isMinuteFormat)) {
      const selectedDay = dayjs(date).format(DateFormat.DAY);

      const firstDateTime = findFirstDateTimeForSelectedDay(
        dateList.map(({ date }) => date),
        selectedDay,
        dateFormat,
      );
      if (firstDateTime) {
        onChange(dayjs(firstDateTime, dateFormat).toDate());
      }
      return;
    }
    onChange(date);
  };

  if (isMonthFormat) {
    return (
      <ReactDatePicker
        customInput={<CustomInput disabled={isDisabled} />}
        selected={selectedDate}
        onChange={handleDateChange}
        minDate={startDate || firstDate}
        maxDate={endDate || lastDate}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        showTwoColumnMonthYearPicker
        disabled={isDisabled}
      />
    );
  }

  if (isMonthOnlyFormat) {
    return (
      <ReactDatePicker
        customInput={<CustomInput disabled={isDisabled} />}
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM"
        showMonthYearPicker
        renderCustomHeader={({ date }) => <MonthOnlyHeader date={date} />}
        disabled={isDisabled}
      />
    );
  }

  if (isYearFormat) {
    return (
      <ReactDatePicker
        customInput={<CustomInput disabled={isDisabled} />}
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy"
        minDate={startDate || firstDate}
        maxDate={endDate || lastDate}
        showYearPicker
        disabled={isDisabled}
      />
    );
  }

  return (
    <ReactDatePicker
      customInput={<CustomInput disabled={isDisabled} />}
      selected={selectedDate}
      minDate={startDate || firstDate}
      maxDate={endDate || lastDate}
      filterDate={startDate && endDate ? undefined : filterAvailableDate}
      onChange={handleDateChange}
      showYearDropdown
      showMonthDropdown
      dropdownMode="select"
      disabled={isDisabled}
    />
  );
};

export default MultiFormatDatePicker;
