import { CurrentMetersRegion } from '@/constants/currentMeters';
import { CurrentMetersMapDataPointNames } from './currentMeters';
import { GeoJsonPolygon, Region } from './map';

/*
  Generic Geo Types
*/
type ProfilePointGeometry = {
  type: 'Point';
  coordinates: [number, number];
};

type RegionPolygonGeometry = {
  type: 'Polygon';
  coordinates: GeoJsonPolygon;
};

/*
  Region Map Polygons
*/

type RegionPolygonProperties = {
  name: string;
  code: Region | string;
};

export type RegionPolygonFeature = GeoJSON.Feature<RegionPolygonGeometry, RegionPolygonProperties>;

export type RegionPolygonFeatureCollection = GeoJSON.FeatureCollection<RegionPolygonGeometry, RegionPolygonProperties>;

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
