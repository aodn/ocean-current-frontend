import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useShallow } from 'zustand/react/shallow';
import { useArgoStore } from '@/stores/argo-store/argoStore';
import { useDateStore, setStartDate, setEndDate } from '@/stores/date-store/dateStore';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import useProductStore from '@/stores/product-store/productStore';
import { getRegionByRegionTitle } from '@/utils/region-utils/region';
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
  const { isArgo, isCurrentMeters } = useProductCheck();
  const { startDate, endDate } = useDateStore(
    useShallow((state: DateStoreState) => ({
      startDate: state.startDate.toDate(),
      endDate: state.endDate?.toDate() || null,
    })),
  );

  const useArgoProfileCycles = useArgoStore((state) => state.argoProfileCycles);
  const useWmoid = useArgoStore((state) => state.selectedArgoParams.worldMeteorologicalOrgId);
  const useRegionTitle = useProductStore((state) => state.productParams.regionTitle);
  const region = getRegionByRegionTitle(useRegionTitle);

  const [allDates, setAllDates] = useState<DateRange>([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);

  const isMonthRange = mainProduct?.key === 'climatology' || mainProduct?.key === 'monthlyMeans';
  const isYearRange = isCurrentMeters;
  const isMonthlyMeansAnomalies = mainProduct?.key === 'monthlyMeans' && subProduct?.key === 'monthlyMeans-anomalies';
  const isFourHourSst = mainProduct?.key === 'fourHourSst';
  const isSurfaceWaves = mainProduct?.key === 'surfaceWaves';
  const isOceanColourLocal = mainProduct?.key === 'oceanColour' && region?.scope === 'local';
  const isWeekRange = isFourHourSst || isSurfaceWaves || isOceanColourLocal;

  const urlDate = searchParams.get('date');
  const formatDate = isWeekRange ? 'YYYYMMDDHH' : 'YYYYMMDD';

  const getInitialDate = (): Date => {
    if (urlDate) {
      return dayjs(urlDate, formatDate).toDate();
    }
    if (isMonthRange) {
      return dayjs().startOf('year').toDate();
    }
    if (isWeekRange) {
      return dayjs().subtract(1, 'week').toDate();
    }
    if (isYearRange) {
      return dayjs('2024-01-01').toDate();
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
    let minDate: Date | undefined;
    let maxDate: Date | undefined;

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
      if (isMonthRange) {
        return {
          start: dayjs().startOf('year'),
          end: dayjs().endOf('year'),
        };
      } else if (isWeekRange) {
        return {
          start: dayjs().subtract(1, 'week'),
          end: dayjs(),
        };
      } else if (isYearRange) {
        return {
          start: dayjs('2007-01-01'),
          end: dayjs('2024-12-31'),
        };
      } else {
        return {
          start: dayjs().subtract(1, 'month'),
          end: dayjs(),
        };
      }
    };

    const { start, end } = getDateRange();

    updateDateSlider(start.toDate(), end.toDate(), urlDate ? dayjs(urlDate, formatDate).toDate() : undefined);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMonthRange, isFourHourSst, isYearRange, mainProduct, subProduct, urlDate, formatDate]);

  const generateDateRange = (start: Date, end?: Date): DateRange => {
    if (isMonthRange) return generateYearRange(start);
    if (isYearRange) return generateYearlyRange();
    if (isFourHourSst) return generateDayWithHourRange(start, 2, 4, 24, end);
    if (isSurfaceWaves) return generateDayWithHourRange(start, 2, 2, 24, end);
    if (isOceanColourLocal) return generateDayWithHourRange(start, 4, 1, 7, end);
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

  const generateYearlyRange = (): DateRange => {
    return Array.from({ length: 18 }, (_, index) => {
      const year = 2007 + index;
      return {
        date: dayjs(`${year}-01-01`).toDate(),
        active: true,
        showLabel: true,
      };
    });
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

  const generateDayWithHourRange = (
    start: Date,
    startHour: number,
    step: number,
    endHour: number,
    end?: Date,
  ): DateRange => {
    const dates = [];
    let current = dayjs(start);
    const endDay = dayjs(end);

    while (current.isBefore(endDay) || current.isSame(endDay, 'day')) {
      for (let hour = startHour; hour < endHour; hour += step) {
        const dateWithHour = dayjs(current).hour(hour).minute(0).second(0).millisecond(0);
        dates.push({
          date: dateWithHour.toDate(),
          active: true,
          showLabel: hour === startHour,
        });
      }
      current = current.add(1, 'day');
    }

    return dates;
  };

  const updateDateSlider = (newStartDate: Date, newEndDate?: Date, newSelectedDate?: Date | null) => {
    const range = generateDateRange(newStartDate, newEndDate);
    setAllDates(range);
    const newIndex = determineSelectedIndex(range, newStartDate, newSelectedDate);
    setSelectedDateIndex(newIndex !== -1 ? newIndex : 0);
  };

  const determineSelectedIndex = (range: DateRange, newStartDate: Date, newSelectedDate?: Date | null) => {
    if (isMonthRange) return determineYearSelectedIndex(range, newStartDate, newSelectedDate);
    if (isYearRange) return determineYearlySelectedIndex(range, newSelectedDate);
    return determineDaySelectedIndex(range, newSelectedDate);
  };

  const determineYearSelectedIndex = (range: DateRange, newStartDate: Date, newSelectedDate?: Date | null) => {
    if (newSelectedDate) {
      return range.findIndex(({ date }) => dayjs(date).isSame(dayjs(newSelectedDate), 'month'));
    }
    if (urlDate) {
      return dayjs(urlDate, formatDate).get('month');
    }
    return dayjs(newStartDate).get('month');
  };

  const determineYearlySelectedIndex = (range: DateRange, newSelectedDate?: Date | null) => {
    if (newSelectedDate) {
      return range.findIndex(({ date }) => dayjs(date).isSame(dayjs(newSelectedDate), 'year'));
    }
    if (urlDate) {
      return range.findIndex(({ date }) => dayjs(date).isSame(dayjs(urlDate, formatDate), 'year'));
    }
    return range.length - 1;
  };

  const determineDaySelectedIndex = (range: DateRange, newSelectedDate?: Date | null) => {
    if (newSelectedDate) {
      const selectedIndex = range.findIndex(({ date }) =>
        dayjs(date).isSame(dayjs(newSelectedDate), isWeekRange ? 'hour' : 'day'),
      );
      return selectedIndex !== -1 ? selectedIndex : 0;
    }
    const initialIndex = range.findIndex(({ date }) =>
      dayjs(date).isSame(dayjs(initialDate), isWeekRange ? 'hour' : 'day'),
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
      updateUrlParams(formattedDate);
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

    if (isYearRange) {
      if (isSubtracting && !isAtStart) {
        newIndex--;
      } else if (isAdding && !isAtEnd) {
        newIndex++;
      }
    } else {
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

  const handleDateChange: DateChangeHandler = (date) => {
    // TODO: temporary hardcode 60 days for the date range
    const start = dayjs(date).subtract(60, 'day').startOf('day').toDate();
    const end = dayjs(date).add(60, 'day').endOf('day').toDate();

    setStartDate(start ? dayjs(start) : dayjs());
    setEndDate(end ? dayjs(end) : null);
    if (start && end) {
      updateDateSlider(start, end);
      updateUrlParams(dayjs(end).format(formatDate));
    }
  };

  const handleYearDateChange: YearDateChangeHandler = (date) => {
    const startDate = dayjs(date).startOf('year');
    const endDate = dayjs(date).endOf('year');

    setStartDate(startDate);
    setEndDate(endDate);

    updateDateSlider(startDate.toDate(), endDate.toDate(), date);

    const formattedDate = dayjs(date).format(formatDate);
    updateUrlParams(formattedDate);
  };

  const updateUrlParams = (newDate: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('date', newDate);
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
    updateUrlParams(formattedDate);
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
    if (isMonthRange) {
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
    isMonthRange,
    resetDateRange,
    disableVideoCreation,
    formatDate,
    isWeekRange,
    isYearRange,
  };
};

export default useDateRange;
