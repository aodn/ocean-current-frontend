import { Layer, LngLatBounds, MapMouseEvent, Source, useMap } from 'react-map-gl';
import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { mapboxLayerIds, mapboxSourceIds } from '@/constants/mapboxId';
import { useProductSearchParam, useQueryParams, useThrottle } from '@/hooks';
import useProductPath from '@/stores/product-store/hooks/useProductPath';
import { BoundingBox, GeoJsonPolygon } from '@/types/map';
import useProductStore from '@/stores/product-store/productStore';
import { getRegionByRegionTitle } from '@/utils/region';
import { convertGeoJsonCoordinatesToBBox } from '@/utils/geo';
import { getPropertyFromMapFeatures } from '../../utils/mapUtils';
import useVisibleRegionPolygons from '../../hooks/useVisibleRegionPolygons';

const MIN_THRESHOLD_PERCENTAGE = 3;
const MAX_THRESHOLD_PERCENTAGE = 70;

const RegionPolygonLayer = () => {
  const { productRegionBoxSource } = mapboxSourceIds;
  const {
    productRegionBoxLayer,
    productRegionBoxHighlightLayer,
    productRegionNameLabelLayer,
    productRegionSelectedBoxLayer,
  } = mapboxLayerIds;

  const useRegionTitle = useProductStore((state) => state.productParams.regionTitle);
  const baseProductPath = useProductPath();
  const { searchParams, updateQueryParamsAndNavigate } = useQueryParams();
  const { region: regionTitleFromUrl } = useProductSearchParam();
  const selectedRegion = useRegionTitle || '';

  const { current: map } = useMap();

  const [hoveredRegion, setHoveredRegion] = useState<string>('');
  const [mapBounds, setMapBounds] = useState<LngLatBounds | null>(null);

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
      const region = regionTitleFromUrl && getRegionByRegionTitle(regionTitleFromUrl);
      if (region) {
        mapFitBounds(region.coords);
      }
    });
  }, [map, regionTitleFromUrl, mapFitBounds]);

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

  const geoJsonData = useVisibleRegionPolygons(mapBounds, MIN_THRESHOLD_PERCENTAGE, MAX_THRESHOLD_PERCENTAGE);

  useEffect(() => {
    if (!map) return;

    const handleMouseMove = (e: MapMouseEvent) => {
      const { name: regionName } = getPropertyFromMapFeatures<{ name: string }>(map, e, productRegionBoxLayer, [
        'name',
      ]);

      if (regionName) {
        setHoveredRegion(regionName);
      }
    };

    const handleMouseClick = (e: MapMouseEvent) => {
      const features = map.queryRenderedFeatures(e.point, { layers: [productRegionBoxLayer] });
      if (features.length > 0 && features[0]?.geometry?.type === 'Polygon') {
        const regionBounds = convertGeoJsonCoordinatesToBBox(features[0].geometry.coordinates as GeoJsonPolygon);
        mapFitBounds(regionBounds);
      }

      const { name: regionName } = getPropertyFromMapFeatures<{ name: string }>(map, e, productRegionBoxLayer, [
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
    };

    map.on('mousemove', productRegionBoxLayer, handleMouseMove);
    map.on('mouseleave', productRegionBoxLayer, handleMouseLeave);
    map.on('click', productRegionBoxLayer, handleMouseClick);

    return () => {
      map.off('click', productRegionBoxLayer, handleMouseClick);
      map.off('mouseleave', productRegionBoxLayer, handleMouseLeave);
      map.off('mousemove', productRegionBoxLayer, handleMouseMove);
    };
  }, [
    map,
    productRegionBoxLayer,
    searchParams.date,
    updateQueryParamsAndNavigate,
    defaultTargetDate,
    baseProductPath,
    mapFitBounds,
  ]);

  return (
    <Source id={productRegionBoxSource} type="geojson" data={geoJsonData}>
      <Layer
        id={productRegionBoxLayer}
        type="fill"
        source={productRegionBoxSource}
        paint={{
          'fill-color': 'rgba(19, 40, 113, 0.1)',
          'fill-outline-color': 'rgba(47, 0, 179, 0.3)',
        }}
      />
      <Layer
        id={productRegionBoxHighlightLayer}
        type="fill"
        source={productRegionBoxSource}
        paint={{
          'fill-color': 'rgba(58, 77, 143, 0.2)',
          'fill-outline-color': 'rgba(58, 92, 143, 0.8)',
        }}
        filter={['==', 'name', hoveredRegion]}
      />
      <Layer
        id={productRegionNameLabelLayer}
        type="symbol"
        source={productRegionBoxSource}
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
        source={productRegionBoxSource}
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
        id={productRegionSelectedBoxLayer}
        type="line"
        source={productRegionBoxSource}
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
