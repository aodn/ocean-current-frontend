import React, { useCallback, useEffect, useState } from 'react';
import { Layer, MapMouseEvent, Source, useMap } from 'react-map-gl';
import dayjs from 'dayjs';
import { mapboxLayerIds, mapboxSourceIds } from '@/constants/mapboxId';
import { useProductSearchParam, useQueryParams } from '@/hooks';
import useProductPath from '@/stores/product-store/hooks/useProductPath';
import { BoundingBox, GeoJsonPolygon } from '@/types/map';
import { getRegionByRegionTitle } from '@/utils/region-utils/region';
import { convertGeoJsonCoordinatesToBBox } from '@/utils/geo-utils/geo';
import useCurrentMetersStore from '@/stores/current-meters-store/currentMeters';
import { mooredInstrumentArrayPath } from '@/constants/currentMeters';
import { color } from '@/styles/colors';
import { getPropertyFromMapFeatures } from '../utils/mapUtils';
import useRegionPolygons from '../hooks/useRegionPolygons';

interface RegionPolygonLayerProps {
  isMiniMap: boolean;
}

const { PRODUCT_REGION_BOX_SOURCE_ID } = mapboxSourceIds;
const {
  PRODUCT_REGION_BOX_LAYER_ID,
  PRODUCT_REGION_NAME_LABEL_LAYER_ID,
  PRODUCT_REGION_SELECTED_BOX_LAYER_ID,
  ARGO_AS_PRODUCT_POINT_LAYER_ID,
} = mapboxLayerIds;

const RegionPolygonLayer: React.FC<RegionPolygonLayerProps> = ({ isMiniMap }) => {
  const baseProductPath = useProductPath();
  const { searchParams, updateQueryParamsAndNavigate } = useQueryParams();
  const { region: regionTitleFromUrl } = useProductSearchParam();
  const selectedRegion = regionTitleFromUrl || 'Au';
  const regionGeoJsonData = useRegionPolygons();
  const isChla = baseProductPath.includes('ocean-colour');

  const {
    property: currentMetersProperty,
    depth: currentMetersDepth,
    date: currentMetersDate,
  } = useCurrentMetersStore();

  const { current: map } = useMap();

  const [hoveredRegion, setHoveredRegion] = useState<string>('');
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

    const regionTitle = regionTitleFromUrl || 'Australia/NZ';
    const region = getRegionByRegionTitle(regionTitle);

    if (region) {
      // zoom in on EAC Mooring Array's only region when in main map view
      if (baseProductPath === 'eac-mooring-array') {
        mapFitBounds(region.coords, 20);
      }
      // so that Antarctica region is visible in map
      else if (baseProductPath === 'seal-ctd/tracks' && !isMiniMap) {
        mapFitBounds(region.coords, 200);
      }

      // default to selected region
      else {
        mapFitBounds(region.coords);
      }
    }
  }, [map, regionTitleFromUrl, mapFitBounds, isMiniMap, baseProductPath]);

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
    [map],
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
        if (baseProductPath.includes(mooredInstrumentArrayPath)) {
          queryObject = {
            date: currentMetersDate,
            region: regionCode,
            depth: currentMetersDepth,
            property: currentMetersProperty,
            deploymentPlot: null,
          };
        } else {
          const dateFromQuery = searchParams.date;
          queryObject = dateFromQuery
            ? { region: regionName, point: null }
            : { region: regionName, date: defaultTargetDate, point: null };
        }

        updateQueryParamsAndNavigate(targetPath, queryObject);
      }
    },
    [
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
  }, [handleMouseClick, handleMouseLeave, handleMouseMove, map]);

  return (
    <Source id={PRODUCT_REGION_BOX_SOURCE_ID} type="geojson" data={regionGeoJsonData}>
      <Layer
        id={PRODUCT_REGION_BOX_LAYER_ID}
        type="fill"
        source={PRODUCT_REGION_BOX_SOURCE_ID}
        paint={{
          'fill-color': [
            'case',
            ['==', ['id'], hoveredId],
            isChla ? 'rgba(58, 77, 143, 0.8)' : 'rgba(255,255,255,0.75)',
            'rgba(19, 40, 113, 0)',
          ],
          'fill-outline-color': ['case', ['==', ['id'], hoveredId], 'rgba(58, 92, 143, 0.8)', 'rgba(47, 0, 179, 0.3)'],
        }}
      />
      <Layer
        type="line"
        source={PRODUCT_REGION_BOX_SOURCE_ID}
        paint={{
          'line-color': ['case', ['==', ['id'], hoveredId], 'rgba(34,34,34, 0.7)', 'rgba(34,34,34,0.5)'],
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
          'text-font': ['Open Sans Bold'],
        }}
        paint={{
          'text-color': isChla ? '#fff' : '#000000',
        }}
        filter={['==', 'name', hoveredRegion]}
      />

      <Layer
        id={PRODUCT_REGION_SELECTED_BOX_LAYER_ID}
        type="line"
        source={PRODUCT_REGION_BOX_SOURCE_ID}
        paint={{
          'line-color': color.primary2,
          'line-width': 5,
        }}
        filter={['==', 'name', selectedRegion]}
      />
      <Layer
        type="symbol"
        source={PRODUCT_REGION_BOX_SOURCE_ID}
        layout={{
          'text-field': ['get', 'name'],
          'text-size': 16,
          'text-justify': 'center',
          'text-anchor': 'center',
          'text-font': ['Open Sans Bold'],
        }}
        paint={{
          'text-color': isChla ? '#fff' : '#000000',
        }}
        filter={['==', 'name', selectedRegion]}
      />
    </Source>
  );
};

export default RegionPolygonLayer;
