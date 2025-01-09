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
    case DateFormat.Day:
      return dayjs().format('YYYYMMDD');
    case DateFormat.Month:
      return dayjs().format('YYYYMM');
    case DateFormat.MonthOnly:
      return dayjs().format('MM');
    case DateFormat.Year:
      return dayjs().format('YYYY');
    default:
      return dayjs().format('YYYYMMDD');
  }
};

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

export {
  findMostRecentDateBefore,
  getUnitByFormat,
  createDefaultDateForDateFormat,
  getDateFormatByProductIdAndRegionScope,
};
