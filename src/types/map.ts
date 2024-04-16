import { LocalKey, NationKey, StateKey } from './region';

type RegionKeyType = NationKey | StateKey | LocalKey;

export interface BaseRegion<T extends RegionKeyType> {
  region: T;
  title: string;
  coords: number[];
}

export interface NationRegion extends BaseRegion<NationKey> {}

export interface StateRegion extends BaseRegion<StateKey> {}

export interface LocalRegion extends BaseRegion<LocalKey> {}

export type Region = NationRegion | StateRegion | LocalRegion;
