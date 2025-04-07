import { DateFormat, DateItem } from '@/types/date';
import { ProductID } from '@/types/product';

export interface DatePickerProps {
  productId: ProductID;
  goToPrevious: () => void;
  goToNext: () => void;
  canGoNext?: boolean;
  canGoPrevious?: boolean;
  selectedDate: Date | null;
  dateFormat: DateFormat;
  onChange: (date: Date | null) => void;
  isMobile?: boolean;
  dateList: DateItem[];
}
