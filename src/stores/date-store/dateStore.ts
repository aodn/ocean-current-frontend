import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import dayjs from 'dayjs';
import { State, Actions } from './date.types';

const initialState: State = {
  date: dayjs(),
  startDate: dayjs().subtract(1, 'month'),
  endDate: dayjs().subtract(1, 'day'),
  hours: 0,
  format: 'YYYYMMDD',
};

const useDateStore = create<State & Actions>()(
  devtools((set) => ({
    ...initialState,
    actions: {
      setDate: (date) => {
        set({ date }, false, 'setDate');
      },
      setStartDate: (date) => {
        set({ startDate: date }, false, 'setStartDate');
      },
      setEndDate: (date) => {
        set({ endDate: date }, false, 'setEndDate');
      },
      addOneDay: () => set((state) => ({ date: state.date.add(1, 'day') }), false, 'addOneDay'),
      subtractOneDay: () => set((state) => ({ date: state.date.subtract(1, 'day') }), false, 'subtractOneDay'),
      reset: () => set(initialState, false, 'resetDateStore'),
    },
  })),
);

export const {
  setDate,
  setStartDate,
  setEndDate,
  addOneDay,
  subtractOneDay,
  reset: resetDateStore,
} = useDateStore.getState().actions;

export { useDateStore };

export default useDateStore;
