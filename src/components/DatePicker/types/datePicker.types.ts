export interface DatePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  minDate?: Date | null;
  maxDate?: Date | null;
  addButtonDisabled?: boolean;
  handleDateChange: (date: Date) => void;
  handleYearDateChange: (date: Date) => void;
  modifyDate: (modificationType: 'add' | 'subtract') => void;
  selectedDate: Date | null;
  isLastMonthOfTheYear: () => boolean;
  isMonthRange?: boolean;
  isWeekRange?: boolean;
  isYearRange?: boolean;
  isMobile?: boolean;
}
