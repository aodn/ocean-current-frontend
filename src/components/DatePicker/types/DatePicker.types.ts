export interface DatePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  maxDate?: Date;
  addButtonDisabled?: boolean;
  handleDateChange: (dates: [Date | null, Date | null]) => void;
  handleYearDateChange: (date: Date) => void;
  modifyDate: (modificationType: 'add' | 'subtract') => void;
  selectedDate: Date | null;
  isLastMonth: () => boolean;
}
