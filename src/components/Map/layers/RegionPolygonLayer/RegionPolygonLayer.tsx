import { Layer, MapMouseEvent, Source, useMap } from 'react-map-gl';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { mapboxLayerIds, mapboxSourceIds } from '@/constants/mapboxId';
import useProductStore from '@/stores/product-store/productStore';
import { getProductByKey } from '@/utils/product';
import { useQueryParams } from '@/hooks';
import useRegionData from '../../hooks/useRegionData';
import { getPropertyFromMapFeatures } from '../../utils/mapUtils';

const RegionPolygonLayer = () => {
  const { productRegionBoxSource } = mapboxSourceIds;
  const { productRegionBoxLayer, productRegionBoxHighlightLayer } = mapboxLayerIds;

  const { regionData } = useRegionData();
  const mainProduct = useProductStore((state) => state.productParams.mainProduct);
  const subProduct = useProductStore((state) => state.productParams.subProduct);
  const { searchParams, updateQueryParamsAndNavigate } = useQueryParams();
  const { current: map } = useMap();

  const [hoveredRegion, setHoveredRegion] = useState<string>('');

  const product = getProductByKey(mainProduct, subProduct);
  const mainProductPath = product.mainProduct.path;
  const subProductPath = product.subProduct ? `/${product.subProduct.path}` : '';
  const defaultTargetDate = dayjs().subtract(2, 'day').format('YYYYMMDD');

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
        const targetPath = `/product/${mainProductPath}${subProductPath}`;

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
    mainProductPath,
    map,
    productRegionBoxLayer,
    searchParams.date,
    subProductPath,
    updateQueryParamsAndNavigate,
    defaultTargetDate,
  ]);

  return (
    <Source id={productRegionBoxSource} type="geojson" data={regionData}>
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
