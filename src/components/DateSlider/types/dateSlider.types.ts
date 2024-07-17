import { DateItem } from '@/hooks/useDateRange/types/useDateRange.types';

export interface DateSliderProps {
  allDates: DateItem[];
  selectedDateIndex: number;
  handleSliderChange: (newValue: number) => void;
  steps: number;
  isYearRange: boolean;
}
