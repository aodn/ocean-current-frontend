import { DateItem, DateFormat } from '@/types/date';

export interface MultiFormatDatePickerProps {
  dateFormat: DateFormat;
  dateList: DateItem[];
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  isDisabled?: boolean;
  startDate?: Date;
  endDate?: Date;
}
