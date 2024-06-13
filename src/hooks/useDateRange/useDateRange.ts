import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';

const useDateRange = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlDate = searchParams.get('date');
  const urlStartDate = searchParams.get('startDate');
  const urlEndDate = searchParams.get('endDate');

  const initialDate = urlDate ? dayjs(urlDate, 'YYYYMMDD').toDate() : dayjs().subtract(1, 'month').toDate();
  const initialStartDate = urlStartDate
    ? dayjs(urlStartDate, 'YYYYMMDD').toDate()
    : dayjs(initialDate).subtract(1, 'month').toDate();
  const initialEndDate = urlEndDate ? dayjs(urlEndDate, 'YYYYMMDD').toDate() : initialDate;

  const steps: number = 1;

  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate);
  const [allDates, setAllDates] = useState<Date[]>([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);

  useEffect(() => {
    if (endDate) {
      const range = generateDateRange(startDate, endDate);
      setAllDates(range);
      const initialIndex = range.findIndex((date) => dayjs(date).isSame(dayjs(initialDate), 'day'));
      setSelectedDateIndex(initialIndex !== -1 ? initialIndex : range.length - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  const generateDateRange = (start: Date, end: Date) => {
    const dates = [];
    let current = dayjs(start);
    const endDay = dayjs(end);

    while (current.isBefore(endDay) || current.isSame(endDay, 'day')) {
      dates.push(current.toDate());
      current = current.add(1, 'day');
    }

    return dates;
  };

  const handleSliderChange = (newValue: number) => {
    if (newValue === selectedDateIndex) return;
    setSelectedDateIndex(newValue);
    const formattedDate = dayjs(allDates[newValue]).format('YYYYMMDD');
    updateUrlParams(formattedDate, startDate, endDate);
  };

  const updateUrlParams = (newDate: string, newStartDate: Date, newEndDate: Date | null) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('date', newDate);
    newSearchParams.set('startDate', dayjs(newStartDate).format('YYYYMMDD'));
    newSearchParams.set('endDate', dayjs(newEndDate).format('YYYYMMDD'));
    setSearchParams(newSearchParams);
  };

  const modifyDate = (modificationType: 'add' | 'subtract') => {
    let newStartDate = startDate;
    let newEndDate = endDate;
    let newIndex = selectedDateIndex;

    const isSubtractingAndAtStart = modificationType === 'subtract' && selectedDateIndex === 0;
    const isAddingAndAtEnd = modificationType === 'add' && selectedDateIndex === allDates.length - 1;

    if (isSubtractingAndAtStart) {
      newStartDate = dayjs(startDate).subtract(1, 'day').toDate();
    } else if (isAddingAndAtEnd) {
      newEndDate = dayjs(endDate).add(1, 'day').toDate();
      newIndex = newIndex + 1;
    } else {
      newIndex = modificationType === 'add' ? selectedDateIndex + 1 : selectedDateIndex - 1;
    }

    const newRange = generateDateRange(newStartDate, newEndDate!);
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setAllDates(newRange);
    setSelectedDateIndex(newIndex);
    updateUrlParams(dayjs(newRange[newIndex]).format('YYYYMMDD'), newStartDate, newEndDate!);
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start || new Date());
    setEndDate(end);
    if (start && end) {
      updateUrlParams(dayjs(start).format('YYYYMMDD'), start, end);
    }
  };

  return {
    startDate,
    endDate,
    allDates,
    selectedDateIndex,
    handleSliderChange,
    handleDateChange,
    modifyDate,
    steps,
  };
};

export default useDateRange;
