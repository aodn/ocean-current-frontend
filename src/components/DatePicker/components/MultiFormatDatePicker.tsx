import React, { useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { DateFormat, DateItem } from '@/types/date';
import { getDateFormatFlags } from '@/utils/date-utils/date';
import CustomInputMobile from './CustomInputMobile';
import CustomInput from './CustomInput';

interface DateRangeResult {
  missingDates: Date[];
  firstDate: Date;
  lastDate: Date;
}
const findDateRangeInfo = (dates: string[], format: DateFormat): DateRangeResult => {
  if (dates.length === 0) {
    return { missingDates: [], firstDate: new Date(), lastDate: new Date() };
  }

  const sortedDates = [...dates].sort();

  const firstDateStr = sortedDates[0];
  const lastDateStr = sortedDates[sortedDates.length - 1];

  const firstDate = dayjs(firstDateStr, format);
  const lastDate = dayjs(lastDateStr, format);

  const daysWithData = new Set<string>();

  dates.forEach((dateStr) => {
    const date = dayjs(dateStr, format);
    const dayStr = date.format(DateFormat.DAY);
    daysWithData.add(dayStr);
  });

  const missingDates: Date[] = [];

  let currentDate = firstDate.startOf('day');
  const endDate = lastDate.endOf('day');

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
    const dayStr = currentDate.format(DateFormat.DAY);

    if (!daysWithData.has(dayStr)) {
      missingDates.push(currentDate.toDate());
    }

    currentDate = currentDate.add(1, 'day');
  }

  return { missingDates, firstDate: firstDate.toDate(), lastDate: lastDate.toDate() };
};

interface MultiFormatDatePickerProps {
  dateFormat: DateFormat;
  dateList: DateItem[];
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  isMobile?: boolean;
}

const MultiFormatDatePicker: React.FC<MultiFormatDatePickerProps> = ({
  dateFormat,
  dateList = [],
  selectedDate,
  onChange,
  isMobile = false,
}) => {
  const { isMonthFormat, isMonthOnlyFormat, isYearFormat } = getDateFormatFlags(dateFormat);

  const { missingDates, firstDate, lastDate } = useMemo(() => {
    return findDateRangeInfo(
      dateList.map(({ date }) => date),
      dateFormat,
    );
  }, [dateList, dateFormat]);

  if (isMonthFormat) {
    return (
      <DatePicker
        customInput={isMobile ? <CustomInputMobile /> : <CustomInput />}
        selected={selectedDate}
        onChange={onChange}
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
        onChange={onChange}
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
        onChange={onChange}
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
        onChange={onChange}
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
      onChange={onChange}
      showYearDropdown
      showMonthDropdown
      dropdownMode="select"
    />
  );
};

export default MultiFormatDatePicker;
