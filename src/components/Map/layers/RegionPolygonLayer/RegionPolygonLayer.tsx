import React, { useCallback, useEffect, useState } from 'react';
import { Layer, LngLatBounds, MapMouseEvent, Source, useMap } from 'react-map-gl';
import dayjs from 'dayjs';
import { mapboxLayerIds, mapboxSourceIds } from '@/constants/mapboxId';
import { useDebounce, useProductSearchParam, useQueryParams } from '@/hooks';
import useProductPath from '@/stores/product-store/hooks/useProductPath';
import { BoundingBox, GeoJsonPolygon } from '@/types/map';
import useProductStore from '@/stores/product-store/productStore';
import { getRegionByRegionTitleOrCode } from '@/utils/region-utils/region';
import { convertGeoJsonCoordinatesToBBox } from '@/utils/geo-utils/geo';
import useCurrentMetersStore from '@/stores/current-meters-store/currentMeters';
import { getPropertyFromMapFeatures } from '../../utils/mapUtils';
import useVisibleRegionPolygons from '../../hooks/useVisibleRegionPolygons';

const DEFAULT_MIN_THRESHOLD_PERCENTAGE = 1.8;
const DEFAULT_MAX_THRESHOLD_PERCENTAGE = 70;

interface RegionPolygonLayerProps {
  shouldKeepNationalRegion?: boolean;
  shouldFitNationalRegionBounds?: boolean;
  minThresholdPercentage?: number;
  maxThresholdPercentage?: number;
}
const RegionPolygonLayer: React.FC<RegionPolygonLayerProps> = ({
  shouldKeepNationalRegion = false,
  shouldFitNationalRegionBounds = false,
  minThresholdPercentage = DEFAULT_MIN_THRESHOLD_PERCENTAGE,
  maxThresholdPercentage = DEFAULT_MAX_THRESHOLD_PERCENTAGE,
}) => {
  const { PRODUCT_REGION_BOX_SOURCE_ID } = mapboxSourceIds;
  const {
    PRODUCT_REGION_BOX_LAYER_ID,
    PRODUCT_REGION_NAME_LABEL_LAYER_ID,
    PRODUCT_REGION_SELECTED_BOX_LAYER_ID,
    ARGO_AS_PRODUCT_POINT_LAYER_ID,
  } = mapboxLayerIds;

  const useRegionTitle = useProductStore((state) => state.productParams.regionTitle);
  const baseProductPath = useProductPath();
  const { searchParams, updateQueryParamsAndNavigate } = useQueryParams();
  const { region: regionTitleFromUrl } = useProductSearchParam();
  const selectedRegion = useRegionTitle || 'Au';

  const {
    property: currentMetersProperty,
    depth: currentMetersDepth,
    date: currentMetersDate,
  } = useCurrentMetersStore();

  const { current: map } = useMap();

  const [hoveredRegion, setHoveredRegion] = useState<string>('');
  const [mapBounds, setMapBounds] = useState<LngLatBounds | null>(null);
  const [hoveredId, setHoveredId] = useState<string | number | null>(null);

  const defaultTargetDate = dayjs().subtract(2, 'day').format('YYYYMMDD');

  const mapFitBounds = useCallback(
    (bounds: BoundingBox, padding: number = 50) => {
      if (map) {
        map.fitBounds(bounds, { padding });
      }
    },
    [map],
  );

  useEffect(() => {
    if (!map) return;

    // set initial map bounds
    setMapBounds(map.getBounds());

    const regionTitle = regionTitleFromUrl || 'Australia/NZ';
    const region = getRegionByRegionTitleOrCode(regionTitle);

    if (region && shouldFitNationalRegionBounds) {
      mapFitBounds(region.coords);
    }
  }, [map, regionTitleFromUrl, mapFitBounds, shouldFitNationalRegionBounds]);

  const debouncedUpdateMapBounds = useDebounce(() => {
    if (map) {
      setMapBounds(map.getBounds());
    }
  }, 300);

  useEffect(() => {
    if (!map) return;

    map.on('zoom', debouncedUpdateMapBounds);

    return () => {
      map.off('zoom', debouncedUpdateMapBounds);
    };
  }, [map, debouncedUpdateMapBounds]);

  const geoJsonData = useVisibleRegionPolygons(
    mapBounds,
    minThresholdPercentage,
    maxThresholdPercentage,
    shouldKeepNationalRegion,
  );

  const handleMouseMove = useCallback(
    (e: MapMouseEvent) => {
      if (!map) return;

      const containsArgoLayer = map.getStyle()?.layers?.find((layer) => layer.id === ARGO_AS_PRODUCT_POINT_LAYER_ID);
      const layersToCheck = containsArgoLayer
        ? [PRODUCT_REGION_BOX_LAYER_ID, ARGO_AS_PRODUCT_POINT_LAYER_ID]
        : [PRODUCT_REGION_BOX_LAYER_ID];
      const features = map.queryRenderedFeatures(e.point, {
        layers: layersToCheck,
      });

      const isRegionHovered =
        features &&
        features.length > 0 &&
        features[0]?.geometry?.type === 'Polygon' &&
        features[0].id != null &&
        features[0].id != undefined;
      if (isRegionHovered) {
        setHoveredId(features[0].id!);
      }

      const checkIfArgoPoint = features.find((feature) => feature?.layer?.id === ARGO_AS_PRODUCT_POINT_LAYER_ID);

      if (checkIfArgoPoint) {
        setHoveredRegion('');
        setHoveredId(null);
      } else {
        const { name: regionName } = getPropertyFromMapFeatures<{ name: string }>(map, e, PRODUCT_REGION_BOX_LAYER_ID, [
          'name',
        ]);

        if (regionName) {
          setHoveredRegion(regionName);
        }
      }
    },
    [ARGO_AS_PRODUCT_POINT_LAYER_ID, PRODUCT_REGION_BOX_LAYER_ID, map],
  );

  const handleMouseClick = useCallback(
    (e: MapMouseEvent) => {
      if (!hoveredRegion || !map) {
        return;
      }
      const containsArgoLayer = map.getStyle()?.layers?.find((layer) => layer.id === ARGO_AS_PRODUCT_POINT_LAYER_ID);
      const layersToCheck = containsArgoLayer
        ? [PRODUCT_REGION_BOX_LAYER_ID, ARGO_AS_PRODUCT_POINT_LAYER_ID]
        : [PRODUCT_REGION_BOX_LAYER_ID];
      const features = map.queryRenderedFeatures(e.point, {
        layers: layersToCheck,
      });

      const hasArgoPoint = features.find((feature) => feature?.layer?.id === ARGO_AS_PRODUCT_POINT_LAYER_ID);
      if (hasArgoPoint) {
        return;
      }

      if (features.length > 0 && features[0]?.geometry?.type === 'Polygon') {
        const regionBounds = convertGeoJsonCoordinatesToBBox(features[0].geometry.coordinates as GeoJsonPolygon);
        mapFitBounds(regionBounds);
      }

      const { name: regionName, code: regionCode } = getPropertyFromMapFeatures<{ name: string; code: string }>(
        map,
        e,
        PRODUCT_REGION_BOX_LAYER_ID,
        ['name', 'code'],
      );

      if (regionName) {
        const targetPath = `/product/${baseProductPath}`;

        let queryObject = {};
        if (baseProductPath === 'current-meters/moored-instrument-array') {
          queryObject = {
            date: currentMetersDate,
            region: regionCode,
            depth: currentMetersDepth,
            property: currentMetersProperty,
            deploymentPlot: null,
          };
        } else {
          const dateFromQuery = searchParams.date;
          queryObject = dateFromQuery ? { region: regionName } : { region: regionName, date: defaultTargetDate };
        }

        updateQueryParamsAndNavigate(targetPath, queryObject);
      }
    },
    [
      ARGO_AS_PRODUCT_POINT_LAYER_ID,
      PRODUCT_REGION_BOX_LAYER_ID,
      baseProductPath,
      currentMetersDate,
      currentMetersDepth,
      currentMetersProperty,
      defaultTargetDate,
      hoveredRegion,
      map,
      mapFitBounds,
      searchParams.date,
      updateQueryParamsAndNavigate,
    ],
  );

  const handleMouseLeave = useCallback(() => {
    if (!map) return;
    setHoveredRegion('');
    setHoveredId(null);
  }, [map]);

  useEffect(() => {
    if (!map) return;

    map.on('mousemove', PRODUCT_REGION_BOX_LAYER_ID, handleMouseMove);
    map.on('mouseleave', PRODUCT_REGION_BOX_LAYER_ID, handleMouseLeave);
    map.on('click', PRODUCT_REGION_BOX_LAYER_ID, handleMouseClick);

    return () => {
      map.off('click', PRODUCT_REGION_BOX_LAYER_ID, handleMouseClick);
      map.off('mouseleave', PRODUCT_REGION_BOX_LAYER_ID, handleMouseLeave);
      map.off('mousemove', PRODUCT_REGION_BOX_LAYER_ID, handleMouseMove);
    };
  }, [PRODUCT_REGION_BOX_LAYER_ID, handleMouseClick, handleMouseLeave, handleMouseMove, map]);

  return (
    <Source id={PRODUCT_REGION_BOX_SOURCE_ID} type="geojson" data={geoJsonData}>
      <Layer
        id={PRODUCT_REGION_BOX_LAYER_ID}
        type="fill"
        source={PRODUCT_REGION_BOX_SOURCE_ID}
        paint={{
          'fill-color': ['case', ['==', ['id'], hoveredId], 'rgba(58, 77, 143, 0.2)', 'rgba(19, 40, 113, 0)'],
          'fill-outline-color': ['case', ['==', ['id'], hoveredId], 'rgba(58, 92, 143, 0.8)', 'rgba(47, 0, 179, 0.3)'],
        }}
      />
      <Layer
        type="line"
        source={PRODUCT_REGION_BOX_SOURCE_ID}
        paint={{
          'line-color': 'rgba(34,34,34,0.5)',
          'line-width': ['case', ['==', ['id'], hoveredId], 3.5, 2.4],
        }}
      />
      <Layer
        id={PRODUCT_REGION_NAME_LABEL_LAYER_ID}
        type="symbol"
        source={PRODUCT_REGION_BOX_SOURCE_ID}
        layout={{
          'text-field': ['get', 'name'],
          'text-size': 16,
          'text-justify': 'center',
          'text-anchor': 'center',
        }}
        paint={{
          'text-color': '#fff',
        }}
        filter={['==', 'name', hoveredRegion]}
      />
      <Layer
        type="symbol"
        source={PRODUCT_REGION_BOX_SOURCE_ID}
        layout={{
          'text-field': ['get', 'name'],
          'text-size': 16,
          'text-justify': 'center',
          'text-anchor': 'center',
        }}
        paint={{
          'text-color': '#fff',
        }}
        filter={['==', 'name', selectedRegion]}
      />
      <Layer
        id={PRODUCT_REGION_SELECTED_BOX_LAYER_ID}
        type="line"
        source={PRODUCT_REGION_BOX_SOURCE_ID}
        paint={{
          'line-color': 'rgba(58, 92, 143, 0.8)',
          'line-width': 3,
        }}
        filter={['==', 'name', selectedRegion]}
      />
    </Source>
  );
};

export default RegionPolygonLayer;
