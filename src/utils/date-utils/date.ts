import dayjs, { Dayjs } from 'dayjs';
import { DateFormat, DateUnit } from '@/types/date';

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

export { findMostRecentDateBefore, getUnitByFormat };
