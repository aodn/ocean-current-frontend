import { Dayjs } from 'dayjs';

export type DateItem = {
  date: Date;
  active: boolean;
  showLabel: boolean;
};

export type DateRange = DateItem[];

export type ModificationType = 'add' | 'subtract';

export type DateChangeHandler = (date: Date | null) => void;

export type YearDateChangeHandler = (date: Date | null) => void;

export type SliderChangeHandler = (newValue: number) => void;

export type CalculatedDates = {
  newStartDate: Date;
  newEndDate: Date | null;
  newIndex: number;
};

export type DateStoreState = {
  startDate: Dayjs;
  endDate: Dayjs | null;
};

export type UseDateRangeReturn = {
  startDate: Date;
  endDate: Date | null;
  minDate?: Date;
  maxDate?: Date;
  allDates: DateRange;
  selectedDateIndex: number;
  handleSliderChange: SliderChangeHandler;
  handleDateChange: DateChangeHandler;
  modifyDate: (modificationType: ModificationType) => void;
  handleYearDateChange: YearDateChangeHandler;
  isSelectedDayYesterdayOrLater: () => boolean;
  isLastMonthOfTheYear: () => boolean;
  steps: number;
  isMonthRange: boolean;
  isWeekRange: boolean;
  isYearRange: boolean;
  resetDateRange: () => void;
  disableVideoCreation: () => boolean;
  formatDate: string;
};
