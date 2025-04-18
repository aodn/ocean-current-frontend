import { RegionScope } from '@/constants/region';
import { LocalKey, NationKey, StateKey, StateMonthlyMeansKey } from './region';

export type RegionKeyType = NationKey | StateKey | LocalKey | StateMonthlyMeansKey;

export interface BaseRegion<T extends RegionKeyType> {
  code: T;
  title: string;
  coords: BoundingBox;
}

export interface NationRegion extends BaseRegion<NationKey> {
  scope: RegionScope.Au;
}

export interface NationBigRegion extends BaseRegion<NationKey> {
  scope: RegionScope.Ht;
}

export interface StateRegion extends BaseRegion<StateKey> {
  scope: RegionScope.State;
}

export interface LocalRegion extends BaseRegion<LocalKey> {
  scope: RegionScope.Local;
}

export type Region = NationRegion | StateRegion | LocalRegion | NationBigRegion;

export type GeoJsonPolygon = [number, number][][];

export type BoundingBox = [westLongitude: number, southLatitude: number, eastLongitude: number, northLatitude: number];
