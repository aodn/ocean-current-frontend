import { Layer, MapMouseEvent, Source, useMap } from 'react-map-gl/mapbox';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import useArgoStore from '@/stores/argo-store/argoStore';
import { mapboxLayerIds, mapboxSourceIds } from '@/constants/mapboxId';
import { ArgoProfile } from '@/types/argo';
import { useQueryParams, useDeviceType } from '@/hooks';
import { getBoundsFromCoordsArray } from '@/utils/geo-utils/geo';
import { getPropertyFromMapFeatures, waitForMapAnimationAsync } from '../utils';
import useArgoData from '../hooks/useArgoData';

interface ArgoAsProductLayerProps {
  isMiniMap: boolean;
  isArgo: boolean;
}

const { ARGO_AS_PRODUCT_SELECTED_POINT_LAYER_ID, ARGO_AS_PRODUCT_POINT_LAYER_ID, PRODUCT_REGION_BOX_LAYER_ID } =
  mapboxLayerIds;
const { ARGO_AS_PRODUCT_SOURCE_ID } = mapboxSourceIds;

const ArgoAsProductLayer: React.FC<ArgoAsProductLayerProps> = ({ isMiniMap, isArgo }) => {
  const { worldMeteorologicalOrgId: selectedWorldMeteorologicalOrgId } = useArgoStore(
    (state) => state.selectedArgoParams,
  );

  const { argoData, error } = useArgoData();

  if (error) {
    console.error('Failed to fetch Argo data:', error);
  }

  const [hoveredFeatureId, setHoveredFeatureId] = useState<number | string | null>(null);

  const { current: map } = useMap();
  const navigate = useNavigate();
  const eventAdded = useRef(false);

  const { updateQueryParams } = useQueryParams();
  const { isMobile } = useDeviceType();

  const circleRadius = isMobile ? 8 : 6;
  const hoverCircleRadius = isMobile ? 10 : 8;
  const selectedCircleRadius = isMobile ? 14 : 12;

  const handleMouseClick = useCallback(
    async (e: MapMouseEvent) => {
      if (!map) return;

      try {
        const clickedArgoParam = getPropertyFromMapFeatures<ArgoProfile>(map, e, ARGO_AS_PRODUCT_POINT_LAYER_ID, [
          'worldMeteorologicalOrgId',
          'cycle',
          'depth',
          'date',
        ]);
        const { worldMeteorologicalOrgId: clickedWorldMeteorologicalOrgId, cycle, depth, date } = clickedArgoParam;
        if (selectedWorldMeteorologicalOrgId === clickedWorldMeteorologicalOrgId) {
          return;
        }

        const clickedFeature = map
          .queryRenderedFeatures(e.point, { layers: [ARGO_AS_PRODUCT_POINT_LAYER_ID] })
          .find((f) => f.properties?.worldMeteorologicalOrgId === clickedWorldMeteorologicalOrgId);

        if (clickedFeature && clickedFeature.geometry.type === 'Point') {
          const coordinates = clickedFeature.geometry.coordinates as [number, number];
          if (!isMiniMap) {
            map.flyTo({ center: coordinates, duration: 800 });
          }
        }

        await waitForMapAnimationAsync(map);

        const query = new URLSearchParams({
          wmoid: clickedWorldMeteorologicalOrgId,
          cycle,
          depth,
          date: date!,
        }).toString();
        const clickedArgoPath = `/product/argo?${query}`;
        if (!isMiniMap) {
          navigate(clickedArgoPath);
        } else {
          updateQueryParams({
            wmoid: clickedWorldMeteorologicalOrgId,
            cycle,
            depth,
            date: date!,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [map, selectedWorldMeteorologicalOrgId, navigate, updateQueryParams, isMiniMap],
  );

  const handleMouseMove = useCallback(
    (e: MapMouseEvent) => {
      if (!map) return;

      const features = map.queryRenderedFeatures(e.point, {
        layers: [ARGO_AS_PRODUCT_POINT_LAYER_ID],
      });

      const isHoveredArgoFeature = features.length > 0 && features[0]?.id != null;

      if (isHoveredArgoFeature) {
        const hoveredFeature = features[0];
        if (hoveredFeatureId !== null) {
          map.setFeatureState(
            {
              source: ARGO_AS_PRODUCT_SOURCE_ID,
              id: hoveredFeatureId,
            },
            {
              hover: false,
            },
          );
        }

        map.setFeatureState(
          {
            source: ARGO_AS_PRODUCT_SOURCE_ID,
            id: hoveredFeature.id as number,
          },
          {
            hover: true,
          },
        );

        setHoveredFeatureId(hoveredFeature.id!);
      }
    },
    [map, hoveredFeatureId],
  );

  const handleMouseLeave = useCallback(() => {
    if (!map) return;

    if (hoveredFeatureId !== null) {
      map.setFeatureState(
        {
          source: ARGO_AS_PRODUCT_SOURCE_ID,
          id: hoveredFeatureId,
        },
        {
          hover: false,
        },
      );
      setHoveredFeatureId(null);
    }
  }, [map, hoveredFeatureId]);

  useEffect(() => {
    if (!map) return;

    if (!eventAdded.current) {
      eventAdded.current = true;
      map.on('click', [ARGO_AS_PRODUCT_POINT_LAYER_ID, PRODUCT_REGION_BOX_LAYER_ID], handleMouseClick);
      map.on('mousemove', ARGO_AS_PRODUCT_POINT_LAYER_ID, handleMouseMove);
      map.on('mouseleave', ARGO_AS_PRODUCT_POINT_LAYER_ID, handleMouseLeave);
    }

    return () => {
      if (map && eventAdded.current) {
        map.off('click', [ARGO_AS_PRODUCT_POINT_LAYER_ID, PRODUCT_REGION_BOX_LAYER_ID], handleMouseClick);
        map.off('mousemove', ARGO_AS_PRODUCT_POINT_LAYER_ID, handleMouseMove);
        map.off('mouseleave', ARGO_AS_PRODUCT_POINT_LAYER_ID, handleMouseLeave);
        eventAdded.current = false;
      }
    };
  }, [map, handleMouseClick, handleMouseMove, handleMouseLeave]);

  useEffect(() => {
    if (!map || !isMiniMap) return;

    const mapFlyToPoint = (coordinates: [number, number]) => {
      if (map) {
        map.flyTo({ center: coordinates, duration: 800 });
      }
    };

    const argoPoint = argoData.features.find(
      (element) => element.properties.worldMeteorologicalOrgId === selectedWorldMeteorologicalOrgId,
    );
    if (argoPoint?.geometry.coordinates) {
      mapFlyToPoint(argoPoint?.geometry.coordinates);
    }
  }, [argoData.features, isMiniMap, map, selectedWorldMeteorologicalOrgId]);

  useEffect(() => {
    const shouldSkipMapBoundsUpdate = !map || !isArgo || isMiniMap || !argoData || argoData.features.length === 0;
    if (shouldSkipMapBoundsUpdate) return;

    const allCoordinates = argoData?.features.map((feature) => feature.geometry.coordinates);

    const bounds = getBoundsFromCoordsArray(allCoordinates);
    map.fitBounds(bounds, {
      padding: 30,
    });
  }, [map, argoData, isMiniMap, isArgo]);

  return (
    <Source id={ARGO_AS_PRODUCT_SOURCE_ID} type="geojson" data={argoData}>
      <Layer
        id={ARGO_AS_PRODUCT_SELECTED_POINT_LAYER_ID}
        type="circle"
        source={ARGO_AS_PRODUCT_SOURCE_ID}
        paint={{
          'circle-radius': selectedCircleRadius,
          'circle-color': 'white',
          'circle-opacity': 0.5,
          'circle-stroke-width': 1,
          'circle-stroke-color': 'white',
        }}
        filter={['==', 'worldMeteorologicalOrgId', selectedWorldMeteorologicalOrgId]}
      />
      <Layer
        id={ARGO_AS_PRODUCT_POINT_LAYER_ID}
        type="circle"
        source={ARGO_AS_PRODUCT_SOURCE_ID}
        paint={{
          'circle-radius': ['case', ['boolean', ['feature-state', 'hover'], false], hoverCircleRadius, circleRadius],
          'circle-color': '#524DAB',
          'circle-stroke-width': 1,
          'circle-stroke-color': 'white',
        }}
      />
    </Source>
  );
};

export default ArgoAsProductLayer;
