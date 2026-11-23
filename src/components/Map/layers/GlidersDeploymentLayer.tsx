import { useEffect } from 'react';
import { Layer, Source, useMap, type MapMouseEvent } from 'react-map-gl/mapbox';
import type { FeatureCollection, Polygon } from 'geojson';
import type { FilterSpecification } from 'mapbox-gl';
import { mapAnimation } from '@/configs/map';
import type { GliderDeploymentProperties } from '@/types/gliders';
import type { BoundingBox } from '@/types/map';
import { color } from '@/styles/colors';

interface Props {
  onSelect: (missionNames: string[]) => void;
  data: FeatureCollection<Polygon, GliderDeploymentProperties>;
  /** Mission whose deployment area is highlighted. */
  selectedId?: string;
  selectedBounds?: BoundingBox | null;
}

const GlidersDeploymentLayer = ({ data, onSelect, selectedId, selectedBounds }: Props) => {
  const selectionFilter: FilterSpecification = ['==', ['get', 'id'], selectedId ?? ''];
  const { current: map } = useMap();
  const [west, south, east, north] = selectedBounds ?? [];

  useEffect(() => {
    if (!map || !selectedId || west === undefined || south === undefined || east === undefined || north === undefined)
      return;

    const padding = 20;
    const fitSelection = () => {
      const { clientWidth, clientHeight } = map.getContainer();
      if (clientWidth <= padding * 2 || clientHeight <= padding * 2) return;
      map.off('resize', fitSelection);
      map.fitBounds([west, south, east, north], { padding, duration: mapAnimation.duration, retainPadding: false });
    };

    map.on('resize', fitSelection);
    fitSelection();
    return () => {
      map.off('resize', fitSelection);
    };
  }, [map, selectedId, west, south, east, north]);

  useEffect(() => {
    if (!map) return;
    const handleClick = (event: MapMouseEvent) => {
      const ids = event.features?.flatMap(({ properties }) => {
        const id: unknown = properties?.id;
        return typeof id === 'string' ? [id] : [];
      });
      if (ids?.length) onSelect([...new Set(ids)]);
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
      <Layer id="gliders-deployment-fill" type="fill" paint={{ 'fill-color': color.dodgerBlue, 'fill-opacity': 0.2 }} />
      <Layer
        id="gliders-deployment-outlines"
        type="line"
        paint={{ 'line-color': color.calypsoBlue, 'line-width': 1.5 }}
      />
      {selectedId && (
        <Layer
          id="gliders-deployment-selection-outline"
          type="line"
          filter={selectionFilter}
          paint={{ 'line-color': color.primary2, 'line-width': 3 }}
        />
      )}
    </Source>
  );
};

export default GlidersDeploymentLayer;
