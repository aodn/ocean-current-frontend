import { Dayjs } from 'dayjs';

export type State = {
  date: Dayjs;
  startDate: Dayjs;
  endDate: Dayjs | null;
  hours: number;
  format: string;
};

export type Actions = {
  actions: {
    setDate: (date: Dayjs) => void;
    setStartDate: (date: Dayjs) => void;
    setEndDate: (date: Dayjs | null) => void;
    addOneDay: () => void;
    subtractOneDay: () => void;
    reset: () => void;
  };
};
