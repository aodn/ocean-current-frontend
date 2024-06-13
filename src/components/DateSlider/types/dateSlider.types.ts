export interface DateSliderProps {
  allDates: Date[];
  selectedDateIndex: number;
  handleSliderChange: (newValue: number) => void;
  steps: number;
}
