import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ArgoDepths } from '@/constants/argo';
import { State, Actions } from './argo.types';

const initialState: State = {
  selectedArgoParams: {
    worldMeteorologicalOrgId: '',
    cycle: '',
    depth: ArgoDepths['2000M'],
  },
  argoMetaData: [],
  argoProfileCycles: [],
};

const useArgoStore = create<State & Actions>()(
  devtools((set) => ({
    ...initialState,
    actions: {
      setSelectedArgoParams: (argoParams) => set({ selectedArgoParams: argoParams }, false, 'setSelectedArgoParams'),
      setArgoCycle: (cycle) =>
        set((state) => ({ selectedArgoParams: { ...state.selectedArgoParams, cycle } }), false, 'setArgoCycle'),
      setArgoDepth: (depth) =>
        set((state) => ({ selectedArgoParams: { ...state.selectedArgoParams, depth } }), false, 'setArgoDepth'),
      setArgoMetaData: (metaData) => set({ argoMetaData: metaData }, false, 'setArgoMetaData'),
      setArgoProfileCycles: (profileCycles) => set({ argoProfileCycles: profileCycles }, false, 'setArgoProfileCycles'),
      reset: () => set(initialState, false, 'resetArgoStore'),
    },
  })),
);

export const {
  setSelectedArgoParams,
  setArgoCycle,
  setArgoDepth,
  setArgoMetaData,
  setArgoProfileCycles,
  reset: resetArgoStore,
} = useArgoStore.getState().actions;

export { useArgoStore };

export default useArgoStore;
