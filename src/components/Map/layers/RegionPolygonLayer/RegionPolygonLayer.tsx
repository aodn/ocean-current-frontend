import React, { useCallback, useEffect, useState } from 'react';
import { Layer, LngLatBounds, MapMouseEvent, Source, useMap } from 'react-map-gl';
import dayjs from 'dayjs';
import { mapboxLayerIds, mapboxSourceIds } from '@/constants/mapboxId';
import { useProductSearchParam, useQueryParams, useThrottle } from '@/hooks';
import useProductPath from '@/stores/product-store/hooks/useProductPath';
import { BoundingBox, GeoJsonPolygon } from '@/types/map';
import useProductStore from '@/stores/product-store/productStore';
import { getRegionByRegionTitle } from '@/utils/region-utils/region';
import { convertGeoJsonCoordinatesToBBox } from '@/utils/geo-utils/geo';
import { getPropertyFromMapFeatures } from '../../utils/mapUtils';
import useVisibleRegionPolygons from '../../hooks/useVisibleRegionPolygons';

const MIN_THRESHOLD_PERCENTAGE = 3;
const MAX_THRESHOLD_PERCENTAGE = 70;

interface RegionPolygonLayerProps {
  shouldKeepNationalRegion?: boolean;
  shouldFitNationalRegionBounds?: boolean;
}
const RegionPolygonLayer: React.FC<RegionPolygonLayerProps> = ({
  shouldKeepNationalRegion = false,
  shouldFitNationalRegionBounds = false,
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

  const { current: map } = useMap();

  const [hoveredRegion, setHoveredRegion] = useState<string>('');
  const [mapBounds, setMapBounds] = useState<LngLatBounds | null>(null);
  const [hoveredId, setHoveredId] = useState<string | number | null>(null);

  const defaultTargetDate = dayjs().subtract(2, 'day').format('YYYYMMDD');

  const throttleSetMapBounds = useThrottle((bounds: LngLatBounds) => {
    setMapBounds(bounds);
  }, 300);

  const mapFitBounds = useCallback(
    (bounds: BoundingBox) => {
      if (map) {
        map.fitBounds(bounds, { padding: 50 });
      }
    },
    [map],
  );

  useEffect(() => {
    if (!map) return;

    map.on('load', () => {
      const regionTitle = regionTitleFromUrl || 'Australia/NZ';
      const region = getRegionByRegionTitle(regionTitle);

      if (region && shouldFitNationalRegionBounds) {
        mapFitBounds(region.coords);
      }
    });
  }, [map, regionTitleFromUrl, mapFitBounds, shouldFitNationalRegionBounds]);

  useEffect(() => {
    if (!map) return;

    const handleMapChange = () => {
      const bounds = map.getBounds();
      throttleSetMapBounds(bounds);
    };

    map.on('zoom', handleMapChange);
    setMapBounds(map.getBounds());

    return () => {
      map.off('zoom', handleMapChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  const geoJsonData = useVisibleRegionPolygons(
    mapBounds,
    MIN_THRESHOLD_PERCENTAGE,
    MAX_THRESHOLD_PERCENTAGE,
    shouldKeepNationalRegion,
  );

  useEffect(() => {
    if (!map) return;

    const handleMouseMove = (e: MapMouseEvent) => {
      const containsArgoLayer = map.getStyle().layers?.find((layer) => layer.id === ARGO_AS_PRODUCT_POINT_LAYER_ID);
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

      const checkIfArgoPoint = features.find((feature) => feature.layer.id === ARGO_AS_PRODUCT_POINT_LAYER_ID);

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
    };

    const handleMouseClick = (e: MapMouseEvent) => {
      if (!hoveredRegion) {
        return;
      }
      const containsArgoLayer = map.getStyle().layers?.find((layer) => layer.id === ARGO_AS_PRODUCT_POINT_LAYER_ID);
      const layersToCheck = containsArgoLayer
        ? [PRODUCT_REGION_BOX_LAYER_ID, ARGO_AS_PRODUCT_POINT_LAYER_ID]
        : [PRODUCT_REGION_BOX_LAYER_ID];
      const features = map.queryRenderedFeatures(e.point, {
        layers: layersToCheck,
      });

      const hasArgoPoint = features.find((feature) => feature.layer.id === ARGO_AS_PRODUCT_POINT_LAYER_ID);
      if (hasArgoPoint) {
        return;
      }

      if (features.length > 0 && features[0]?.geometry?.type === 'Polygon') {
        const regionBounds = convertGeoJsonCoordinatesToBBox(features[0].geometry.coordinates as GeoJsonPolygon);
        mapFitBounds(regionBounds);
      }

      const { name: regionName } = getPropertyFromMapFeatures<{ name: string }>(map, e, PRODUCT_REGION_BOX_LAYER_ID, [
        'name',
      ]);

      if (regionName) {
        const targetPath = `/product/${baseProductPath}`;

        const dateFromQuery = searchParams.date;
        const queryObject = dateFromQuery ? { region: regionName } : { region: regionName, date: defaultTargetDate };
        updateQueryParamsAndNavigate(targetPath, queryObject);
      }
    };

    const handleMouseLeave = () => {
      setHoveredRegion('');
      setHoveredId(null);
    };

    map.on('mousemove', PRODUCT_REGION_BOX_LAYER_ID, handleMouseMove);
    map.on('mouseleave', PRODUCT_REGION_BOX_LAYER_ID, handleMouseLeave);
    map.on('click', PRODUCT_REGION_BOX_LAYER_ID, handleMouseClick);

    return () => {
      map.off('click', PRODUCT_REGION_BOX_LAYER_ID, handleMouseClick);
      map.off('mouseleave', PRODUCT_REGION_BOX_LAYER_ID, handleMouseLeave);
      map.off('mousemove', PRODUCT_REGION_BOX_LAYER_ID, handleMouseMove);
    };
  }, [
    map,
    PRODUCT_REGION_BOX_LAYER_ID,
    searchParams.date,
    updateQueryParamsAndNavigate,
    defaultTargetDate,
    baseProductPath,
    mapFitBounds,
    ARGO_AS_PRODUCT_POINT_LAYER_ID,
    hoveredRegion,
  ]);

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
