import dayjs, { Dayjs } from 'dayjs';

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

export { findMostRecentDateBefore };
