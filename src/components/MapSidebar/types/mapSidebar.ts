import { Dayjs } from 'dayjs';

export interface MapSidebarProps {
  onDateChange: (date: Dayjs) => void;
  onDepthChange: (depth: '0' | '1') => void;
}
