import { DateFormat, DateItem } from '@/types/date';
import { ProductID } from '@/types/product';

export interface DatePickerProps {
  productId: ProductID;
  dateList: DateItem[];
  selectedDate: Date;
  goToNext: () => void;
  goToPrevious: () => void;
  canGoNext?: boolean;
  canGoPrevious?: boolean;
  dateFormat: DateFormat;
  onChange: (date: Date) => void;
  isMobile?: boolean;
}
