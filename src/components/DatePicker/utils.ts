import dayjs from 'dayjs';
import { DateFormat } from '@/types/date';

interface DateRangeResult {
  missingDates: Date[];
  firstDate: Date;
  lastDate: Date;
}

const findDateRangeInfo = (dates: string[], format: DateFormat): DateRangeResult => {
  if (dates.length === 0) {
    return { missingDates: [], firstDate: new Date(), lastDate: new Date() };
  }

  const sortedDates = [...dates].sort();

  const firstDateStr = sortedDates[0];
  const lastDateStr = sortedDates[sortedDates.length - 1];

  const firstDate = dayjs(firstDateStr, format);
  const lastDate = dayjs(lastDateStr, format);

  const daysWithData = new Set<string>();

  dates.forEach((dateStr) => {
    const date = dayjs(dateStr, format);
    const dayStr = date.format(DateFormat.DAY);
    daysWithData.add(dayStr);
  });

  const missingDates: Date[] = [];

  let currentDate = firstDate.startOf('day');
  const endDate = lastDate.endOf('day');

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
    const dayStr = currentDate.format(DateFormat.DAY);

    if (!daysWithData.has(dayStr)) {
      missingDates.push(currentDate.toDate());
    }

    currentDate = currentDate.add(1, 'day');
  }

  return {
    missingDates,
    firstDate: firstDate.toDate(),
    lastDate: lastDate.toDate(),
  };
};

export { findDateRangeInfo };
