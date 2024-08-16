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
  DateItem,
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

  const isYearRange = mainProduct?.key === 'climatology' || mainProduct?.key === 'monthlyMeans';
  const isMonthlyMeansAnomalies = mainProduct?.key === 'monthlyMeans' && subProduct?.key === 'monthlyMeans-anomalies';
  const isFourHourSst = mainProduct?.key === 'fourHourSst';
  const isSurfaceWaves = mainProduct?.key === 'surfaceWaves';
  const isWeakRange = isFourHourSst || isSurfaceWaves;

  const urlDate = searchParams.get('date');
  const urlStartDate = searchParams.get('startDate');
  const urlEndDate = searchParams.get('endDate');
  const formatDate = isWeakRange ? 'YYYYMMDDHH' : 'YYYYMMDD';

  const getInitialDate = (): Date => {
    if (urlDate) {
      return dayjs(urlDate, formatDate).toDate();
    }
    if (isYearRange) {
      return dayjs().startOf('year').toDate();
    }
    if (isWeakRange) {
      return dayjs().subtract(1, 'week').toDate();
    }
    return dayjs().subtract(1, 'month').toDate();
  };

  const initialDate = getInitialDate();

  const disableVideoCreation = (): boolean => {
    const fourHourSst = mainProduct?.key === 'fourHourSst' && subProduct?.key === 'fourHourSst-sstAge';
    const isMonthlyMeansClimatology =
      subProduct?.key === 'monthlyMeans-CLIM_OFAM3_SSTAARS' || subProduct?.key === 'monthlyMeans-CLIM_CNESCARS';
    const climatology = mainProduct?.key === 'climatology';
    const isAdjustedSeaLevelAnomalyWithSST = mainProduct?.key === 'adjustedSeaLevelAnomaly' && !subProduct?.key;
    return climatology || isMonthlyMeansClimatology || fourHourSst || isAdjustedSeaLevelAnomalyWithSST;
  };

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
      } else if (isWeakRange) {
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
    updateDateSlider(start.toDate(), end.toDate(), urlDate ? dayjs(urlDate, formatDate).toDate() : undefined);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isYearRange, isFourHourSst, mainProduct, subProduct, urlDate, urlStartDate, urlEndDate, formatDate]);

  const generateDateRange = (start: Date, end?: Date): DateRange => {
    if (isYearRange) return generateYearRange(start);
    if (isFourHourSst) return generateDayWithHourRange(start, 2, 4, end);
    if (isSurfaceWaves) return generateDayWithHourRange(start, 2, 2, end);
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

  const generateDayWithHourRange = (start: Date, startHour: number, scale: number, end?: Date): DateRange => {
    const dates = [];
    let current = dayjs(start);
    const endDay = dayjs(end);

    while (current.isBefore(endDay) || current.isSame(endDay, 'day')) {
      for (let hour = startHour; hour < 24; hour += scale) {
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
    return determineDaySelectedIndex(range, newSelectedDate);
  };

  const determineYearSelectedIndex = (range: DateRange, newStartDate: Date, newSelectedDate?: Date) => {
    if (newSelectedDate) {
      return range.findIndex(({ date }) => dayjs(date).isSame(dayjs(newSelectedDate), 'month'));
    }
    if (urlDate) {
      return dayjs(urlDate, formatDate).get('month');
    }
    return dayjs(newStartDate).get('month');
  };

  const determineDaySelectedIndex = (range: DateRange, newSelectedDate?: Date) => {
    if (newSelectedDate) {
      const selectedIndex = range.findIndex(({ date }) =>
        dayjs(date).isSame(dayjs(newSelectedDate), isWeakRange ? 'hour' : 'day'),
      );
      return selectedIndex !== -1 ? selectedIndex : 0;
    }
    const initialIndex = range.findIndex(({ date }) =>
      dayjs(date).isSame(dayjs(initialDate), isWeakRange ? 'hour' : 'day'),
    );
    return initialIndex !== -1 ? initialIndex : 0;
  };

  const handleSliderChange: SliderChangeHandler = (newValue) => {
    const modificationType = newValue > selectedDateIndex ? 'add' : 'subtract';
    modifyDate(modificationType, newValue);
  };

  const modifyDate = (modificationType: ModificationType, newValue?: number) => {
    const { newStartDate, newEndDate, newIndex } = calculateNewDates(modificationType, newValue);

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

  const calculateNewDates = (modificationType: ModificationType, newValue?: number): CalculatedDates => {
    const isSubtracting = modificationType === 'subtract';
    const isAdding = modificationType === 'add';

    const isAtStart = selectedDateIndex === 0;
    const isAtEnd = selectedDateIndex === allDates.length - 1;

    let newStartDate = dayjs(startDate);
    let newEndDate = dayjs(endDate);
    let newIndex = newValue !== undefined ? newValue : selectedDateIndex;

    if (isSubtracting && isAtStart) {
      newStartDate = newStartDate.subtract(1, 'day');
    } else if (isAdding && isAtEnd) {
      newEndDate = newEndDate.add(1, 'day');
      newIndex++;
    } else if (newValue !== undefined) {
      newIndex = findNextActiveIndex(modificationType, newValue);
    } else {
      newIndex = findNextActiveIndex(modificationType);
    }

    return {
      newStartDate: newStartDate.toDate(),
      newEndDate: newEndDate.toDate(),
      newIndex,
    };
  };

  const findNextActiveIndex = (modificationType: ModificationType, newValue?: number): number => {
    const step = modificationType === 'add' ? 1 : -1;
    let index = newValue !== undefined ? newValue : selectedDateIndex + step;

    while (index >= 0 && index < allDates.length) {
      if (allDates[index].active) {
        return index;
      }
      index += step;
    }

    return selectedDateIndex;
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

  const resetDateRange = () => {
    const { start, end } = getInitialDateRange();

    setStartDate(start);
    setEndDate(end);
    updateDateSlider(start.toDate(), end.toDate());

    const lastActiveIndex = findLastActiveIndex(allDates);
    setSelectedDateIndex(lastActiveIndex);

    const formattedDate = end.format(formatDate);
    updateUrlParams(formattedDate, start.toDate(), end.toDate());
  };

  const findLastActiveIndex = (dates: DateItem[]) => {
    for (let i = dates.length - 1; i >= 0; i--) {
      if (dates[i].active) {
        return i;
      }
    }
    return 0;
  };

  const getInitialDateRange = () => {
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
    isSurfaceWaves,
    resetDateRange,
    disableVideoCreation,
    formatDate,
  };
};

export default useDateRange;
