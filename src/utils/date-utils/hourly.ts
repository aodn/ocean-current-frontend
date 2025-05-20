import dayjs from 'dayjs';
import { DateFormat } from '@/types/date';

export const isHourlyFormat = (format: DateFormat): boolean => {
  return format === DateFormat.HOUR;
};

export const findFirstHourlyDateForDay = (
  dates: string[],
  selectedDay: string,
  dateFormat: DateFormat,
): string | undefined => {
  return dates.filter((dateStr) => dayjs(dateStr, dateFormat).format(DateFormat.DAY) === selectedDay).sort()[0];
};
