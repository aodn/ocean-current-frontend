import React, { useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { DateFormat } from '@/types/date';
import { getDateFormatFlags } from '@/utils/date-utils/date';
import { isHourlyFormat, findFirstHourlyDateForDay } from '@/utils/date-utils/hourly';
import { findDateRangeInfo } from '../utils';
import { MultiFormatDatePickerProps } from '../types/multiFormatDatePicker.types';
import CustomInputMobile from './CustomInputMobile';
import CustomInput from './CustomInput';

const MultiFormatDatePicker: React.FC<MultiFormatDatePickerProps> = ({
  dateFormat,
  dateList = [],
  selectedDate,
  onChange,
  isMobile = false,
}) => {
  const { isMonthFormat, isMonthOnlyFormat, isYearFormat } = getDateFormatFlags(dateFormat);
  const isHourly = isHourlyFormat(dateFormat);

  const { missingDates, firstDate, lastDate } = useMemo(() => {
    return findDateRangeInfo(
      dateList.map(({ date }) => date),
      dateFormat,
    );
  }, [dateList, dateFormat]);

  const handleDateChange = (date: Date | null) => {
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
      <DatePicker
        customInput={isMobile ? <CustomInputMobile /> : <CustomInput />}
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        showTwoColumnMonthYearPicker
      />
    );
  }

  if (isMonthOnlyFormat) {
    return (
      <DatePicker
        customInput={isMobile ? <CustomInputMobile /> : <CustomInput />}
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM"
        showYearDropdown
        showMonthYearPicker
        showTwoColumnMonthYearPicker
      />
    );
  }

  if (isYearFormat) {
    return (
      <DatePicker
        customInput={isMobile ? <CustomInputMobile /> : <CustomInput />}
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy"
        showYearPicker
      />
    );
  }

  if (dateList.length < 500) {
    return (
      <DatePicker
        customInput={isMobile ? <CustomInputMobile /> : <CustomInput />}
        selected={selectedDate}
        minDate={firstDate}
        maxDate={lastDate}
        includeDates={dateList.map(({ date }) => dayjs(date, dateFormat).toDate())}
        onChange={handleDateChange}
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
      />
    );
  }

  return (
    <DatePicker
      customInput={isMobile ? <CustomInputMobile /> : <CustomInput />}
      selected={selectedDate}
      minDate={firstDate}
      maxDate={lastDate}
      excludeDates={missingDates}
      onChange={handleDateChange}
      showYearDropdown
      showMonthDropdown
      dropdownMode="select"
    />
  );
};

export default MultiFormatDatePicker;
