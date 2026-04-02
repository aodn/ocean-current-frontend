import { useEffect } from 'react';
import { useMap } from 'react-map-gl/mapbox';
import { mapboxLayerIds } from '@/constants/mapboxId';
import useProductStore from '@/stores/product-store/productStore';
import { buildLatestEntryImageUrl } from '@/utils/data-image-builder-utils/latestEntryImage';
import { ProductID } from '@/types/product';

const productsWithNoImage: ProductID[] = [
  'argo',
  'monthlyMeans-30day',
  'sixDaySst-climatology',
  'EACMooringArray',
  'currentMeters-mooredInstrumentArray',
  'tidalCurrents-spd',
];
const productsWithImage: ProductID[] = [
  'fourHourSst-sst',
  'fourHourSst-sstFilled',
  'surfaceWaves-wave',
  'surfaceWaves-buoyTimeseries',
  'oceanColour-chlA',
  'sixDaySst-sst',
  'sixDaySst-sstAnomaly',
  'sixDaySst-centiles',
  'sixDaySst-timeseries',
  'adjustedSeaLevelAnomaly-sla',
  'adjustedSeaLevelAnomaly-centiles',
  'adjustedSeaLevelAnomaly-sst',
  'adjustedSeaLevelAnomaly-nonTidalSla',
];

const DataImageLayer: React.FC = () => {
  const useProductId = useProductStore((state) => state.productParams.productId);

  const imageUrl = buildLatestEntryImageUrl(useProductId);

  const { current: map } = useMap();
  const shouldHideLayer = productsWithNoImage.includes(useProductId);

  // Adding Layers
  useEffect(() => {
    const mapLayer = map?.getMap();
    const productHasImage = productsWithImage.includes(useProductId);

    if (!map || !mapLayer || !useProductId || !productHasImage) return;

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

    map.on('sourcedata', updateLayerVisibility);
    map.on('styledata', updateLayerVisibility);

    return () => {
      map.off('sourcedata', updateLayerVisibility);
      map.off('styledata', updateLayerVisibility);
    };
  }, [map, useProductId, shouldHideLayer]);

  // Move image layer to bottom
  useEffect(() => {
    const mapLayer = map?.getMap();

    if (!map || !mapLayer || !useProductId) return;

    const moveImageLayer = () => {
      const style = mapLayer.getStyle();
      if (!style?.layers || !style.layers.some((layer) => layer.id === useProductId)) return;

      // Get all custom layer IDs
      const customLayerIds = Object.values(mapboxLayerIds) as string[];

      // Find the first custom layer we added
      const firstCustomLayer = style.layers.find((layer) => customLayerIds.includes(layer.id));

      // Move image layer below the first custom layer (making it bottom-most among our custom layers)
      if (firstCustomLayer) {
        map.moveLayer(useProductId, firstCustomLayer.id);
      }
    };

    map.on('sourcedataloading', moveImageLayer);
    map.on('sourcedata', moveImageLayer);
    map.on('styledata', moveImageLayer);

    return () => {
      map.off('sourcedataloading', moveImageLayer);
      map.off('sourcedata', moveImageLayer);
      map.off('styledata', moveImageLayer);
    };
  }, [map, useProductId]);

  return <></>;
};

export default DataImageLayer;
