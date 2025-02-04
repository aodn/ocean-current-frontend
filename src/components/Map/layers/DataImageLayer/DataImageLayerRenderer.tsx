import { useEffect } from 'react';
import { useMap } from 'react-map-gl';
import { mapboxLayerIds } from '@/constants/mapboxId';

type DataImageLayerRendererProps = {
  imageUrl: string;
  productId: string;
};

// eslint-disable-next-line react/prop-types
const DataImageLayerRenderer: React.FC<DataImageLayerRendererProps> = ({ imageUrl, productId }) => {
  const { PRODUCT_REGION_BOX_LAYER_ID } = mapboxLayerIds;
  const { current: map } = useMap();

  useEffect(() => {
    const mapLayer = map?.getMap();
    if (!map || !mapLayer || !productId) return;
    const addLayerToMap = () => {
      if (mapLayer && !mapLayer.getSource(productId)) {
        mapLayer.addSource(productId, {
          type: 'image',
          url: imageUrl,
          coordinates: [
            [100, -4.4],
            [180, -4.4],
            [180, -48],
            [100, -48],
          ],
        });

        mapLayer.addLayer({
          id: productId,
          type: 'raster',
          source: productId,
        });
      }

      map.moveLayer(productId, PRODUCT_REGION_BOX_LAYER_ID);
    };

    map.on('load', addLayerToMap);
    map.on('styledata', addLayerToMap);
    map.on('sourcedataloading', addLayerToMap);
    map.on('sourcedataabort', addLayerToMap);

    return () => {
      map.off('load', addLayerToMap);
      map.off('styledata', addLayerToMap);
      map.off('sourcedataloading', addLayerToMap);
      map.off('sourcedataabort', addLayerToMap);
    };
  }, [PRODUCT_REGION_BOX_LAYER_ID, imageUrl, map, productId]);

  return <></>;
};

export default DataImageLayerRenderer;
