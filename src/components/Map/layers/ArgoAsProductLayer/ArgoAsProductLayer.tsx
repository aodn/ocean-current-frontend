import { Layer, Source, useMap } from 'react-map-gl';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useArgoStore from '@/stores/argo-store/argoStore';
import { mapboxLayerIds, mapboxSourceIds } from '@/constants/mapboxId';
import useArgoAsProductData from '../../hooks/useArgoAsProductData';

const ArgoAsProductLayer = () => {
  const { argoData } = useArgoAsProductData();
  const { worldMeteorologicalOrgId: selectedWorldMeteorologicalOrgId } = useArgoStore((state) => state.argoParams);
  const { argoAsProductSelectedPointLayer, argoAsProductPointLayer } = mapboxLayerIds;
  const { argoAsProductSource } = mapboxSourceIds;

  const { current: map } = useMap();
  const navigate = useNavigate();

  useEffect(() => {
    if (!map) return;

    map.on('click', argoAsProductPointLayer, (e) => {
      const features = map.queryRenderedFeatures(e.point, { layers: [argoAsProductPointLayer] });
      if (!features.length) {
        return;
      }
      const clickedArgoParam = features[0].properties;
      if (!clickedArgoParam) {
        return;
      }
      const { worldMeteorologicalOrgId, cycle, depth, date } = clickedArgoParam;
      const query = new URLSearchParams({ wmoid: worldMeteorologicalOrgId, cycle, depth, date }).toString();
      const clickedArgoPath = `/product/argo?${query}`;
      navigate(clickedArgoPath);
    });
  }, [argoAsProductPointLayer, map, navigate]);

  return (
    <Source id={argoAsProductSource} type="geojson" data={argoData}>
      <Layer
        id={argoAsProductSelectedPointLayer}
        type="circle"
        source={argoAsProductSource}
        paint={{
          'circle-radius': 15,
          'circle-color': 'white',
          'circle-opacity': 0.5,
          'circle-stroke-width': 1,
          'circle-stroke-color': 'white',
        }}
        filter={['==', 'worldMeteorologicalOrgId', selectedWorldMeteorologicalOrgId]}
      />
      <Layer
        id={argoAsProductPointLayer}
        type="circle"
        source={argoAsProductSource}
        paint={{
          'circle-radius': 8,
          'circle-color': '#524DAB',
        }}
      />
    </Source>
  );
};

export default ArgoAsProductLayer;
