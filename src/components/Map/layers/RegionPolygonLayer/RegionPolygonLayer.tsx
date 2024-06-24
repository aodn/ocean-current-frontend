import { Layer, LngLatBounds, MapMouseEvent, Source, useMap } from 'react-map-gl';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { mapboxLayerIds, mapboxSourceIds } from '@/constants/mapboxId';
import { useQueryParams, useThrottle } from '@/hooks';
import useProductPath from '@/stores/product-store/hooks/useProductPath';
import { getPropertyFromMapFeatures } from '../../utils/mapUtils';
import useVisibleRegionPolygons from '../../hooks/useVisibleRegionPolygons';

const RegionPolygonLayer = () => {
  const { productRegionBoxSource } = mapboxSourceIds;
  const { productRegionBoxLayer, productRegionBoxHighlightLayer } = mapboxLayerIds;

  const baseProductPath = useProductPath();
  const { searchParams, updateQueryParamsAndNavigate } = useQueryParams();
  const { current: map } = useMap();
  const [hoveredRegion, setHoveredRegion] = useState<string>('');

  const defaultTargetDate = dayjs().subtract(2, 'day').format('YYYYMMDD');

  const [bounds, setBounds] = useState<LngLatBounds | null>(null);

  const throttleSetBounds = useThrottle((bounds: LngLatBounds) => {
    setBounds(bounds);
  }, 300);

  useEffect(() => {
    if (!map) return;

    const handleMapChange = () => {
      const bounds = map.getBounds();
      throttleSetBounds(bounds);
    };

    map.on('zoom', handleMapChange);
    setBounds(map.getBounds());

    return () => {
      map.off('zoom', handleMapChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  const geoJsonData = useVisibleRegionPolygons(bounds, 3, 50);

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
  }, [map, productRegionBoxLayer, searchParams.date, updateQueryParamsAndNavigate, defaultTargetDate, baseProductPath]);

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
        id="product-label"
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
    </Source>
  );
};

export default RegionPolygonLayer;
