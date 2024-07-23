import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import { useShallow } from 'zustand/react/shallow';
import { useArgoStore } from '@/stores/argo-store/argoStore';
import { useDateStore, setStartDate, setEndDate } from '@/stores/date-store/dateStore';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import {
  DateRange,
  DateStoreState,
  UseDateRangeReturn,
  CalculatedDates,
  ModificationType,
  DateChangeHandler,
  YearDateChangeHandler,
  SliderChangeHandler,
} from './types/useDateRange.types';

const useDateRange = (): UseDateRangeReturn => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { mainProduct, subProduct } = useProductConvert();
  const { isArgo } = useProductCheck();
  const { startDate, endDate } = useDateStore(
    useShallow((state: DateStoreState) => ({
      startDate: state.startDate.toDate(),
      endDate: state.endDate?.toDate() || null,
    })),
  );

  const useArgoProfileCycles = useArgoStore((state) => state.argoProfileCycles);
  const useWmoid = useArgoStore((state) => state.selectedArgoParams.worldMeteorologicalOrgId);

  const [allDates, setAllDates] = useState<DateRange>([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);

  const urlDate = searchParams.get('date');
  const initialDate = urlDate ? dayjs(urlDate, 'YYYYMMDDHH').toDate() : dayjs().subtract(1, 'month').toDate();
  const isYearRange = mainProduct?.key === 'climatology' || mainProduct?.key === 'monthlyMeans';
  const isMonthlyMeansAnomalies = mainProduct?.key === 'monthlyMeans' && subProduct?.key === 'monthlyMeans-anomalies';
  const isMonthlyMeansClimatology =
    subProduct?.key === 'monthlyMeans-CLIM_OFAM3_SSTAARS' || subProduct?.key === 'monthlyMeans-CLIM_CNESCARS';
  const isFourHourSst = mainProduct?.key === 'fourHourSst';
  const formatDate = isFourHourSst ? 'YYYYMMDDHH' : 'YYYYMMDD';

  const getMinMaxDate = () => {
    let minDate: Date | null = null;
    let maxDate: Date | null = null;

    if (isArgo && useWmoid) {
      const cycleDateTimestamps = useArgoProfileCycles.map(({ date }) => Number(date));
      const minTimestamp = Math.min(...cycleDateTimestamps);
      const maxTimestamp = Math.max(...cycleDateTimestamps);
      minDate = dayjs(minTimestamp.toString()).toDate();
      maxDate = dayjs(maxTimestamp.toString()).toDate();
    }
    return { minDate, maxDate };
  };

  const { minDate, maxDate } = getMinMaxDate();

  useEffect(() => {
    if (isArgo && endDate) {
      updateDateSlider(startDate, endDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isArgo, useArgoProfileCycles.length, useWmoid]);

  useEffect(() => {
    const getDateRange = () => {
      if (isYearRange) {
        return {
          start: dayjs().startOf('year'),
          end: dayjs().endOf('year'),
        };
      } else if (isFourHourSst) {
        return {
          start: dayjs().subtract(1, 'week'),
          end: dayjs(),
        };
      } else {
        return {
          start: dayjs().subtract(1, 'month'),
          end: dayjs(),
        };
      }
    };

    const { start, end } = getDateRange();

    setStartDate(start);
    setEndDate(end);
    updateDateSlider(start.toDate(), end.toDate());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isYearRange, isFourHourSst]);

  const generateDateRange = (start: Date, end?: Date): DateRange => {
    if (isYearRange) return generateYearRange(start);
    if (isFourHourSst) return generateDayWithHourRange(start, end);
    return generateDayRange(start, end);
  };

  const generateYearRange = (start: Date): DateRange => {
    const year = dayjs(start).year();
    const currentMonth = dayjs().month();
    const currentYear = dayjs().year();

    return Array.from({ length: 12 }, (_, index) => ({
      date: dayjs(new Date(year, index, 15)).toDate(),
      active: !(isMonthlyMeansAnomalies && year === currentYear && index >= currentMonth),
      showLabel: true,
    }));
  };

  const generateDayRange = (start: Date, end?: Date): DateRange => {
    const dates = [];
    let current = dayjs(start);
    const endDay = dayjs(end);
    let dayCounter = 0;

    while (current.isBefore(endDay) || current.isSame(endDay, 'day')) {
      let isActive = true;
      if (isArgo && useArgoProfileCycles.length > 0) {
        isActive = useArgoProfileCycles.some((cycle) => dayjs(cycle.date).isSame(current, 'day'));
      }
      dates.push({
        date: current.toDate(),
        active: isActive,
        showLabel: dayCounter % 7 === 0,
      });
      current = current.add(1, 'day');
      dayCounter++;
    }

    return dates;
  };

  const generateDayWithHourRange = (start: Date, end?: Date): DateRange => {
    const dates = [];
    let current = dayjs(start);
    const endDay = dayjs(end);

    while (current.isBefore(endDay) || current.isSame(endDay, 'day')) {
      for (let hour = 2; hour < 24; hour += 4) {
        const dateWithHour = dayjs(current).hour(hour).minute(0).second(0).millisecond(0);
        dates.push({
          date: dateWithHour.toDate(),
          active: true,
          showLabel: hour === 2,
        });
      }
      current = current.add(1, 'day');
    }

    return dates;
  };

  const updateDateSlider = (newStartDate: Date, newEndDate?: Date, newSelectedDate?: Date) => {
    const range = generateDateRange(newStartDate, newEndDate);
    setAllDates(range);
    const newIndex = determineSelectedIndex(range, newStartDate, newSelectedDate);
    setSelectedDateIndex(newIndex !== -1 ? newIndex : 0);
  };

  const determineSelectedIndex = (range: DateRange, newStartDate: Date, newSelectedDate?: Date) => {
    if (isYearRange) return determineYearSelectedIndex(range, newStartDate, newSelectedDate);
    return determineDaySelectedIndex(range);
  };

  const determineYearSelectedIndex = (range: DateRange, newStartDate: Date, newSelectedDate?: Date) => {
    if (newSelectedDate) {
      return range.findIndex(({ date }) => dayjs(date).isSame(dayjs(newSelectedDate), 'month'));
    }
    if (urlDate) {
      return dayjs(urlDate).get('month');
    }
    return dayjs(newStartDate).get('month');
  };

  const determineDaySelectedIndex = (range: DateRange) => {
    const initialIndex = range.findIndex(({ date }) => dayjs(date).isSame(dayjs(initialDate), 'day'));
    return initialIndex !== -1 ? initialIndex : 0;
  };

  const handleSliderChange: SliderChangeHandler = (newValue) => {
    if (newValue === selectedDateIndex || newValue < 0 || newValue >= allDates.length) return;

    const nextActiveIndex = allDates.findIndex((_, index) => index > newValue && allDates[index].active);
    const newIndex = nextActiveIndex !== -1 ? nextActiveIndex : selectedDateIndex;
    setSelectedDateIndex(newIndex);

    const formattedDate = dayjs(allDates[newIndex].date).format(formatDate);
    updateUrlParams(formattedDate, startDate, endDate);
  };

  const modifyDate = (modificationType: ModificationType) => {
    const { newStartDate, newEndDate, newIndex } = calculateNewDates(modificationType);

    if (newIndex !== selectedDateIndex) {
      const newRange = generateDateRange(newStartDate, newEndDate!);
      setStartDate(dayjs(newStartDate));
      setEndDate(dayjs(newEndDate));
      setAllDates(newRange);
      setSelectedDateIndex(newIndex);

      const formattedDate = dayjs(newRange[newIndex].date).format(formatDate);
      updateUrlParams(formattedDate, newStartDate, newEndDate!);
    }
  };

  const calculateNewDates = (modificationType: ModificationType): CalculatedDates => {
    let newStartDate = startDate;
    let newEndDate = endDate;
    let newIndex = selectedDateIndex;

    const isSubtractingAndAtStart = modificationType === 'subtract' && selectedDateIndex === 0;
    const isAddingAndAtEnd = modificationType === 'add' && selectedDateIndex === allDates.length - 1;

    if (isSubtractingAndAtStart) {
      // Check if the previous day is active before subtracting
      const previousDay = dayjs(startDate).subtract(1, 'day').toDate();
      const previousDayActive = allDates.some((date) => dayjs(date.date).isSame(previousDay, 'day') && date.active);
      if (previousDayActive) {
        newStartDate = previousDay;
        newIndex = 0; // The new date will be at the start of the range
      }
    } else if (isAddingAndAtEnd) {
      // Check if the next day is active before adding
      const nextDay = dayjs(endDate).add(1, 'day').toDate();
      const nextDayActive = allDates.some((date) => dayjs(date.date).isSame(nextDay, 'day') && date.active);
      if (nextDayActive) {
        newEndDate = nextDay;
        newIndex = allDates.length; // The new date will be at the end of the range
      }
    } else {
      const step = modificationType === 'add' ? 1 : -1;
      let foundActive = false;
      while (newIndex + step >= 0 && newIndex + step < allDates.length && !foundActive) {
        newIndex += step;
        if (allDates[newIndex].active) {
          foundActive = true;
        }
      }
      if (!foundActive) {
        newIndex = selectedDateIndex; // If no active date found, stay at the current index
      }
    }

    return { newStartDate, newEndDate, newIndex };
  };

  const handleDateChange: DateChangeHandler = (dates) => {
    const [start, end] = dates;

    setStartDate(start ? dayjs(start) : dayjs());
    setEndDate(end ? dayjs(end) : null);
    if (start && end) {
      updateDateSlider(start, end);
      updateUrlParams(dayjs(end).format(formatDate), start, end);
    }
  };

  const handleYearDateChange: YearDateChangeHandler = (date) => {
    const startDate = dayjs(date).startOf('year');
    const endDate = dayjs(date).endOf('year');

    setStartDate(startDate);
    setEndDate(endDate);

    updateDateSlider(startDate.toDate(), endDate.toDate(), date);

    const formattedDate = dayjs(date).format(formatDate);
    updateUrlParams(formattedDate, startDate, endDate);
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

  const isLastMonthOfTheYear = () => dayjs(allDates[selectedDateIndex]?.date).month() === 11;

  const setYesterdayAsSelected = () => {
    const lastIndex = allDates.length - 1;
    let activeIndex = -1;

    for (let i = lastIndex; i >= 0; i--) {
      if (allDates[i].active) {
        activeIndex = i;
        break;
      }
    }

    if (activeIndex !== -1) {
      setSelectedDateIndex(activeIndex);
      const lastDate = allDates[activeIndex].date;
      updateUrlParams(dayjs(lastDate).format(formatDate), startDate, endDate);
    }
  };

  return {
    startDate,
    endDate,
    minDate,
    maxDate,
    allDates,
    selectedDateIndex,
    handleSliderChange,
    handleDateChange,
    modifyDate,
    handleYearDateChange,
    isSelectedDayYesterdayOrLater,
    isLastMonthOfTheYear,
    steps: 1,
    isFourHourSst,
    isYearRange,
    setYesterdayAsSelected,
    isMonthlyMeansClimatology,
  };
};

export default useDateRange;
