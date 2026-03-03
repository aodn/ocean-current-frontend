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

/**
 * Find the nearest available date to a target within a search window.
 * Prefers dates at or before the target over future dates.
 * For hourly products, among candidates on the same calendar day as the target,
 * prefers the entry whose hour-of-day is closest to nowHour (prefer earlier time on tie).
 *
 * @param dates      Sorted array of date strings in the given dateFormat
 * @param targetDate The desired date to land on
 * @param windowSize Number of days to search either side (interpreted as months for MONTH format)
 * @param dateFormat The format used for parsing dates in the array
 * @param nowHour    Current wall-clock hour (0-23); injectable for testing (default: dayjs().hour())
 * @returns          The best matching date string, or null if nothing found in window
 */
const findNearestDateWithinWindow = (
  dates: string[],
  targetDate: Dayjs,
  windowSize: number,
  dateFormat: DateFormat,
  nowHour: number = dayjs().hour(),
): string | null => {
  if (dates.length === 0) return null;

  const isMonthFormat = dateFormat === DateFormat.MONTH;
  const unit = isMonthFormat ? 'month' : 'day';

  const windowStart = targetDate.subtract(windowSize, unit);
  const windowEnd = targetDate.add(windowSize, unit);

  const candidates = dates.filter((str) => {
    const d = dayjs(str, dateFormat, true);
    if (!d.isValid()) return false;
    return !d.isBefore(windowStart) && !d.isAfter(windowEnd);
  });

  if (candidates.length === 0) return null;

  const pastOrEqual: string[] = [];
  const future: string[] = [];

  candidates.forEach((str) => {
    const d = dayjs(str, dateFormat, true);
    if (d.isAfter(targetDate)) {
      future.push(str);
    } else {
      pastOrEqual.push(str);
    }
  });

  // Sort pastOrEqual descending (most recent first), future ascending (nearest first)
  pastOrEqual.sort((a, b) => (a > b ? -1 : a < b ? 1 : 0));
  future.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

  // Wall-clock-hour preference for hourly products: among all same-day candidates,
  // pick the one whose hour is closest to nowHour (prefer earlier on tie).
  // This runs before the past/future split because when transitioning from a DAY-format
  // product, the target is midnight (00:00) so later hours on the same day are "future".
  if (dateFormat === DateFormat.HOUR) {
    const targetDayStr = targetDate.format(DateFormat.DAY);
    const sameDayCandidates = candidates.filter(
      (str) => dayjs(str, dateFormat, true).format(DateFormat.DAY) === targetDayStr,
    );

    if (sameDayCandidates.length > 0) {
      return sameDayCandidates.reduce((bestStr, str) => {
        const bestHour = dayjs(bestStr, dateFormat, true).hour();
        const candidateHour = dayjs(str, dateFormat, true).hour();
        const bestDiff = Math.abs(nowHour - bestHour);
        const candidateDiff = Math.abs(nowHour - candidateHour);
        if (candidateDiff < bestDiff) return str;
        if (candidateDiff === bestDiff && candidateHour < bestHour) return str;
        return bestStr;
      });
    }
  }

  if (pastOrEqual.length > 0) {
    return pastOrEqual[0];
  }

  if (future.length > 0) {
    return future[0];
  }

  return null;
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

function toYYYYMM(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}${month}`;
}

/**
 *
 * @param dateStr expected be following formats: YYYYMMDDHHmm, YYYYMMDDHH, YYYYMMDD, YYYYMM
 * @returns boolean
 */
function isValidMonthlyMeanDate(dateStr: string): boolean {
  if (!/^\d+$/.test(dateStr)) return false;

  const len = dateStr.length;

  let year: number,
    month: number,
    day = 1,
    hour = 0,
    minute = 0;

  try {
    switch (len) {
      case 6: // MONTH
        year = Number(dateStr.slice(0, 4));
        month = Number(dateStr.slice(4, 6));
        break;

      case 8: // DAY
        year = Number(dateStr.slice(0, 4));
        month = Number(dateStr.slice(4, 6));
        day = Number(dateStr.slice(6, 8));
        break;

      case 10: // HOUR
        year = Number(dateStr.slice(0, 4));
        month = Number(dateStr.slice(4, 6));
        day = Number(dateStr.slice(6, 8));
        hour = Number(dateStr.slice(8, 10));
        break;

      case 12: // MINUTE
        year = Number(dateStr.slice(0, 4));
        month = Number(dateStr.slice(4, 6));
        day = Number(dateStr.slice(6, 8));
        hour = Number(dateStr.slice(8, 10));
        minute = Number(dateStr.slice(10, 12));
        break;

      default:
        return false;
    }

    if (month < 1 || month > 12) return false;
    if (day < 1 || day > new Date(year, month, 0).getDate()) return false;
    if (hour < 0 || hour > 23) return false;
    if (minute < 0 || minute > 59) return false;

    return true;
  } catch {
    return false;
  }
}

export {
  findClosestDateIndex,
  findNearestDateWithinWindow,
  findMostRecentDateBefore,
  getUnitByFormat,
  getDateFormatFlags,
  getDateFormatByProductIdAndRegionScope,
  convertDateToDisplayFormattedText,
  toYYYYMM,
  isValidMonthlyMeanDate,
};
