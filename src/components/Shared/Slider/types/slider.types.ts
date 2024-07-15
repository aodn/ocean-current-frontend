export interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (newValue: number) => void;
  labelFormatter?: (value: number) => string;
  allDates: AllDates[];
}

export interface MarkersProps {
  min: number;
  max: number;
  step: number;
  labelFormatter?: (value: number) => string;
  allDates: AllDates[];
}

type AllDates = {
  date: Date;
  active: boolean;
  showLabel: boolean;
};
