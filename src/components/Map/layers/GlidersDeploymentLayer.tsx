import { useEffect } from 'react';
import { Layer, Source, useMap, type MapMouseEvent } from 'react-map-gl/mapbox';
import type { FeatureCollection, Polygon } from 'geojson';
import type { GliderDeploymentProperties } from '@/types/gliders';

interface Props {
  onSelect: (missionName: string) => void;
  data: FeatureCollection<Polygon, GliderDeploymentProperties>;
}

const GlidersDeploymentLayer = ({ data, onSelect }: Props) => {
  const { current: map } = useMap();
  useEffect(() => {
    if (!map) return;
    const handleClick = (event: MapMouseEvent) => {
      const id = event.features?.[0]?.properties?.id;
      if (typeof id === 'string') onSelect(id);
    };
    const enter = () => {
      const canvas = map.getCanvas();
      if (canvas) canvas.style.cursor = 'pointer';
    };
    const leave = () => {
      const canvas = map.getCanvas();
      if (canvas) canvas.style.cursor = '';
    };
    map.on('click', 'gliders-deployment-fill', handleClick);
    map.on('mouseenter', 'gliders-deployment-fill', enter);
    map.on('mouseleave', 'gliders-deployment-fill', leave);
    return () => {
      map.off('click', 'gliders-deployment-fill', handleClick);
      map.off('mouseenter', 'gliders-deployment-fill', enter);
      map.off('mouseleave', 'gliders-deployment-fill', leave);
      leave();
    };
  }, [map, onSelect]);
  return (
    <Source id="gliders-deployments" type="geojson" data={data}>
      <Layer id="gliders-deployment-fill" type="fill" paint={{ 'fill-color': '#2972FF', 'fill-opacity': 0.2 }} />
      <Layer id="gliders-deployment-outlines" type="line" paint={{ 'line-color': '#1856b3', 'line-width': 1.5 }} />
    </Source>
  );
};

export default GlidersDeploymentLayer;
