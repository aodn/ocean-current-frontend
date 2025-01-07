import { DateFormat } from '@/types/date';

export interface DatePickerNewProps {
  minDate?: Date;
  maxDate?: Date;
  goToPrevious: () => void;
  goToNext: () => void;
  canGoNext: boolean;
  selectedDate: Date | null;
  dateFormat: DateFormat;
  onChange: (date: Date | null) => void;
  isMobile?: boolean;
}
