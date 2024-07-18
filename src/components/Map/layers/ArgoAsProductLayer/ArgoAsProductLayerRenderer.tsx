import { Layer, MapMouseEvent, Source, useMap } from 'react-map-gl';
import React, { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useArgoStore from '@/stores/argo-store/argoStore';
import { mapboxLayerIds, mapboxSourceIds } from '@/constants/mapboxId';
import { ArgoProfile } from '@/types/argo';
import { useQueryParams } from '@/hooks';
import { ArgoProfileFeatureCollection } from '@/types/geo';
import { getPropertyFromMapFeatures } from '../../utils/mapUtils';

interface ArgoAsProductLayerRendererProps {
  isMiniMap: boolean;
  argoData: ArgoProfileFeatureCollection;
}
const ArgoAsProductLayerRenderer: React.FC<ArgoAsProductLayerRendererProps> = ({ isMiniMap, argoData }) => {
  const { worldMeteorologicalOrgId: selectedWorldMeteorologicalOrgId } = useArgoStore(
    (state) => state.selectedArgoParams,
  );
  const { argoAsProductSelectedPointLayer, argoAsProductPointLayer } = mapboxLayerIds;
  const { argoAsProductSource } = mapboxSourceIds;
  const { current: map } = useMap();
  const navigate = useNavigate();
  const eventAdded = useRef(false);

  const { searchParams, updateQueryParams } = useQueryParams();

  const mapFlyToPoint = useCallback(
    (coordinates: [number, number]) => {
      if (map) {
        map.flyTo({ center: coordinates, duration: 800 });
      }
    },
    [map],
  );

  const handleClick = useCallback(
    (e: MapMouseEvent) => {
      if (!map) return;

      try {
        const clickedArgoParam = getPropertyFromMapFeatures<ArgoProfile>(map, e, argoAsProductPointLayer, [
          'worldMeteorologicalOrgId',
          'cycle',
          'depth',
          'date',
        ]);
        const { worldMeteorologicalOrgId: clickedWorldMeteorologicalOrgId, cycle, depth, date } = clickedArgoParam;
        if (selectedWorldMeteorologicalOrgId === clickedWorldMeteorologicalOrgId) {
          return;
        }
        const query = new URLSearchParams({
          wmoid: clickedWorldMeteorologicalOrgId,
          cycle,
          depth,
          date: date!,
          startDate: searchParams.startDate,
          endDate: searchParams.endDate,
        }).toString();
        const clickedArgoPath = `/product/argo?${query}`;
        if (!isMiniMap) {
          navigate(clickedArgoPath);
        } else {
          updateQueryParams({ wmoid: clickedWorldMeteorologicalOrgId, cycle, depth, date: date! });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [
      map,
      argoAsProductPointLayer,
      selectedWorldMeteorologicalOrgId,
      navigate,
      searchParams,
      updateQueryParams,
      isMiniMap,
    ],
  );

  useEffect(() => {
    if (!map) return;

    if (!eventAdded.current) {
      eventAdded.current = true;
      map.on('click', argoAsProductPointLayer, handleClick);
    }

    return () => {
      if (map && eventAdded.current) {
        map.off('click', argoAsProductPointLayer, handleClick);
        eventAdded.current = false;
      }
    };
  }, [argoAsProductPointLayer, map, navigate, handleClick]);

  useEffect(() => {
    if (!map || !isMiniMap) return;

    const argoPoint = argoData.features.find(
      (element) => element.properties.worldMeteorologicalOrgId === selectedWorldMeteorologicalOrgId,
    );
    if (argoPoint?.geometry.coordinates) {
      mapFlyToPoint(argoPoint?.geometry.coordinates);
    }
  }, [map, mapFlyToPoint, argoData, selectedWorldMeteorologicalOrgId, isMiniMap]);

  return (
    <Source id={argoAsProductSource} type="geojson" data={argoData}>
      <Layer
        id={argoAsProductSelectedPointLayer}
        type="circle"
        source={argoAsProductSource}
        paint={{
          'circle-radius': 15,
          'circle-color': 'white',
          'circle-opacity': 0.5,
          'circle-stroke-width': 1,
          'circle-stroke-color': 'white',
        }}
        filter={['==', 'worldMeteorologicalOrgId', selectedWorldMeteorologicalOrgId]}
      />
      <Layer
        id={argoAsProductPointLayer}
        type="circle"
        source={argoAsProductSource}
        paint={{
          'circle-radius': 8,
          'circle-color': '#524DAB',
          'circle-stroke-width': 1,
          'circle-stroke-color': 'white',
        }}
      />
    </Source>
  );
};

export default ArgoAsProductLayerRenderer;
