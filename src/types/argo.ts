export interface ArgoProfile {
  coords: number[];
  worldMeteorologicalOrgId: string;
  cycle: string;
  depth: '0' | '1';
  date?: string;
}

export interface ArgoProfileCycle {
  date: string;
  cycle: string;
  filename: string;
}
