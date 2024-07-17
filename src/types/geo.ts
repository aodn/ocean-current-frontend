type ArgoProfilePointGeometry = {
  type: 'Point';
  coordinates: [number, number];
};

type ArgoProfileProperties = {
  worldMeteorologicalOrgId: string;
  cycle: string;
  depth: string;
  date: string;
};

export type ArgoProfileFeature = GeoJSON.Feature<ArgoProfilePointGeometry, ArgoProfileProperties>;

export type ArgoProfileFeatureCollection = GeoJSON.FeatureCollection<ArgoProfilePointGeometry, ArgoProfileProperties>;
