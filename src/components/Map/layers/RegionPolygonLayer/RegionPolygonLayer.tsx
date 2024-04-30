import { Layer, Source } from 'react-map-gl';
import { mapboxLayerIds, mapboxSourceIds } from '@/constants/mapboxId';
import useRegionData from '../../hooks/useRegionData';

const RegionPolygonLayer = () => {
  const { regionData } = useRegionData();
  const { productRegionBoxSource } = mapboxSourceIds;
  const { productRegionBoxLayer } = mapboxLayerIds;

  return (
    <Source id={productRegionBoxSource} type="geojson" data={regionData}>
      <Layer
        id={productRegionBoxLayer}
        type="fill"
        source={productRegionBoxSource}
        paint={{
          'fill-color': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            'rgba(80, 80, 80, 0.5)',
            'transparent',
          ],
          'fill-outline-color': '#383838',
        }}
      />
    </Source>
  );
};

export default RegionPolygonLayer;
