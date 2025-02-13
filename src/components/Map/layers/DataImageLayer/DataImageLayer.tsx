import { useEffect } from 'react';
import { useMap } from 'react-map-gl';
import { mapboxLayerIds } from '@/constants/mapboxId';
import useProductStore from '@/stores/product-store/productStore';
import { getEntryImagePathByProductId } from '@/utils/data-image-builder-utils/latestEntryImage';

const productsWithNoImage = [
  'monthlyMeans-anomalies',
  'climatology-sst',
  'EACMooringArray',
  'currentMeters-mooredInstrumentArray',
];
const productsWithImage = [
  'argo',
  'adjustedSeaLevelAnomaly',
  'fourHourSst-sstFilled',
  'surfaceWaves',
  'adjustedSeaLevelAnomaly-sla',
  'oceanColour-chlA',
  'sixDaySst-sst',
  'snapshotSst',
];
const { PRODUCT_REGION_BOX_LAYER_ID, ARGO_AS_PRODUCT_POINT_LAYER_ID } = mapboxLayerIds;

const DataImageLayer: React.FC = () => {
  const useProductId = useProductStore((state) => state.productParams.productId);
  // client requested to use adjusted SLA map for argo product, see https://github.com/aodn/backlog/issues/5575
  const productId = useProductId === 'argo' ? 'adjustedSeaLevelAnomaly-sla' : useProductId;
  const urlPath = getEntryImagePathByProductId(productId);

  const imageUrl = `/api/${urlPath}/latest.gif`;

  const { current: map } = useMap();
  const shouldHideLayer = productsWithNoImage.includes(productId);

  // Adding Layers
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

  // Layer Visibility
  useEffect(() => {
    const mapLayer = map?.getMap();
    if (!map || !mapLayer || !productId) return;

    const updateLayerVisibility = () => {
      if (shouldHideLayer) {
        productsWithImage.forEach((product) => {
          if (mapLayer.getLayer(product)) mapLayer.setLayoutProperty(product, 'visibility', 'none');
        });
      } else {
        if (mapLayer.getLayer(productId)) mapLayer.setLayoutProperty(productId, 'visibility', 'visible');
      }
    };

    // event will make sure custom layers are done
    // being added before updating visibility
    map.on('sourcedata', updateLayerVisibility);

    return () => {
      map.off('sourcedata', updateLayerVisibility);
    };
  }, [map, productId, shouldHideLayer]);

  // Moving Layers
  useEffect(() => {
    const mapLayer = map?.getMap();
    if (!map || !mapLayer || !productId) return;
    const moveImageLayer = () => {
      const layers = mapLayer.getStyle()?.layers.map((layer) => layer.id);
      const currProdLayerIndex = layers?.indexOf(productId) ?? 0;
      const regionBoxLayerIndex = layers?.indexOf(PRODUCT_REGION_BOX_LAYER_ID) ?? 0;

      // if the current image layer is not immediately before the region box layer, move the image layer
      if (currProdLayerIndex > 0 && regionBoxLayerIndex > 0 && currProdLayerIndex !== regionBoxLayerIndex - 1) {
        map.moveLayer(productId, PRODUCT_REGION_BOX_LAYER_ID);
        map.moveLayer(ARGO_AS_PRODUCT_POINT_LAYER_ID, PRODUCT_REGION_BOX_LAYER_ID); // make sure argo is always on top of image
      }
    };

    // event detects when image source changes
    map.on('sourcedataloading', moveImageLayer);

    return () => {
      map.off('sourcedataloading', moveImageLayer);
    };
  }, [map, productId]);

  return <></>;
};

export default DataImageLayer;
