import { SliderDateItem } from '@/types/date';

export interface DateSliderProps {
  allDates: SliderDateItem[];
  selectedDateIndex: number;
  handleSliderChange: (newValue: number) => void;
  steps: number;
  isMonthRange: boolean;
}
