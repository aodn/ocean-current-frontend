import { SliderDateItem } from '@/types/date';

export interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (newValue: number) => void;
  labelFormatter?: (value: number) => string;
  allDates: SliderDateItem[];
}

export interface MarkersProps {
  min: number;
  max: number;
  step: number;
  labelFormatter?: (value: number) => string;
  allDates: SliderDateItem[];
}
