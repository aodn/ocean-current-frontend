import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import { useShallow } from 'zustand/react/shallow';
import { useDateStore, setStartDate, setEndDate } from '@/stores/date-store/dateStore';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';

const useDateRange = () => {
  // Hooks and initial setup
  const [searchParams, setSearchParams] = useSearchParams();
  const { mainProduct } = useProductConvert();
  const { startDate, endDate } = useDateStore(
    useShallow((state) => ({
      startDate: state.startDate.toDate(),
      endDate: state.endDate?.toDate() || null,
    })),
  );

  const [allDates, setAllDates] = useState<{ date: Date; active: boolean }[]>([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);

  const urlDate = searchParams.get('date');
  const initialDate = urlDate ? dayjs(urlDate, 'YYYYMMDD').toDate() : dayjs().subtract(1, 'month').toDate();
  const isYearRange = mainProduct?.key === 'climatology';

  useEffect(() => {
    if (!isYearRange && endDate) {
      updateDateSlider(startDate, endDate);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isYearRange]);

  useEffect(() => {
    updateDateSlider(startDate);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isYearRange]);

  const generateDateRange = (start: Date, end?: Date) => {
    if (isYearRange) {
      return generateYearRange(start);
    } else {
      return generateDayRange(start, end);
    }
  };

  const generateYearRange = (start: Date) => {
    const year = dayjs(start).year();
    return Array.from({ length: 12 }, (_, index) => ({
      date: dayjs(new Date(year, index, 1)).toDate(),
      active: true,
    }));
  };

  const generateDayRange = (start: Date, end?: Date) => {
    const dates = [];
    let current = dayjs(start);
    const endDay = dayjs(end);
    while (current.isBefore(endDay) || current.isSame(endDay, 'day')) {
      dates.push({ date: current.toDate(), active: Math.random() > 0.5 });
      current = current.add(1, 'day');
    }
    return dates;
  };

  const updateDateSlider = (newStartDate: Date, newEndDate?: Date, newSelectedDate?: Date) => {
    const range = generateDateRange(newStartDate, newEndDate);
    setAllDates(range);
    setSelectedDateIndex(determineSelectedIndex(range, newStartDate, newSelectedDate));
  };

  const determineSelectedIndex = (
    range: { date: Date; active: boolean }[],
    newStartDate: Date,
    newSelectedDate?: Date,
  ) => {
    if (isYearRange) {
      return determineYearSelectedIndex(range, newStartDate, newSelectedDate);
    } else {
      return determineDaySelectedIndex(range);
    }
  };

  const determineYearSelectedIndex = (
    range: { date: Date; active: boolean }[],
    newStartDate: Date,
    newSelectedDate?: Date,
  ) => {
    if (newSelectedDate) {
      return range.findIndex(({ date }) => dayjs(date).isSame(dayjs(newSelectedDate), 'month'));
    }
    if (urlDate) {
      return dayjs(urlDate).get('month');
    }
    return dayjs(newStartDate).get('month');
  };

  const determineDaySelectedIndex = (range: { date: Date; active: boolean }[]) => {
    const initialIndex = range.findIndex(({ date }) => dayjs(date).isSame(dayjs(initialDate), 'day'));
    return initialIndex !== -1 ? initialIndex : range.length - 1;
  };

  const handleSliderChange = (newValue: number) => {
    if (newValue === selectedDateIndex) return;

    const nextActiveIndex = allDates.findIndex((_, index) => index > newValue && allDates[index].active);
    const newIndex = nextActiveIndex !== -1 ? nextActiveIndex : selectedDateIndex;
    setSelectedDateIndex(newIndex);

    const formattedDate = dayjs(allDates[newIndex].date).format('YYYYMMDD');
    updateUrlParams(formattedDate, startDate, endDate);
  };

  const modifyDate = (modificationType: 'add' | 'subtract') => {
    const { newStartDate, newEndDate, newIndex } = calculateNewDates(modificationType);

    const newRange = generateDateRange(newStartDate, newEndDate!);
    setStartDate(dayjs(newStartDate));
    setEndDate(dayjs(newEndDate));
    setAllDates(newRange);
    setSelectedDateIndex(newIndex);
    updateUrlParams(dayjs(newRange[newIndex].date).format('YYYYMMDD'), newStartDate, newEndDate!);
  };

  const calculateNewDates = (modificationType: 'add' | 'subtract') => {
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
      const step = modificationType === 'add' ? 1 : -1;
      do {
        newIndex += step;
      } while (newIndex >= 0 && newIndex < allDates.length && !allDates[newIndex].active);
    }

    return { newStartDate, newEndDate, newIndex };
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;

    setStartDate(start ? dayjs(start) : dayjs());
    setEndDate(end ? dayjs(end) : null);
    if (start && end) {
      updateDateSlider(start, end);
      updateUrlParams(dayjs(end).format('YYYYMMDD'), start, end);
    }
  };

  const handleYearDateChange = (date: Date) => {
    const startDate = dayjs(date).startOf('year');
    const endDate = dayjs(date).endOf('year');

    setStartDate(startDate);
    setEndDate(endDate);

    updateDateSlider(startDate.toDate(), endDate.toDate(), date);
    updateUrlParams(dayjs(date).format('YYYYMMDD'), startDate, endDate);
  };

  const updateUrlParams = (newDate: string, newStartDate: Date | Dayjs, newEndDate: Date | Dayjs | null) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('date', newDate);
    newSearchParams.set('startDate', dayjs(newStartDate).format('YYYYMMDD'));
    newSearchParams.set('endDate', dayjs(newEndDate).format('YYYYMMDD'));
    setSearchParams(newSearchParams);
  };

  const isSelectedDayYesterdayOrLater = () =>
    dayjs(allDates[selectedDateIndex]?.date).isSameOrAfter(dayjs().subtract(1, 'day'), 'day');

  const isLastMonth = () => dayjs(allDates[selectedDateIndex]?.date).month() === 11;

  return {
    startDate,
    endDate,
    allDates,
    selectedDateIndex,
    handleSliderChange,
    handleDateChange,
    modifyDate,
    handleYearDateChange,
    isSelectedDayYesterdayOrLater,
    isLastMonth,
    steps: 1,
  };
};

export default useDateRange;
