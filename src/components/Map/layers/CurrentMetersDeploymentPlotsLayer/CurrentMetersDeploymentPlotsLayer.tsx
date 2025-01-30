import { Layer, MapMouseEvent, Source, useMap } from 'react-map-gl';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mapboxLayerIds, mapboxSourceIds } from '@/constants/mapboxId';
import { useQueryParams } from '@/hooks';
import {
  CurrentMetersProfileFeature,
  CurrentMetersProfileFeatureCollection,
  CurrentMetersProfileProperties,
} from '@/types/geo';
import useCurrentMetersStore from '@/stores/current-meters-store/currentMeters';
import { currentMetersMapDataPointsFlat } from '@/data/current-meter/mapDataPoints';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import {
  deepADCPDeploymentPlotsData,
  deepADVDeploymentPlotsData,
  mooredInstrumentArrayDeploymentPlotsData,
  shelfDeploymentPlotsData,
  southernOceanDeploymentPlotsData,
} from '@/data/current-meter/sidebarOptions';
import { CurrentMetersDepth, CurrentMetersProperty, CurrentMetersSubproductsKey } from '@/constants/currentMeters';
import { CurrentMetersMapDataPoints } from '@/types/currentMeters';
import { getPropertyFromMapFeatures } from '../../utils/mapUtils';
import { CustomSquareSymbol } from '../../symbols';

const SYMBOL_SIZE = 60;
const SYMBOL_STROKE_WIDTH = 4;
const SYMBOL_STROKE_STYLE = 'rgba(34,34,34,0.5)';

const SQUARE_SIZE_LARGE = 1;
const SQUARE_SIZE_SMALL = 0.6;
const SQUARE_SIZE_THRESHOLD_ZOOM = 5;

const CUSTOM_SQUARE_SYMBOL_IMAGE_NAME = 'outlined-square';
interface ArgoAsProductLayerRendererProps {
  isMiniMap: boolean;
}
const CurrentMetersDeploymentPlotsLayer: React.FC<ArgoAsProductLayerRendererProps> = ({ isMiniMap }) => {
  const { deploymentPlot: selectedDeploymentPlot, date: currentMetersDate } = useCurrentMetersStore();
  const { CURRENT_METERS_DEPLOYMENT_PLOTS_SOURCE_ID } = mapboxSourceIds;
  const {
    // CURRENT_METERS_BOX_LAYER_ID,
    // CURRENT_METERS_BOX_HIGHLIGHT_LAYER_ID,
    CURRENT_METERS_NAME_LABEL_LAYER_ID,
    CURRENT_METERS_SELECTED_BOX_LAYER_ID,
    PRODUCT_REGION_BOX_LAYER_ID,
  } = mapboxLayerIds;
  const { subProduct } = useProductConvert();
  const [subProductDataSet, setSubProductDataSet] =
    useState<CurrentMetersMapDataPoints[]>(currentMetersMapDataPointsFlat);
  const [hoveredFeatureId, setHoveredFeatureId] = useState<string | null>(null);
  const { current: map } = useMap();
  const navigate = useNavigate();
  const eventAdded = useRef(false);
  const { updateQueryParams } = useQueryParams();

  // filter out deployment points available for selected subproduct
  useEffect(() => {
    const dataSetbySubProduct = currentMetersMapDataPointsFlat.filter((point) => {
      switch (subProduct?.key) {
        case CurrentMetersSubproductsKey.SHELF:
          return shelfDeploymentPlotsData.some((prodPoint) => point.name === prodPoint.id);
        case CurrentMetersSubproductsKey.DEEP_ADCP:
          return deepADCPDeploymentPlotsData.some((prodPoint) => point.name === prodPoint.id);
        case CurrentMetersSubproductsKey.DEEP_ADV:
          return deepADVDeploymentPlotsData.some((prodPoint) => point.name === prodPoint.id);
        case CurrentMetersSubproductsKey.SOUTHERN_OCEAN:
          return southernOceanDeploymentPlotsData.some((prodPoint) => point.name === prodPoint.id);
        default:
          return mooredInstrumentArrayDeploymentPlotsData.some((prodPoint) => point.name === prodPoint.id);
      }
    });
    setSubProductDataSet(dataSetbySubProduct);
  }, [subProduct]);

  const deploymentPlotsMapFeatures = subProductDataSet.map(({ name, region, coords }) => {
    return {
      type: 'Feature',
      id: coords[0], // required for hover to work and must be number, do not use as not unique
      properties: {
        title: name,
        region: region,
      },
      geometry: {
        type: 'Point',
        coordinates: coords,
      },
    };
  });

  const currentMetersMapPointsGeoJson: CurrentMetersProfileFeatureCollection = useMemo(() => {
    return {
      type: 'FeatureCollection',
      features: deploymentPlotsMapFeatures as CurrentMetersProfileFeature[],
    };
  }, [deploymentPlotsMapFeatures]);

  const handleMouseClick = useCallback(
    (e: MapMouseEvent) => {
      if (!map) return;

      try {
        const clickedPlot = getPropertyFromMapFeatures<CurrentMetersProfileProperties>(
          map,
          e,
          CURRENT_METERS_NAME_LABEL_LAYER_ID,
          ['title', 'region'],
        );
        const { title, region } = clickedPlot;
        if (selectedDeploymentPlot === title) {
          return;
        }

        const query = new URLSearchParams({
          deploymentPlot: title,
          region,
        }).toString();
        const clickedPlotPath = `/product/current-meters/moored-instrument-array?${query}`;

        if (!isMiniMap) {
          navigate(clickedPlotPath);
        } else {
          updateQueryParams({
            deploymentPlot: title,
            region,
            property: CurrentMetersProperty.vrms,
            depth: CurrentMetersDepth.ONE,
            date: currentMetersDate,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [
      map,
      CURRENT_METERS_NAME_LABEL_LAYER_ID,
      selectedDeploymentPlot,
      isMiniMap,
      navigate,
      updateQueryParams,
      currentMetersDate,
    ],
  );

  const handleMouseMove = useCallback(
    (e: MapMouseEvent) => {
      if (!map) return;

      const features = map.queryRenderedFeatures(e.point, {
        layers: [CURRENT_METERS_NAME_LABEL_LAYER_ID],
      });
      const isHoveredPlotFeature = features.length > 0 && features[0]?.properties?.title != null;

      if (isHoveredPlotFeature) {
        const hoveredFeature = features[0];
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
            id: hoveredFeature.id as number,
          },
          {
            hover: true,
          },
        );

        setHoveredFeatureId(features[0].properties!.title);
      }
    },
    [map, hoveredFeatureId, CURRENT_METERS_NAME_LABEL_LAYER_ID, CURRENT_METERS_DEPLOYMENT_PLOTS_SOURCE_ID],
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
    }

    if (hoveredFeatureId !== null) {
      setHoveredFeatureId(null);
    }
  }, [map, hoveredFeatureId, CURRENT_METERS_DEPLOYMENT_PLOTS_SOURCE_ID]);

  useEffect(() => {
    if (!map) return;

    if (!eventAdded.current) {
      eventAdded.current = true;
      map.on('click', [CURRENT_METERS_NAME_LABEL_LAYER_ID, PRODUCT_REGION_BOX_LAYER_ID], handleMouseClick);
      map.on('mousemove', CURRENT_METERS_NAME_LABEL_LAYER_ID, handleMouseMove);
      map.on('mouseleave', CURRENT_METERS_NAME_LABEL_LAYER_ID, handleMouseLeave);
    }

    return () => {
      if (map && eventAdded.current) {
        map.off('click', [CURRENT_METERS_NAME_LABEL_LAYER_ID, PRODUCT_REGION_BOX_LAYER_ID], handleMouseClick);
        map.off('mousemove', CURRENT_METERS_NAME_LABEL_LAYER_ID, handleMouseMove);
        map.off('mouseleave', CURRENT_METERS_NAME_LABEL_LAYER_ID, handleMouseLeave);
        eventAdded.current = false;
      }
    };
  }, [
    map,
    handleMouseClick,
    handleMouseMove,
    handleMouseLeave,
    CURRENT_METERS_NAME_LABEL_LAYER_ID,
    PRODUCT_REGION_BOX_LAYER_ID,
  ]);

  const mapFlyToPoint = useCallback(
    (coordinates: [number, number]) => {
      if (map) {
        map.flyTo({ center: coordinates, duration: 800 });
      }
    },
    [map],
  );

  useEffect(() => {
    if (!map) return;

    const deploymentPoints = currentMetersMapPointsGeoJson.features.find(
      (point) => point.properties?.title === selectedDeploymentPlot,
    );
    if (deploymentPoints?.geometry.coordinates) {
      mapFlyToPoint(deploymentPoints?.geometry.coordinates);
    }
  }, [map, mapFlyToPoint, currentMetersMapPointsGeoJson.features, selectedDeploymentPlot]);

  useEffect(() => {
    if (!map) {
      return;
    }

    const outlinedSquare = new CustomSquareSymbol(SYMBOL_SIZE, SYMBOL_STROKE_STYLE, SYMBOL_STROKE_WIDTH);

    map.addImage(CUSTOM_SQUARE_SYMBOL_IMAGE_NAME, outlinedSquare, { pixelRatio: 2 });

    return () => {
      if (!map.hasImage(CUSTOM_SQUARE_SYMBOL_IMAGE_NAME)) {
        return;
      }
      map.removeImage(CUSTOM_SQUARE_SYMBOL_IMAGE_NAME);
    };
  }, [map]);

  const mapZoom = map?.getZoom();
  const squareSize = useMemo(() => {
    if (typeof mapZoom !== 'number') {
      return SQUARE_SIZE_SMALL;
    }
    return mapZoom > SQUARE_SIZE_THRESHOLD_ZOOM ? SQUARE_SIZE_LARGE : SQUARE_SIZE_SMALL;
  }, [mapZoom]);

  return (
    <Source
      type="geojson"
      data={currentMetersMapPointsGeoJson}
      id={CURRENT_METERS_DEPLOYMENT_PLOTS_SOURCE_ID}
      cluster={true}
      clusterMaxZoom={4}
      clusterRadius={10}
    >
      <Layer
        id={CURRENT_METERS_SELECTED_BOX_LAYER_ID}
        type="line"
        source={CURRENT_METERS_DEPLOYMENT_PLOTS_SOURCE_ID}
        paint={{ 'line-color': '#000', 'line-width': 2 }}
        filter={['==', 'name', selectedDeploymentPlot]}
      />
      <Layer
        source={CURRENT_METERS_DEPLOYMENT_PLOTS_SOURCE_ID}
        type="symbol"
        layout={{
          'icon-image': CUSTOM_SQUARE_SYMBOL_IMAGE_NAME,
          'icon-size': squareSize,
          'icon-allow-overlap': true,
        }}
      />
      <Layer
        id={CURRENT_METERS_NAME_LABEL_LAYER_ID}
        type="symbol"
        source={CURRENT_METERS_DEPLOYMENT_PLOTS_SOURCE_ID}
        layout={{
          'text-field': ['get', 'title'],
          'text-size': 14,
          'text-justify': 'center',
          'text-anchor': 'center',
        }}
      />
    </Source>
  );
};

export default CurrentMetersDeploymentPlotsLayer;
