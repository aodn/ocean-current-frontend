import { Layer, Source } from 'react-map-gl';
import useArgoStore from '@/stores/argo-store/argoStore';
import useArgoAsProductData from '../../hooks/useArgoAsProductData';

const SOURCE_ID = 'argoAsProduct';

const ArgoAsProductLayer = () => {
  const { argoData } = useArgoAsProductData();
  const { worldMeteorologicalOrgId } = useArgoStore((state) => state.argoParams);

  return (
    <Source id={SOURCE_ID} type="geojson" data={argoData}>
      <Layer
        id="selectedArgo"
        type="circle"
        source={SOURCE_ID}
        paint={{
          'circle-radius': 15,
          'circle-color': 'white',
          'circle-opacity': 0.5,
          'circle-stroke-width': 1,
          'circle-stroke-color': 'white',
        }}
        filter={['==', 'worldMeteorologicalOrgId', worldMeteorologicalOrgId]}
      />
      <Layer
        id="argo"
        type="circle"
        source={SOURCE_ID}
        paint={{
          'circle-radius': 5,
          'circle-color': '#524DAB',
        }}
      />
    </Source>
  );
};

export default ArgoAsProductLayer;
