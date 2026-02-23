type DateItem = {
  date: Date;
  active: boolean;
  showLabel: boolean;
};

export interface DateSliderProps {
  allDates: DateItem[];
  selectedDateIndex: number;
  handleSliderChange: (newValue: number) => void;
  steps: number;
  isMonthRange: boolean;
}
