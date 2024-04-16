import { Layer, Source } from 'react-map-gl';
import useRegionData from '../../hooks/useRegionData';

const RegionPolygonLayer = () => {
  const { regionData } = useRegionData();

  return (
    <Source id="trackingRect" type="geojson" data={regionData}>
      <Layer
        id="trackingRectLayer"
        type="fill"
        source="trackingRect"
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
