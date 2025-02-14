import { Layer, MapMouseEvent, Source, useMap } from 'react-map-gl';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mapboxLayerIds, mapboxSourceIds } from '@/constants/mapboxId';
import { useQueryParams } from '@/hooks';
import { CurrentMetersProfileProperties } from '@/types/geo';
import useCurrentMetersStore, { setDeploymentPlot } from '@/stores/current-meters-store/currentMeters';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import { yearOptionsData } from '@/data/current-meter/sidebarOptions';
import { mooredInstrumentArrayPath } from '@/constants/currentMeters';
import { getPropertyFromMapFeatures } from '../utils/mapUtils';
import getCurrentMetersDeploymentPlotsGeoJson from '../utils/getCurrentMetersDeploymentPlotsGeoJson';

interface CurrentMetersDeploymentPlotsLayerProps {
  isMiniMap: boolean;
}

const circleRadius = 6;
const hoverCircleRadius = 8;
const selectedCircleRadius = 12;
const { CURRENT_METERS_DEPLOYMENT_PLOTS_SOURCE_ID } = mapboxSourceIds;
const { CURRENT_METERS_BOX_LAYER_ID, CURRENT_METERS_SELECTED_BOX_LAYER_ID, PRODUCT_REGION_BOX_LAYER_ID } =
  mapboxLayerIds;

const CurrentMetersDeploymentPlotsLayer: React.FC<CurrentMetersDeploymentPlotsLayerProps> = ({ isMiniMap }) => {
  const { deploymentPlot: selectedDeploymentPlot } = useCurrentMetersStore();
  const { subProduct } = useProductConvert();
  const [hoveredFeatureId, setHoveredFeatureId] = useState<string | number | null>(null);
  const { current: map } = useMap();
  const navigate = useNavigate();
  const eventAdded = useRef(false);
  const { updateQueryParams } = useQueryParams();

  const currentMetersMapPointsGeoJson = useMemo(() => getCurrentMetersDeploymentPlotsGeoJson(subProduct), [subProduct]);

  const handleMouseClick = useCallback(
    (e: MapMouseEvent) => {
      if (!map) return;

      try {
        const clickedPlot = getPropertyFromMapFeatures<CurrentMetersProfileProperties>(
          map,
          e,
          CURRENT_METERS_BOX_LAYER_ID,
          ['title', 'region'],
        );
        const { title, region } = clickedPlot;
        setDeploymentPlot(title);

        if (selectedDeploymentPlot === title) {
          return;
        }

        const query = new URLSearchParams({
          deploymentPlot: title,
          region,
        }).toString();
        const clickedPlotPath = `/product/current-meters/${mooredInstrumentArrayPath}?${query}`;

        if (!isMiniMap) {
          navigate(clickedPlotPath);
        } else {
          updateQueryParams({
            deploymentPlot: title,
            region,
            date: yearOptionsData[0].id, // all time
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [map, selectedDeploymentPlot, isMiniMap, navigate, updateQueryParams],
  );

  const handleMouseMove = useCallback(
    (e: MapMouseEvent) => {
      if (!map) return;

      const features = map.queryRenderedFeatures(e.point, {
        layers: [CURRENT_METERS_BOX_LAYER_ID],
      });

      const isHoveredPlotFeature = features.length > 0 && features[0]?.id != null;

      if (isHoveredPlotFeature) {
        map.getCanvas().style.cursor = 'pointer';
        if (hoveredFeatureId !== null) {
          map.setFeatureState(
            {
              source: CURRENT_METERS_DEPLOYMENT_PLOTS_SOURCE_ID,
              id: hoveredFeatureId,
            },
            {
              hover: false,
            },
          );
        }

        map.setFeatureState(
          {
            source: CURRENT_METERS_DEPLOYMENT_PLOTS_SOURCE_ID,
            id: features[0]?.id as number,
          },
          {
            hover: true,
          },
        );

        setHoveredFeatureId(features[0]?.id as number);
      } else {
        map.getCanvas().style.cursor = '';
      }
    },
    [map, hoveredFeatureId],
  );

  const handleMouseLeave = useCallback(() => {
    if (!map) return;

    if (hoveredFeatureId !== null) {
      map.setFeatureState(
        {
          source: CURRENT_METERS_DEPLOYMENT_PLOTS_SOURCE_ID,
          id: hoveredFeatureId,
        },
        {
          hover: false,
        },
      );
      setHoveredFeatureId(null);
    }
    map.getCanvas().style.cursor = '';
  }, [map, hoveredFeatureId]);

  useEffect(() => {
    if (!map) return;

    if (!eventAdded.current) {
      eventAdded.current = true;
      map.on('click', [CURRENT_METERS_BOX_LAYER_ID, PRODUCT_REGION_BOX_LAYER_ID], handleMouseClick);
      map.on('mousemove', CURRENT_METERS_BOX_LAYER_ID, handleMouseMove);
      map.on('mouseleave', CURRENT_METERS_BOX_LAYER_ID, handleMouseLeave);
    }

    return () => {
      if (map && eventAdded.current) {
        map.off('click', [CURRENT_METERS_BOX_LAYER_ID, PRODUCT_REGION_BOX_LAYER_ID], handleMouseClick);
        map.off('mousemove', CURRENT_METERS_BOX_LAYER_ID, handleMouseMove);
        map.off('mouseleave', CURRENT_METERS_BOX_LAYER_ID, handleMouseLeave);
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

    const selectedDeploymentPointData = currentMetersMapPointsGeoJson.features.find(
      (point) => point.properties?.title === selectedDeploymentPlot,
    );

    if (selectedDeploymentPointData?.geometry.coordinates) {
      mapFlyToPoint(selectedDeploymentPointData?.geometry.coordinates);
    }
  }, [currentMetersMapPointsGeoJson, isMiniMap, map, selectedDeploymentPlot]);

  return (
    <Source type="geojson" data={currentMetersMapPointsGeoJson} id={CURRENT_METERS_DEPLOYMENT_PLOTS_SOURCE_ID}>
      <Layer
        id={CURRENT_METERS_SELECTED_BOX_LAYER_ID}
        type="circle"
        source={CURRENT_METERS_DEPLOYMENT_PLOTS_SOURCE_ID}
        paint={{
          'circle-radius': selectedCircleRadius,
          'circle-color': 'white',
          'circle-opacity': 0.5,
          'circle-stroke-width': 1,
          'circle-stroke-color': 'white',
        }}
        filter={['==', 'title', selectedDeploymentPlot]}
      />
      <Layer
        id={CURRENT_METERS_BOX_LAYER_ID}
        type="circle"
        source={CURRENT_METERS_DEPLOYMENT_PLOTS_SOURCE_ID}
        paint={{
          'circle-radius': ['case', ['boolean', ['feature-state', 'hover'], false], hoverCircleRadius, circleRadius],
          'circle-color': '#00FF00',
          'circle-stroke-width': 1,
          'circle-stroke-color': 'black',
        }}
      />
    </Source>
  );
};

export default CurrentMetersDeploymentPlotsLayer;
