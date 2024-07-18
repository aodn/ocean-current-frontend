import { ArgoProfileCycle } from '@/types/argo';

type ArgoProfile = {
  worldMeteorologicalOrgId: string;
  cycle: string;
  depth: '0' | '1';
};

type ArgoMetaData = {
  position: {
    latitude: number;
    longitude: number;
  };
} & ArgoProfile;

export type State = {
  selectedArgoParams: ArgoProfile;
  argoMetaData: ArgoMetaData[];
  argoProfileCycles: ArgoProfileCycle[];
};

export type Actions = {
  actions: {
    setSelectedArgoParams: (data: ArgoProfile) => void;
    setArgoCycle: (cycle: string) => void;
    setArgoDepth: (depth: '0' | '1') => void;
    setArgoMetaData: (metaData: ArgoMetaData[]) => void;
    setArgoProfileCycles: (profileCycles: ArgoProfileCycle[]) => void;
    reset: () => void;
  };
};
