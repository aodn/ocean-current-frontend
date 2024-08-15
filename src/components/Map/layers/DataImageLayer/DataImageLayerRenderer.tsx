import React, { useEffect, useState } from 'react';
import { Layer, Source, useMap } from 'react-map-gl';
import { mapboxLayerIds, mapboxSourceIds } from '@/constants/mapboxId';
import { useArrayCompareEffect } from '@/hooks';

const DataImageLayerRenderer: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const { DATA_IMAGE_SOURCE_ID } = mapboxSourceIds;
  const { DATA_IMAGE_LAYER_ID, PRODUCT_REGION_BOX_LAYER_ID, ARGO_AS_PRODUCT_POINT_LAYER_ID } = mapboxLayerIds;

  const [layers, setLayers] = useState<string[]>([]);
  const { current: map } = useMap();

  useEffect(() => {
    if (!map) return;

    const repositionImageLayer = () => {
      const layers = map.getStyle().layers;
      if (map.isStyleLoaded()) {
        const currentLayers = map.getStyle().layers.map((layer) => layer.id);
        if (JSON.stringify(currentLayers) !== JSON.stringify(layers)) {
          setLayers(currentLayers);
        }
      }
    };

    map.on('load', repositionImageLayer);
    map.on('styledata', repositionImageLayer);
    map.on('sourcedataloading', repositionImageLayer);
    map.on('sourcedataabort', repositionImageLayer);

    return () => {
      map.off('load', repositionImageLayer);
      map.off('styledata', repositionImageLayer);
      map.off('sourcedataloading', repositionImageLayer);
      map.off('sourcedataabort', repositionImageLayer);
    };
  }, [map]);

  useArrayCompareEffect(() => {
    if (!map) return;
    const polygonLayers = layers.filter(
      (layer) => layer.includes(PRODUCT_REGION_BOX_LAYER_ID) || layer.includes(ARGO_AS_PRODUCT_POINT_LAYER_ID),
    );

    if (polygonLayers.length > 0 && layers.includes(DATA_IMAGE_LAYER_ID)) {
      const bottomPolygonLayer = polygonLayers[0];

      map.moveLayer(DATA_IMAGE_LAYER_ID, bottomPolygonLayer);
    }
  }, layers);

  return (
    <div>
      <Source
        id={DATA_IMAGE_SOURCE_ID}
        type="image"
        url={imageUrl}
        // TODO: read the coordinates from the regionData.ts and convert it to the format below
        coordinates={[
          [100, -4.4],
          [180, -4.4],
          [180, -48],
          [100, -48],
        ]}
      >
        <Layer
          id={DATA_IMAGE_LAYER_ID}
          type="raster"
          source={DATA_IMAGE_SOURCE_ID}
          paint={{
            'raster-fade-duration': 0,
          }}
        />
      </Source>
    </div>
  );
};

export default DataImageLayerRenderer;
