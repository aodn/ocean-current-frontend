import React, { useMemo, useCallback } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { DateFormat } from '@/types/date';
import { getDateFormatFlags } from '@/utils/date-utils/date';
import { findFirstDateTimeForSelectedDay } from '@/utils/date-utils/hourly';
import { MultiFormatDatePickerProps } from '../types/multiFormatDatePicker.types';
import CustomInput from './CustomInput';
import MonthOnlyHeader from './MonthOnlyHeader';

/**
 * startDate and endDate have the highest priority; if they exist, they will ignore dateList and the available dates will be determined by startDate and endDate instead of dateList.
 * otherwise, dateList will be used to determine available dates.
 */
const MultiFormatDatePicker: React.FC<MultiFormatDatePickerProps> = ({
  dateFormat,
  dateList = [],
  selectedDate,
  onChange,
  isDisabled = false,
  startDate,
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

  const filterAvailableDate = useCallback(
    (date: Date): boolean => {
      const dayStr = dayjs(date).format(DateFormat.DAY);
      return availableDatesSet.has(dayStr);
    },
    [availableDatesSet],
  );

  const handleDateChange = useCallback(
    (date: Date | null) => {
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
    },
    [isDisabled, isHourFormat, isMinuteFormat, dateList, dateFormat, onChange],
  );

  const datePickerProps = useMemo(() => {
    const hasDateRange = startDate && endDate;
    const baseProps = {
      customInput: <CustomInput disabled={isDisabled} />,
      selected: selectedDate,
      onChange: handleDateChange,
      disabled: isDisabled,
      filterDate: hasDateRange ? undefined : filterAvailableDate,
    };

    if (isMonthFormat) {
      return {
        ...baseProps,
        dateFormat: 'MM/yyyy',
        minDate: startDate || firstDate,
        maxDate: endDate || lastDate,
        showMonthYearPicker: true,
        showTwoColumnMonthYearPicker: true,
      };
    }

    if (isMonthOnlyFormat) {
      return {
        ...baseProps,
        dateFormat: 'MM',
        showMonthYearPicker: true,
        renderCustomHeader: ({ date }: { date: Date }) => <MonthOnlyHeader date={date} />,
      };
    }

    if (isYearFormat) {
      return {
        ...baseProps,
        dateFormat: 'yyyy',
        minDate: startDate || firstDate,
        maxDate: endDate || lastDate,
        showYearPicker: true,
      };
    }

    // Day format
    return {
      ...baseProps,
      minDate: startDate || firstDate,
      maxDate: endDate || lastDate,
      showYearDropdown: true,
      showMonthDropdown: true,
      dropdownMode: 'select' as const,
    };
  }, [
    isDisabled,
    selectedDate,
    handleDateChange,
    filterAvailableDate,
    isMonthFormat,
    isMonthOnlyFormat,
    isYearFormat,
    startDate,
    endDate,
    firstDate,
    lastDate,
  ]);

  return <ReactDatePicker {...datePickerProps} />;
};

export default MultiFormatDatePicker;
