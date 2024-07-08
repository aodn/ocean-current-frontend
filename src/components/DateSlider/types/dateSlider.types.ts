export interface DateSliderProps {
  allDates: { date: Date; active: boolean }[];
  selectedDateIndex: number;
  handleSliderChange: (newValue: number) => void;
  steps: number;
}
