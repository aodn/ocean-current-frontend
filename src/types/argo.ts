import { ArgoDepths } from '@/constants/argo';

export interface ArgoProfile {
  coords: number[];
  worldMeteorologicalOrgId: string;
  cycle: string;
  depth: ArgoDepths;
  date?: string;
}

export interface ArgoProfileCycle {
  date: string;
  cycle: string;
  filename: string;
}

export interface StateLocalPathValue {
  state: string | null;
  local: string | null;
}

export interface ArgoTagPath {
  [key: string]: StateLocalPathValue;
}

export interface ArgoTag {
  type: string;
  coordX: number;
  coordY: number;
  wmoId: number;
  cycle: number;
  institution: string;
  dataSource: string;
}

export interface ArgoTagMapArea {
  shape: string;
  coords: number[];
  href: string;
  wmoId: number;
  cycle: number;
  alt?: string;
}
