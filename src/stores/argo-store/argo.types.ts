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
  argoParams: ArgoProfile;
  argoMetaData: ArgoMetaData[];
};

export type Actions = {
  actions: {
    setArgoData: (data: ArgoProfile) => void;
    setArgoCycle: (cycle: string) => void;
    setArgoDepth: (depth: '0' | '1') => void;
    setArgoMetaData: (metaData: ArgoMetaData[]) => void;
    reset: () => void;
  };
};
