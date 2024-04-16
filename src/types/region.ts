import { fullLocalList, fullNationList, fullStateList } from '@/data/regionList';

export type NationKey = (typeof fullNationList)[number];
export type StateKey = (typeof fullStateList)[number];
export type LocalKey = (typeof fullLocalList)[number];
