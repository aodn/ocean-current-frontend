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
    };

    // event will make sure other custom layers are loaded before adding image layer
    // to handle race condition for the addition of region boxes
    map.on('sourcedata', addLayerToMap);

    return () => {
      map.off('sourcedata', addLayerToMap);
    };
  }, [imageUrl, map, productId]);

  useEffect(() => {
    const mapLayer = map?.getMap();
    if (!map || !mapLayer || !productId) return;
    const addLayerToMapThenMove = () => {
      const layers = mapLayer.getStyle()?.layers.map((layer) => layer.id);
      const currProdLayerIndex = layers?.indexOf(productId) ?? 0;
      const regionBoxLayerIndex = layers?.indexOf(PRODUCT_REGION_BOX_LAYER_ID) ?? 0;

      // if the current image layer is not immediately before the region box layer, move the image layer
      if (currProdLayerIndex > 0 && regionBoxLayerIndex > 0 && currProdLayerIndex !== regionBoxLayerIndex - 1) {
        map.moveLayer(productId, PRODUCT_REGION_BOX_LAYER_ID);
      }
    };

    // event detects when image source changes
    map.on('sourcedataloading', addLayerToMapThenMove);

    return () => {
      map.off('sourcedataloading', addLayerToMapThenMove);
    };
  }, [PRODUCT_REGION_BOX_LAYER_ID, map, productId]);

  return <></>;
};

export default DataImageLayerRenderer;
