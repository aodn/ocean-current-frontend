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
  const shouldHideLayer = productsWithNoImage.includes(useProductId);

  // Adding Layers
  useEffect(() => {
    const mapLayer = map?.getMap();
    const productHasNoImage = !productsWithImage.includes(useProductId);

    if (!map || !mapLayer || !useProductId || productHasNoImage) return;

    const addLayerToMap = () => {
      if (mapLayer && !mapLayer.getSource(useProductId)) {
        mapLayer.addSource(useProductId, {
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
          id: useProductId,
          type: 'raster',
          source: useProductId,
        });
      }
    };

    // event will make sure other custom layers are loaded before adding image layer
    // to handle race condition for the addition of region boxes
    map.on('sourcedata', addLayerToMap);

    return () => {
      map.off('sourcedata', addLayerToMap);
    };
  }, [imageUrl, map, useProductId]);

  // Layer Visibility
  useEffect(() => {
    const mapLayer = map?.getMap();

    if (!map || !mapLayer || !useProductId) return;

    const updateLayerVisibility = () => {
      if (shouldHideLayer) {
        // hide all layers
        productsWithImage.forEach((product) => {
          if (mapLayer.getLayer(product) && mapLayer.getLayoutProperty(product, 'visibility') !== 'none') {
            mapLayer.setLayoutProperty(product, 'visibility', 'none');
          }
        });
      } else {
        // show relevant layer
        if (mapLayer.getLayer(useProductId) && mapLayer.getLayoutProperty(useProductId, 'visibility') === 'none') {
          mapLayer.setLayoutProperty(useProductId, 'visibility', 'visible');
        }
      }
    };

    // event will make sure custom layers are done
    // being added before updating visibility
    map.on('sourcedata', updateLayerVisibility);

    return () => {
      map.off('sourcedata', updateLayerVisibility);
    };
  }, [map, useProductId, shouldHideLayer]);

  // Moving Layers
  useEffect(() => {
    const mapLayer = map?.getMap();

    if (!map || !mapLayer || !useProductId) return;

    const moveImageLayer = () => {
      const layers = mapLayer.getStyle()?.layers.map((layer) => layer.id);
      const polygonLayers = layers?.filter(
        (layer) => layer.includes(PRODUCT_REGION_BOX_LAYER_ID) || layer.includes(ARGO_AS_PRODUCT_POINT_LAYER_ID),
      );

      if (polygonLayers && polygonLayers?.length > 0 && layers?.includes(useProductId)) {
        map.moveLayer(useProductId, polygonLayers[0]);
      }
    };

    // event detects when image source changes
    map.on('sourcedataloading', moveImageLayer);

    return () => {
      map.off('sourcedataloading', moveImageLayer);
    };
  }, [map, useProductId]);

  return <></>;
};

export default DataImageLayer;
