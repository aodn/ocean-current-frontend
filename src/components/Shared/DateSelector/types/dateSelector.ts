import { Dayjs } from 'dayjs';

export interface DateSelectorProps {
  date: Dayjs;
  subtractDay: () => void;
  addDay: () => void;
}
