import dayjs, { Dayjs } from 'dayjs';
import { DateFormat, DateUnit } from '@/types/date';
import { RegionScope } from '@/constants/region';
import { ProductID } from '@/types/product';
import { findLeafFlatProductById } from '../product-utils/product';

type SearchDirection = 'next' | 'previous';

/**
 * Find the index of the closest date in a sorted array relative to a target date
 * @param dates - Sorted array of date strings
 * @param targetDateStr - The target date string to compare against
 * @param searchDirection - Whether to find the next ('next') or previous ('previous') closest date
 * @returns The index of the closest date or -1 if not found
 */
const findClosestDateIndex = (dates: string[], targetDateStr: string, searchDirection: SearchDirection): number => {
  let left = 0;
  let right = dates.length - 1;
  let insertionPoint = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (searchDirection === 'next') {
      // Find next date (greater than target)
      if (dates[mid] > targetDateStr) {
        insertionPoint = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Find previous date (less than target)
      if (dates[mid] < targetDateStr) {
        insertionPoint = mid;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return insertionPoint;
};

const findMostRecentDateBefore = (dateArray: string[], targetDate: string): string | null => {
  const targetDayjs: Dayjs = dayjs(targetDate);

  return dateArray.reduce((mostRecent: string | null, current: string) => {
    const currentDayjs: Dayjs = dayjs(current);

    if (currentDayjs.isBefore(targetDayjs)) {
      if (!mostRecent || currentDayjs.isAfter(dayjs(mostRecent))) {
        return current;
      }
    }

    return mostRecent;
  }, null);
};

const getUnitByFormat = (format: DateFormat): DateUnit => {
  switch (format) {
    case DateFormat.HOUR:
      return DateUnit.Hour;
    case DateFormat.DAY:
      return DateUnit.Day;
    case DateFormat.MONTH:
    case DateFormat.MONTH_ONLY:
      return DateUnit.Month;
    case DateFormat.YEAR_ONLY:
      return DateUnit.Year;
    default:
      return DateUnit.Day;
  }
};

const getDateFormatFlags = (format: DateFormat) => ({
  isMonthFormat: format === DateFormat.MONTH,
  isMonthOnlyFormat: format === DateFormat.MONTH_ONLY,
  isYearFormat: format === DateFormat.YEAR_ONLY,
  isHourFormat: format === DateFormat.HOUR,
  isMinuteFormat: format === DateFormat.MINUTE,
});

const getDateFormatByProductIdAndRegionScope = (
  productId: ProductID,
  regionScope: RegionScope,
  isPointSelected?: boolean,
): DateFormat => {
  const product = findLeafFlatProductById(productId);

  const dateFormatFromProduct =
    regionScope === RegionScope.Local ? product?.dateFormat?.localFormat : product?.dateFormat?.stateFormat;

  if ((productId === 'tidalCurrents-spd' || productId === 'tidalCurrents-sl') && isPointSelected) {
    return DateFormat.MONTH;
  }

  const dateFormat = dateFormatFromProduct || DateFormat.DAY;
  return dateFormat;
};

const convertDateToDisplayFormattedText = (date: Dayjs, dateFormat: DateFormat) => {
  switch (dateFormat) {
    case DateFormat.MINUTE:
      return date.format('DD MMM YYYY HH:mm');
    case DateFormat.HOUR:
      return date.format('DD MMM YYYY HH:00');
    case DateFormat.MONTH:
      return date.format('MMM YYYY');
    case DateFormat.MONTH_ONLY:
      return date.format('MMM');
    case DateFormat.YEAR_ONLY:
      return date.format('YYYY');
    default:
      return date.format('DD MMM YY');
  }
};

export {
  findClosestDateIndex,
  findMostRecentDateBefore,
  getUnitByFormat,
  getDateFormatFlags,
  getDateFormatByProductIdAndRegionScope,
  convertDateToDisplayFormattedText,
};
