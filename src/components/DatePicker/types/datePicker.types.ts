export interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  handleDateChange: (dates: [Date | null, Date | null]) => void;
  modifyDate: (modificationType: 'add' | 'subtract') => void;
  selectedDate: Date;
}
