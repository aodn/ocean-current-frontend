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
});

const getDateFormatByProductIdAndRegionScope = (productId: string, regionScope: RegionScope): DateFormat => {
  const product = getProductByIdFromFlat(productId);

  if (!product) {
    throw new Error(`Invalid product id: ${productId}`);
  }

  const dateFormatFromProduct =
    regionScope === RegionScope.Local ? product.dateFormat?.localFormat : product.dateFormat?.stateFormat;

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
  findMostRecentDateBefore,
  getUnitByFormat,
  getDateFormatFlags,
  getDateFormatByProductIdAndRegionScope,
  convertDateToDisplayFormattedText,
};
