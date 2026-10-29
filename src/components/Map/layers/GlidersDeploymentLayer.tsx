import { Layer, Source } from 'react-map-gl/mapbox';
import type { FeatureCollection, Polygon } from 'geojson';
import type { GliderDeploymentProperties } from '@/types/gliders';

interface Props {
  data: FeatureCollection<Polygon, GliderDeploymentProperties>;
}

const GlidersDeploymentLayer = ({ data }: Props) => (
  <Source id="gliders-deployments" type="geojson" data={data}>
    <Layer id="gliders-deployment-fill" type="fill" paint={{ 'fill-color': '#2972FF', 'fill-opacity': 0.2 }} />
    <Layer id="gliders-deployment-outlines" type="line" paint={{ 'line-color': '#1856b3', 'line-width': 1.5 }} />
  </Source>
);

export default GlidersDeploymentLayer;
