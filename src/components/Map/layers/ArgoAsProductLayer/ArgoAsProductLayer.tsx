import { Layer, Source } from 'react-map-gl';
import useArgoAsProductData from '../../hooks/useArgoAsProductData';

const SOURCE_ID = 'argoAsProduct';

const ArgoAsProductLayer = () => {
  const { argoData } = useArgoAsProductData();

  return (
    <Source id={SOURCE_ID} type="geojson" data={argoData}>
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
