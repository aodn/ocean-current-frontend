import dayjs, { Dayjs } from 'dayjs';
import { DateFormat, DateUnit } from '@/types/date';
import { RegionScope } from '@/constants/region';
import { getProductByIdFromFlat } from '../product-utils/product';

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
    case DateFormat.Hour:
      return DateUnit.Hour;
    case DateFormat.Day:
      return DateUnit.Day;
    case DateFormat.Month:
    case DateFormat.MonthOnly:
      return DateUnit.Month;
    case DateFormat.Year:
      return DateUnit.Year;
    default:
      return DateUnit.Day;
  }
};

const createDefaultDateForDateFormat = (format: DateFormat, date: string): string => {
  switch (format) {
    case DateFormat.Hour:
      return dayjs(date).format('YYYYMMDDHH');
    case DateFormat.Month:
      return dayjs(date).format('YYYYMM');
    case DateFormat.MonthOnly:
      return dayjs(date).format('MM');
    case DateFormat.Year:
      return dayjs(date).format('YYYY');
    default:
      return dayjs(date).format('YYYYMMDD');
  }
};

const getDateFormatFlags = (format: DateFormat) => ({
  isMonthFormat: format === DateFormat.Month,
  isMonthOnlyFormat: format === DateFormat.MonthOnly,
  isYearFormat: format === DateFormat.Year,
  isHourFormat: format === DateFormat.Hour,
});

const getDateFormatByProductIdAndRegionScope = (productId: string, regionScope: RegionScope): DateFormat => {
  const product = getProductByIdFromFlat(productId);

  if (!product) {
    throw new Error(`Invalid product id: ${productId}`);
  }

  const dateFormatFromProduct =
    regionScope === RegionScope.Local ? product.dateFormat?.localFormat : product.dateFormat?.stateFormat;

  const dateFormat = dateFormatFromProduct || DateFormat.Day;
  return dateFormat;
};

const convertDateToDisplayFormattedText = (date: Dayjs, dateFormat: DateFormat) => {
  switch (dateFormat) {
    case DateFormat.Hour:
      return date.format('DD MMM YYYY HH:00');
    case DateFormat.Month:
      return date.format('MMM YYYY');
    case DateFormat.MonthOnly:
      return date.format('MMM');
    case DateFormat.Year:
      return date.format('YYYY');
    default:
      return date.format('DD MMM YY');
  }
};

export {
  findMostRecentDateBefore,
  getUnitByFormat,
  createDefaultDateForDateFormat,
  getDateFormatFlags,
  getDateFormatByProductIdAndRegionScope,
  convertDateToDisplayFormattedText,
};
