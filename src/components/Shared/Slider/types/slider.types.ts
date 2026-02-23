type DateItem = {
  date: Date;
  active: boolean;
  showLabel: boolean;
};

export interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (newValue: number) => void;
  labelFormatter?: (value: number) => string;
  allDates: DateItem[];
}

export interface MarkersProps {
  min: number;
  max: number;
  step: number;
  labelFormatter?: (value: number) => string;
  allDates: DateItem[];
}
