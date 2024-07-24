import { fullLocalList, fullNationList, fullStateList, fullStateMonthlyMeansList } from '@/data/regionList';

export type NationKey = (typeof fullNationList)[number];
export type StateKey = (typeof fullStateList)[number];
export type LocalKey = (typeof fullLocalList)[number];
export type StateMonthlyMeansKey = (typeof fullStateMonthlyMeansList)[number];

export interface RegionCategories {
  state: (NationKey | StateKey | StateMonthlyMeansKey)[];
  local: LocalKey[];
}

export interface ProductRegionMap {
  [key: string]: RegionCategories;
}
