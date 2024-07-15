export interface DateSliderProps {
  allDates: { date: Date; active: boolean; showLabel: boolean }[];
  selectedDateIndex: number;
  handleSliderChange: (newValue: number) => void;
  steps: number;
}
