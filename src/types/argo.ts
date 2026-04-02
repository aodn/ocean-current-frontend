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

export interface ArgoImageTag {
  type: 'Argo';
  coordX: number;
  coordY: number;
  wmoId: number;
  cycle: number;
  institution: string;
  dataSource: string;
}

export interface SoopImageTag {
  type: 'SOOP';
  coordX: number;
  coordY: number;
  shipName: string;
}

export interface FishSoopImageTag {
  type: 'FishSOOP';
  coordX: number;
  coordY: number;
  region: string;
  year: string;
  date: string;
}

export interface ANMNImageTag {
  type: 'ANMN';
  coordX: number;
  coordY: number;
  shipName: string;
}

export type ImageTag = ArgoImageTag | SoopImageTag | FishSoopImageTag | ANMNImageTag;

export interface ImageTagMapArea {
  type: ANMNImageTag['type'] | SoopImageTag['type'] | FishSoopImageTag['type'] | ArgoImageTag['type'];
  shape: string;
  coords: number[];
  href: string;
  wmoId?: number;
  cycle?: number;
  alt?: string;
  tooltip?: string;
}
