import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router';
import dayjs, { Dayjs } from 'dayjs';
import { DateFormat, DateItem } from '@/types/date';
import { ProductID } from '@/types/product';
import { useArgoStore } from '@/stores/argo-store/argoStore';
import { isHourlyFormat, findFirstDateTimeForSelectedDay } from '@/utils/date-utils/hourly';
import { findClosestDateIndex, findNearestDateWithinWindow } from '@/utils/date-utils/date';
import { NEAREST_DATE_SEARCH_CONFIG } from '@/constants/product';
import { isCurrentYearOptionId } from '@/data/current-meter/sidebarOptions';
import { setIsDateResolving, setIsProductImageLoading } from '@/stores/product-store/productStore';

type NavigationMode = 'dateList' | 'dateRange';

interface UseDateListNavigationProps {
  dateFormat: DateFormat;
  availableDates: DateItem[];
  initialDate?: string;
  productId?: ProductID;
  // When true, the real date list is still loading (the navigator is operating on a
  // synthetic fallback list). Used to defer syncing the resolved date to the URL.
  isDateListLoading?: boolean;
}

type NavigateDate = {
  direction: 'next' | 'previous';
  currentDate: Dayjs;
  currentIndex: number;
  dates: string[];
  dateFormat: DateFormat;
  updateDate: (date: Dayjs, options?: { reStart?: boolean; replace?: boolean }) => void;
  formatDate: (date: Dayjs) => string;
};

/**
 * Core date parsing logic shared between list and range navigation
 * Handles current year option IDs and various date format edge cases
 */
const parseBasicDate = (dateParam: string, dateFormat: DateFormat): Dayjs | null => {
  // Handle current year option IDs
  if (isCurrentYearOptionId(dateParam)) {
    let date = dayjs(`${dateParam}0101`, dateFormat);

    if (!date.isValid()) {
      if (dateFormat === DateFormat.MONTH_ONLY && dateParam.length === 2) {
        const year = dayjs().year();
        date = dayjs(`${year}${dateParam.padStart(2, '0')}01`, DateFormat.DAY);
      } else if (dateFormat === DateFormat.MONTH && dateParam.length === 2) {
        const year = dayjs().year();
        date = dayjs(`${year}${dateParam.padStart(2, '0')}`, DateFormat.MONTH);
      } else {
        date = dayjs(dateParam);
      }
    }

    return date.isValid() ? date : null;
  }

  // Regular date parsing
  let date = dayjs(dateParam, dateFormat, true);

  if (!date.isValid()) {
    if (dateFormat === DateFormat.MONTH_ONLY && dateParam.length === 2) {
      const year = dayjs().year();
      date = dayjs(`${year}${dateParam.padStart(2, '0')}01`, DateFormat.DAY);
    } else if (dateFormat === DateFormat.MONTH && dateParam.length === 2) {
      const year = dayjs().year();
      date = dayjs(`${year}${dateParam.padStart(2, '0')}`, DateFormat.MONTH);
    } else {
      date = dayjs(dateParam);
    }
  }

  return date.isValid() ? date : null;
};

/**
 * Pure function that resolves a date parameter to the best available date for list-based navigation.
 * Handles format transitions (e.g. DAY → HOUR when switching products) by searching
 * for the nearest available date within a product-specific window.
 * Returns the resolved date string (which may differ from dateParam) so the caller
 * can sync it to the URL in a useEffect.
 */
const parseDateParamForList = (
  dateParam: string,
  dateFormat: DateFormat,
  dates: string[],
  productId?: ProductID,
): { date: Dayjs | null; resolvedDateParam: string | null } => {
  const date = parseBasicDate(dateParam, dateFormat);

  if (!date) {
    return { date: null, resolvedDateParam: null };
  }

  const isDateParamInTargetFormat = dayjs(dateParam, dateFormat, true).isValid();
  const formattedDate = date.format(dateFormat);
  const isDateInList = dates.includes(formattedDate);

  // Nearest-date search is needed when either:
  // 1. A format transition occurred (e.g. DAY → HOUR switching from 6d SST to 4h SST), OR
  // 2. The date is in the correct format but doesn't exist in the available dates list
  //    (e.g. switching between two HOUR-format products where different dates are available)
  const needsNearestDateSearch = !isDateParamInTargetFormat || (isDateParamInTargetFormat && !isDateInList);

  if (needsNearestDateSearch) {
    const searchConfig = productId ? NEAREST_DATE_SEARCH_CONFIG[productId] : undefined;

    if (searchConfig && dates.length > 0) {
      const nearest = findNearestDateWithinWindow(dates, date, searchConfig.windowSize, dateFormat);
      if (nearest) {
        return { date: dayjs(nearest, dateFormat), resolvedDateParam: nearest };
      }
      // No data within window — return the parsed target date unchanged so that
      // currentIndex === -1, which causes the image to 404 and shows ErrorImage.
      return { date, resolvedDateParam: null };
    }

    // Legacy path: products without a search config.
    // For sub-day target formats (hourly, or second-precision like SWOT GSLA SSH),
    // try the first entry on the exact target day.
    if (!isDateParamInTargetFormat && (isHourlyFormat(dateFormat) || dateFormat === DateFormat.SECOND)) {
      const dayStr = date.format(DateFormat.DAY);
      const firstHourlyDate = findFirstDateTimeForSelectedDay(dates, dayStr, dateFormat);
      if (firstHourlyDate) {
        return { date: dayjs(firstHourlyDate, dateFormat), resolvedDateParam: firstHourlyDate };
      }
    }
  }

  return { date, resolvedDateParam: null };
};

/**
 * Navigate to the next or previous date in the list
 * Handles circular navigation for month-only format and out-of-range dates
 */
const navigateDate = ({
  direction,
  currentDate,
  currentIndex,
  dateFormat,
  dates,
  updateDate,
  formatDate,
}: NavigateDate) => {
  const isNext = direction === 'next';

  // Handle case when currentDate is not in the dates list
  if (currentIndex === -1) {
    const currentDateStr = formatDate(currentDate);
    const targetIndex = findClosestDateIndex(dates, currentDateStr, isNext ? 'next' : 'previous');

    if (targetIndex !== -1) {
      updateDate(dayjs(dates[targetIndex], dateFormat), { replace: true });
    }
    return;
  }

  // Handle circular navigation for month-only format
  if (dateFormat === DateFormat.MONTH_ONLY && dates.length > 0) {
    const isAtEdge = isNext ? currentIndex === dates.length - 1 : currentIndex === 0;
    if (isAtEdge) {
      const nextDate = dayjs(currentDate).add(isNext ? 1 : -1, 'month');
      updateDate(nextDate);
      return;
    }
  }

  // Regular navigation within the dates list
  const canNavigate = isNext ? currentIndex < dates.length - 1 : currentIndex > 0;
  if (canNavigate) {
    const newIndex = isNext ? currentIndex + 1 : currentIndex - 1;
    const newDate = dayjs(dates[newIndex], dateFormat);
    updateDate(newDate);
  }
};

/**
 * Custom hook for date list-based navigation
 *
 * Provides navigation through a predefined list of available dates with support for:
 * - URL parameter synchronization
 * - Multiple date formats (hourly, daily, monthly, etc.)
 * - Circular navigation for month-only format
 * - Handling dates outside the available list
 *
 * @param dateFormat - The format to use for date parsing and formatting
 * @param availableDates - Array of available dates to navigate through (must be sorted)
 * @param initialDate - Optional initial date to use instead of URL params
 *
 * @returns Object containing current date, navigation functions, and state flags
 */
export const useDateListNavigation = ({
  dateFormat,
  availableDates,
  initialDate,
  productId,
  isDateListLoading = false,
}: UseDateListNavigationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // The `availableDates` array must be sorted by the backend API to ensure correct functionality.
  // A runtime assertion is added to verify this requirement during development and testing.
  if (process.env.NODE_ENV !== 'production') {
    const isSorted = availableDates.every((item, index, arr) => index === 0 || arr[index - 1].date <= item.date);
    if (!isSorted) {
      console.error('The `availableDates` array is not sorted. Ensure the backend API returns sorted data.');
    }
  }

  const availableDatesKey = `${availableDates.length}-${availableDates[0]?.date}-${availableDates[availableDates.length - 1]?.date}`;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dates = useMemo(() => availableDates.map((item) => item.date).sort(), [availableDatesKey]);

  const formatDate = useCallback((date: dayjs.Dayjs) => date.format(dateFormat), [dateFormat]);

  const argoProfiles = useArgoStore((state) => state.argoProfileCycles);

  // Resolve the current date from URL params, applying nearest-date search when needed.
  // resolvedDateParam tracks when the URL needs to be updated (deferred to useEffect).
  const { currentDate, resolvedDateParam } = useMemo(() => {
    // Use initialDate if provided
    if (initialDate) {
      return { currentDate: dayjs(initialDate, dateFormat), resolvedDateParam: null as string | null };
    }

    const dateParam = searchParams.get('date');

    // No date parameter, use latest available date or today.
    if (!dateParam || dateParam === '0000') {
      // Argo: a cycle uniquely identifies a profile, so resolve its date from the fetched
      // profiles instead of falling back to "latest". This is what makes `date` optional in
      // the Argo URL (e.g. `/product/argo?wmoid=...&cycle=65`).
      const cycleParam = searchParams.get('cycle');
      // Scope strictly to Argo: a stray `cycle` on another product's shared link must not block
      // that product's normal latest-date canonicalization below.
      if (productId === 'argo' && cycleParam) {
        const matched = argoProfiles.find((profile) => profile.cycle === cycleParam);
        if (matched) {
          return { currentDate: dayjs(matched.date, dateFormat, true), resolvedDateParam: matched.date };
        }
        // Profiles not loaded yet — hold on today and DO NOT fall through to the "latest"
        // branch below, which would overwrite the user-requested cycle. This memo re-runs
        // once argoProfiles populates and the cycle resolves above.
        return { currentDate: dayjs(), resolvedDateParam: null as string | null };
      }

      const latest = dates.at(-1);
      // Any product's latest file may predate "today" (SWOT, Non-Tidal SLA, etc.),
      // so the resolved date must be written to the URL — otherwise the global date store
      // (which drives the rendered image) defaults to today and 404s. Defer the sync
      // until the real list has loaded so we never persist a synthetic fallback date.
      // Side effect: every product that loads without a ?date= param will trigger a
      // setSearchParams call once the list resolves, making the URL canonical.
      const shouldSyncLatestToUrl = !isDateListLoading && !!latest;
      return {
        currentDate: latest ? dayjs(latest, dateFormat) : dayjs(),
        resolvedDateParam: (shouldSyncLatestToUrl ? latest : null) as string | null,
      };
    }

    // Parse date parameter (pure — no side effects)
    const result = parseDateParamForList(dateParam, dateFormat, dates, productId);

    // Return parsed date or fallback to first available date or today
    if (result.date && result.date.isValid()) {
      return { currentDate: result.date, resolvedDateParam: result.resolvedDateParam };
    }

    return {
      currentDate: dates.length > 0 ? dayjs(dates[0], dateFormat) : dayjs(),
      resolvedDateParam: null as string | null,
    };
  }, [initialDate, searchParams, dates, dateFormat, productId, isDateListLoading, argoProfiles]);

  // Sync the resolved date to the URL after render to avoid setState-during-render warnings
  const resolvedDateRef = useRef<string | null>(null);
  useEffect(() => {
    if (resolvedDateParam && resolvedDateParam !== resolvedDateRef.current) {
      resolvedDateRef.current = resolvedDateParam;
      setIsDateResolving(true);
      setSearchParams(
        (prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.set('date', resolvedDateParam);
          return newParams;
        },
        { replace: true },
      );
    } else if (!resolvedDateParam) {
      setIsDateResolving(false);
    }
  }, [resolvedDateParam, setSearchParams]);

  const updateDate = useCallback(
    (newDate: Dayjs, options?: { reStart?: boolean; replace?: boolean }) => {
      const { reStart = false, replace = false } = options || {};
      const formatted = formatDate(newDate);

      if (dates.includes(formatted) || reStart) {
        setSearchParams(
          (prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set('date', formatted);
            const correctCycle = argoProfiles.find(({ date }) => date === formatted)?.cycle;
            if (correctCycle) {
              newParams.set('cycle', correctCycle);
            }
            return newParams;
          },
          { replace },
        );
        setIsProductImageLoading(true);
      }
    },
    [formatDate, dates, setSearchParams, argoProfiles],
  );

  const currentIndex = useMemo(
    () => dates.findIndex((date) => date === formatDate(currentDate)),
    [dates, currentDate, formatDate],
  );

  const goToPrevious = useCallback(() => {
    navigateDate({ direction: 'previous', currentDate, currentIndex, dates, dateFormat, updateDate, formatDate });
  }, [currentDate, currentIndex, dates, dateFormat, updateDate, formatDate]);

  const goToNext = useCallback(() => {
    navigateDate({ direction: 'next', currentDate, currentIndex, dates, dateFormat, updateDate, formatDate });
  }, [currentDate, currentIndex, dates, dateFormat, updateDate, formatDate]);

  const canGoPrevious = useMemo(() => {
    if (dateFormat === DateFormat.MONTH_ONLY) {
      return true;
    }

    return currentIndex > 0 || currentIndex === -1;
  }, [dateFormat, currentIndex]);

  const canGoNext = useMemo(() => {
    return dateFormat === DateFormat.MONTH_ONLY || currentIndex < dates.length - 1;
  }, [dateFormat, currentIndex, dates]);

  return {
    currentDate,
    updateDate,
    formatDate,
    goToPrevious,
    goToNext,
    canGoPrevious,
    canGoNext,
    currentIndex,
  };
};

interface UseDateRangeNavigationProps {
  dateFormat: DateFormat;
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
}

export const useDateRangeNavigation = ({ dateFormat, dateRange }: UseDateRangeNavigationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const formatDate = useCallback((date: dayjs.Dayjs) => date.format(dateFormat), [dateFormat]);

  const argoProfiles = useArgoStore((state) => state.argoProfileCycles);

  const currentDate = useMemo(() => {
    const dateParam = searchParams.get('date');

    // No date parameter, return end date
    if (!dateParam || dateParam === '0000') {
      return dayjs(dateRange.endDate);
    }

    // Parse the date using shared logic
    const parsedDate = parseBasicDate(dateParam, dateFormat);

    // If parsing failed, return end date
    if (!parsedDate) {
      return dayjs(dateRange.endDate);
    }

    // Ensure the date is within the valid range
    const startDate = dayjs(dateRange.startDate);
    const endDate = dayjs(dateRange.endDate);

    if (parsedDate.isAfter(endDate) || parsedDate.isBefore(startDate)) {
      return endDate;
    }

    return parsedDate;
  }, [searchParams, dateFormat, dateRange]);

  const updateDate = useCallback(
    (newDate: Dayjs, options?: { reStart?: boolean; replace?: boolean }) => {
      const { reStart = false, replace = false } = options || {};
      const formatted = formatDate(newDate);

      // Check if the new date is within the valid range
      const startDate = dayjs(dateRange.startDate);
      const endDate = dayjs(dateRange.endDate);

      if (newDate.isBefore(startDate) || newDate.isAfter(endDate)) {
        if (!reStart) {
          return; // Don't update if outside range and not forcing restart
        }
      }

      setSearchParams(
        (prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.set('date', formatted);
          const correctCycle = argoProfiles.find(({ date }) => date === formatted)?.cycle;
          if (correctCycle) {
            newParams.set('cycle', correctCycle);
          }
          return newParams;
        },
        { replace },
      );
      setIsProductImageLoading(true);
    },
    [formatDate, dateRange, setSearchParams, argoProfiles],
  );

  const goToPrevious = useCallback(() => {
    const startDate = dayjs(dateRange.startDate);

    // Handle circular navigation for month-only format
    if (dateFormat === DateFormat.MONTH_ONLY) {
      const prevDate = dayjs(currentDate).subtract(1, 'month');
      updateDate(prevDate);
      return;
    }

    // Check if we can go to previous date within range
    let prevDate;
    if (isHourlyFormat(dateFormat)) {
      prevDate = dayjs(currentDate).subtract(1, 'hour');
    } else if (dateFormat === DateFormat.DAY) {
      prevDate = dayjs(currentDate).subtract(1, 'day');
    } else if (dateFormat === DateFormat.MONTH) {
      prevDate = dayjs(currentDate).subtract(1, 'month');
    } else {
      prevDate = dayjs(currentDate).subtract(1, 'day'); // default fallback
    }

    if (prevDate.isBefore(startDate)) {
      return; // Don't go beyond start date
    }

    updateDate(prevDate);
  }, [currentDate, dateFormat, dateRange, updateDate]);

  const goToNext = useCallback(() => {
    const endDate = dayjs(dateRange.endDate);

    // Handle circular navigation for month-only format
    if (dateFormat === DateFormat.MONTH_ONLY) {
      const nextDate = dayjs(currentDate).add(1, 'month');
      updateDate(nextDate);
      return;
    }

    // Check if we can go to next date within range
    let nextDate;
    if (isHourlyFormat(dateFormat)) {
      nextDate = dayjs(currentDate).add(1, 'hour');
    } else if (dateFormat === DateFormat.DAY) {
      nextDate = dayjs(currentDate).add(1, 'day');
    } else if (dateFormat === DateFormat.MONTH) {
      nextDate = dayjs(currentDate).add(1, 'month');
    } else {
      nextDate = dayjs(currentDate).add(1, 'day'); // default fallback
    }

    if (nextDate.isAfter(endDate)) {
      return; // Don't go beyond end date
    }

    updateDate(nextDate);
  }, [currentDate, dateFormat, dateRange, updateDate]);

  const canGoPrevious = useMemo(() => {
    if (dateFormat === DateFormat.MONTH_ONLY) {
      return true;
    }

    const startDate = dayjs(dateRange.startDate);
    let prevDate;

    if (isHourlyFormat(dateFormat)) {
      prevDate = dayjs(currentDate).subtract(1, 'hour');
    } else if (dateFormat === DateFormat.DAY) {
      prevDate = dayjs(currentDate).subtract(1, 'day');
    } else if (dateFormat === DateFormat.MONTH) {
      prevDate = dayjs(currentDate).subtract(1, 'month');
    } else {
      prevDate = dayjs(currentDate).subtract(1, 'day');
    }

    return !prevDate.isBefore(startDate);
  }, [dateFormat, currentDate, dateRange]);

  const canGoNext = useMemo(() => {
    if (dateFormat === DateFormat.MONTH_ONLY) {
      return true;
    }

    const endDate = dayjs(dateRange.endDate);
    let nextDate;

    if (isHourlyFormat(dateFormat)) {
      nextDate = dayjs(currentDate).add(1, 'hour');
    } else if (dateFormat === DateFormat.DAY) {
      nextDate = dayjs(currentDate).add(1, 'day');
    } else if (dateFormat === DateFormat.MONTH) {
      nextDate = dayjs(currentDate).add(1, 'month');
    } else {
      nextDate = dayjs(currentDate).add(1, 'day');
    }

    return !nextDate.isAfter(endDate);
  }, [dateFormat, currentDate, dateRange]);

  return {
    currentDate,
    updateDate,
    formatDate,
    goToPrevious,
    goToNext,
    canGoPrevious,
    canGoNext,
  };
};

type UseNavigationProps = Pick<UseDateListNavigationProps, 'dateFormat'> &
  Partial<Omit<UseDateListNavigationProps, 'dateFormat'>> &
  Partial<UseDateRangeNavigationProps>;

export const useDateNavigation = ({
  dateFormat,
  availableDates = [],
  initialDate,
  dateRange,
  productId,
  isDateListLoading,
}: UseNavigationProps) => {
  const listNav = useDateListNavigation({
    dateFormat,
    availableDates,
    initialDate,
    productId,
    isDateListLoading,
  });

  const rangeNav = useDateRangeNavigation({
    dateFormat,
    dateRange: dateRange || { startDate: new Date(), endDate: new Date() },
  });

  const navigationMode: NavigationMode = availableDates.length > 0 && !dateRange ? 'dateList' : 'dateRange';

  return useMemo(() => {
    return {
      navigationMode,
      dateListNavigation: listNav,
      dateRangeNavigation: rangeNav,
    };
  }, [navigationMode, listNav, rangeNav]);
};
