import { CurrentMetersRegion } from '@/constants/currentMeters';
import { CurrentMetersMapDataPointNames } from './currentMeters';

/*
  Generic Geo Types
*/
type ProfilePointGeometry = {
  type: 'Point';
  coordinates: [number, number];
};

/*
  Argo Map Points
*/

type ArgoProfileProperties = {
  worldMeteorologicalOrgId: string;
  cycle: string;
  depth: string;
  date: string;
};

export type ArgoProfileFeature = GeoJSON.Feature<ProfilePointGeometry, ArgoProfileProperties>;

export type ArgoProfileFeatureCollection = GeoJSON.FeatureCollection<ProfilePointGeometry, ArgoProfileProperties>;

/*
Current Meters Map Points
*/

export type CurrentMetersProfileProperties = {
  title: CurrentMetersMapDataPointNames;
  region: CurrentMetersRegion;
};

export type CurrentMetersProfileFeature = GeoJSON.Feature<ProfilePointGeometry, CurrentMetersProfileProperties>;

export type CurrentMetersProfileFeatureCollection = GeoJSON.FeatureCollection<
  ProfilePointGeometry,
  CurrentMetersProfileProperties
>;
