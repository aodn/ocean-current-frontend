import argoData from '@/data/argoData';

const useArgoAsProductData = () => {
  const features = argoData.map((data, index) => ({
    type: 'Feature',
    properties: {
      id: index,
    },
    geometry: {
      type: 'Point',
      coordinates: [data[1], data[0]],
    },
  }));

  const argoGeoCollection = {
    type: 'FeatureCollection',
    features: features,
  } as GeoJSON.FeatureCollection;

  return { argoData: argoGeoCollection };
};

export default useArgoAsProductData;
