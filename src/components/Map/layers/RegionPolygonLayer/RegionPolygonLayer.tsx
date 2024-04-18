import { Layer, Source } from 'react-map-gl';
import useRegionData from '../../hooks/useRegionData';

const SOURCE_ID = 'trackingRect';

const RegionPolygonLayer = () => {
  const { regionData } = useRegionData();

  return (
    <Source id={SOURCE_ID} type="geojson" data={regionData}>
      <Layer
        id="trackingRectLayer"
        type="fill"
        source={SOURCE_ID}
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
