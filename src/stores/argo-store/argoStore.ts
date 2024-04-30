import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import dayjs from 'dayjs';
import { State, Actions } from './argo.types';

const useArgoStore = create<State & Actions>()(
  devtools((set) => ({
    argoParams: {
      worldMeteorologicalOrgId: '',
      cycle: '',
      depth: '0',
    },
    date: dayjs(),
    argoMetaData: [],
    actions: {
      setArgoData: (argoData) => set({ argoParams: argoData }, false, 'setArgoData'),
      setArgoCycle: (cycle) => set((state) => ({ argoParams: { ...state.argoParams, cycle } }), false, 'setArgoCycle'),
      setArgoDepth: (depth) => set((state) => ({ argoParams: { ...state.argoParams, depth } }), false, 'setArgoDepth'),
      setArgoMetaData: (metaData) => set({ argoMetaData: metaData }, false, 'setArgoMetaData'),
      setDate: (date) => set({ date }, false, 'setDate'),
      addOneDay: () => set((state) => ({ date: state.date.add(1, 'day') }), false, 'addOneDay'),
      subtractOneDay: () => set((state) => ({ date: state.date.subtract(1, 'day') }), false, 'subtractOneDay'),
    },
  })),
);

export const { setArgoData, setArgoCycle, setArgoDepth, setArgoMetaData, setDate, addOneDay, subtractOneDay } =
  useArgoStore.getState().actions;

export default useArgoStore;
