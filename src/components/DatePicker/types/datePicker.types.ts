import { DateFormat } from '@/types/date';

export interface DatePickerProps {
  productId?: string;
  minDate?: Date;
  maxDate?: Date;
  goToPrevious: () => void;
  goToNext: () => void;
  canGoNext?: boolean;
  canGoPrevious?: boolean;
  selectedDate: Date | null;
  dateFormat: DateFormat;
  onChange: (date: Date | null) => void;
  isMobile?: boolean;
}
