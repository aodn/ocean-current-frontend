import { Layer, MapMouseEvent, Popup, Source, useMap } from 'react-map-gl';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useArgoStore from '@/stores/argo-store/argoStore';
import { mapboxLayerIds, mapboxSourceIds } from '@/constants/mapboxId';
import { ArgoProfile } from '@/types/argo';
import useArgoAsProductData from '../../hooks/useArgoAsProductData';

const ArgoAsProductLayer = () => {
  const { argoData } = useArgoAsProductData();
  const { worldMeteorologicalOrgId: selectedWorldMeteorologicalOrgId } = useArgoStore((state) => state.argoParams);
  const { argoAsProductSelectedPointLayer, argoAsProductPointLayer } = mapboxLayerIds;
  const { argoAsProductSource } = mapboxSourceIds;
  const { current: map } = useMap();
  const navigate = useNavigate();
  const eventAdded = useRef(false);

  const [popupInfo, setPopupInfo] = useState<ArgoProfile | null>();

  useEffect(() => {
    if (!map) return;
    const handleClick = (e: MapMouseEvent) => {
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
    };

    if (!eventAdded.current) {
      eventAdded.current = true;
      map.on('click', argoAsProductPointLayer, handleClick);
      map.on('mouseenter', argoAsProductPointLayer, (e) => {
        map.getCanvas().style.cursor = 'pointer';
        const features = map.queryRenderedFeatures(e.point, { layers: [argoAsProductPointLayer] });
        if (!features.length) {
          return;
        }
        if (features[0].geometry.type === 'Point') {
          const clickedArgoParam = features[0].properties;
          const clickedArgoCoords = features[0].geometry.coordinates;
          if (!clickedArgoParam) {
            return;
          }
          const { worldMeteorologicalOrgId, cycle, depth, date } = clickedArgoParam;
          setPopupInfo({
            worldMeteorologicalOrgId,
            cycle,
            depth,
            date,
            coords: clickedArgoCoords,
          });
        }
      });
      map.on('mouseleave', argoAsProductPointLayer, () => {
        map.getCanvas().style.cursor = '';
        setPopupInfo(null);
      });
    }

    return () => {
      if (map && eventAdded.current) {
        map.off('click', argoAsProductPointLayer, handleClick);
        eventAdded.current = false;
      }
    };
  }, [argoAsProductPointLayer, map, navigate]);

  return (
    <>
      {popupInfo && (
        <Popup
          closeButton={false}
          latitude={popupInfo.coords[1]}
          longitude={popupInfo.coords[0]}
          offset={[0, -24] as [number, number]}
        >
          <div>wmoid: {popupInfo.worldMeteorologicalOrgId}</div>
        </Popup>
      )}
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
            'circle-stroke-color': 'transparent',
            'circle-stroke-width': 15,
          }}
        />
      </Source>
    </>
  );
};

export default ArgoAsProductLayer;
