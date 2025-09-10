import React, { useMemo } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { DateFormat } from '@/types/date';
import { getDateFormatFlags } from '@/utils/date-utils/date';
import { isHourlyFormat, findFirstHourlyDateForDay } from '@/utils/date-utils/hourly';
import { findDateRangeInfo } from '../utils';
import { MultiFormatDatePickerProps } from '../types/multiFormatDatePicker.types';
import CustomInputMobile from './CustomInputMobile';
import CustomInput from './CustomInput';
import MonthOnlyHeader from './MonthOnlyHeader';

// Threshold for switching from includeDates to excludeDates strategy for performance
const LARGE_DATE_LIST_THRESHOLD = 500;

const MultiFormatDatePicker: React.FC<MultiFormatDatePickerProps> = ({
  dateFormat,
  dateList = [],
  selectedDate,
  onChange,
  isMobile = false,
  isDisabled = false,
  startDate, //startDate and endDate have the highest priority; if they exist, they will overwrite dateList.
  endDate,
}) => {
  const { isMonthFormat, isMonthOnlyFormat, isYearFormat } = getDateFormatFlags(dateFormat);
  const isHourly = isHourlyFormat(dateFormat);

  const { missingDates, firstDate, lastDate } = useMemo(() => {
    if (dateList.length >= LARGE_DATE_LIST_THRESHOLD) {
      return findDateRangeInfo(
        dateList.map(({ date }) => date),
        dateFormat,
      );
    }

    const dates = dateList.map(({ date }) => date);
    if (dates.length === 0) {
      return { missingDates: [], firstDate: new Date(), lastDate: new Date() };
    }

    const sortedDates = [...dates].sort();
    const firstDateStr = sortedDates[0];
    const lastDateStr = sortedDates[sortedDates.length - 1];

    return {
      missingDates: [],
      firstDate: dayjs(firstDateStr, dateFormat).toDate(),
      lastDate: dayjs(lastDateStr, dateFormat).toDate(),
    };
  }, [dateList, dateFormat]);

  const handleDateChange = (date: Date | null) => {
    if (isDisabled) return;

    if (date && isHourly) {
      const selectedDay = dayjs(date).format(DateFormat.DAY);

      const firstHourlyDate = findFirstHourlyDateForDay(
        dateList.map(({ date }) => date),
        selectedDay,
        dateFormat,
      );
      if (firstHourlyDate) {
        onChange(dayjs(firstHourlyDate, dateFormat).toDate());
      }
      return;
    }
    onChange(date);
  };

  if (isMonthFormat) {
    return (
      <ReactDatePicker
        customInput={isMobile ? <CustomInputMobile disabled={isDisabled} /> : <CustomInput disabled={isDisabled} />}
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
        customInput={isMobile ? <CustomInputMobile disabled={isDisabled} /> : <CustomInput disabled={isDisabled} />}
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
        customInput={isMobile ? <CustomInputMobile disabled={isDisabled} /> : <CustomInput disabled={isDisabled} />}
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

  if (dateList.length < LARGE_DATE_LIST_THRESHOLD) {
    return (
      <ReactDatePicker
        customInput={isMobile ? <CustomInputMobile disabled={isDisabled} /> : <CustomInput disabled={isDisabled} />}
        selected={selectedDate}
        minDate={startDate || firstDate}
        maxDate={endDate || lastDate}
        includeDates={startDate && endDate ? undefined : dateList.map(({ date }) => dayjs(date, dateFormat).toDate())}
        onChange={handleDateChange}
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
        disabled={isDisabled}
      />
    );
  }

  return (
    <ReactDatePicker
      customInput={isMobile ? <CustomInputMobile disabled={isDisabled} /> : <CustomInput disabled={isDisabled} />}
      selected={selectedDate}
      minDate={startDate || firstDate}
      maxDate={endDate || lastDate}
      excludeDates={startDate && endDate ? undefined : missingDates}
      onChange={handleDateChange}
      showYearDropdown
      showMonthDropdown
      dropdownMode="select"
      disabled={isDisabled}
    />
  );
};

export default MultiFormatDatePicker;
