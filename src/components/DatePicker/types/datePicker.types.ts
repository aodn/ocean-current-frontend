export interface DatePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  minDate?: Date;
  maxDate?: Date;
  addButtonDisabled?: boolean;
  handleDateChange: (date: Date | null) => void;
  handleYearDateChange: (date: Date | null) => void;
  modifyDate: (modificationType: 'add' | 'subtract') => void;
  selectedDate: Date | null;
  isLastMonthOfTheYear: () => boolean;
  isMonthRange?: boolean;
  isWeekRange?: boolean;
  isYearRange?: boolean;
  isMobile?: boolean;
}
