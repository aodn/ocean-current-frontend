import { RegionScope } from '@/constants/region';
import { LocalKey, NationKey, StateKey } from './region';

export type RegionKeyType = NationKey | StateKey | LocalKey;

export interface BaseRegion<T extends RegionKeyType> {
  region: T;
  title: string;
  coords: [number, number, number, number];
}

export interface NationRegion extends BaseRegion<NationKey> {
  scope: RegionScope.Au;
}

export interface StateRegion extends BaseRegion<StateKey> {
  scope: RegionScope.State;
}

export interface LocalRegion extends BaseRegion<LocalKey> {
  scope: RegionScope.Local;
}

export type Region = NationRegion | StateRegion | LocalRegion;
