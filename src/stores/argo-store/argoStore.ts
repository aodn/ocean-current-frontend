import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import dayjs from 'dayjs';
import { State, Actions } from './argo.types';

const initialState: State = {
  argoParams: {
    worldMeteorologicalOrgId: '',
    cycle: '',
    depth: '0',
  },
  date: dayjs().subtract(1, 'day'),
  argoMetaData: [],
};

const useArgoStore = create<State & Actions>()(
  devtools((set) => ({
    ...initialState,
    actions: {
      setArgoData: (argoData) => set({ argoParams: argoData }, false, 'setArgoData'),
      setArgoCycle: (cycle) => set((state) => ({ argoParams: { ...state.argoParams, cycle } }), false, 'setArgoCycle'),
      setArgoDepth: (depth) => set((state) => ({ argoParams: { ...state.argoParams, depth } }), false, 'setArgoDepth'),
      setArgoMetaData: (metaData) => set({ argoMetaData: metaData }, false, 'setArgoMetaData'),
      setDate: (date) => set({ date }, false, 'setDate'),
      addOneDay: () => set((state) => ({ date: state.date.add(1, 'day') }), false, 'addOneDay'),
      subtractOneDay: () => set((state) => ({ date: state.date.subtract(1, 'day') }), false, 'subtractOneDay'),
      reset: () => set(initialState, false, 'resetArgoStore'),
    },
  })),
);

export const {
  setArgoData,
  setArgoCycle,
  setArgoDepth,
  setArgoMetaData,
  setDate,
  addOneDay,
  subtractOneDay,
  reset: resetArgoStore,
} = useArgoStore.getState().actions;

export default useArgoStore;
