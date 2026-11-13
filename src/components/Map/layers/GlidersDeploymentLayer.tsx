import { useEffect } from 'react';
import { Layer, Source, useMap, type MapMouseEvent } from 'react-map-gl/mapbox';
import type { FeatureCollection, Polygon } from 'geojson';
import type { GliderDeploymentProperties } from '@/types/gliders';
import { color } from '@/styles/colors';

interface Props {
  onSelect: (missionName: string) => void;
  data: FeatureCollection<Polygon, GliderDeploymentProperties>;
  /** Mission whose deployment area is highlighted. */
  selectedId?: string;
}

const GlidersDeploymentLayer = ({ data, onSelect, selectedId }: Props) => {
  const isSelected = ['==', ['get', 'id'], selectedId ?? ''];
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
      <Layer
        id="gliders-deployment-fill"
        type="fill"
        paint={{ 'fill-color': color.dodgerBlue, 'fill-opacity': ['case', isSelected, 0.6, 0.2] }}
      />
      <Layer
        id="gliders-deployment-outlines"
        type="line"
        paint={{ 'line-color': color.calypsoBlue, 'line-width': ['case', isSelected, 3, 1.5] }}
      />
    </Source>
  );
};

export default GlidersDeploymentLayer;
