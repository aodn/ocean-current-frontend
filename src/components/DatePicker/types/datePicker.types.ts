export interface DatePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  minDate?: Date | null;
  maxDate?: Date | null;
  addButtonDisabled?: boolean;
  handleDateChange: (dates: [Date | null, Date | null]) => void;
  handleYearDateChange: (date: Date) => void;
  modifyDate: (modificationType: 'add' | 'subtract') => void;
  selectedDate: Date | null;
  isLastMonthOfTheYear: () => boolean;
  isYearRange: boolean;
  isWeakRange: boolean;
}
