import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { State, Actions } from './argo.types';

const initialState: State = {
  argoParams: {
    worldMeteorologicalOrgId: '',
    cycle: '',
    depth: '0',
  },
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
      reset: () => set(initialState, false, 'resetArgoStore'),
    },
  })),
);

export const {
  setArgoData,
  setArgoCycle,
  setArgoDepth,
  setArgoMetaData,
  reset: resetArgoStore,
} = useArgoStore.getState().actions;

export default useArgoStore;
