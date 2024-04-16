import { fullLocalList, fullNationList, fullStateList } from '@/data/regionList';

export type NationTitle = (typeof fullNationList)[number];
export type StateTitle = (typeof fullStateList)[number];
export type LocalTitle = (typeof fullLocalList)[number];
