import React, { useEffect, useState } from 'react';
import { Layer, Source, useMap } from 'react-map-gl';
import { mapboxLayerIds, mapboxSourceIds } from '@/constants/mapboxId';
import { useArrayCompareEffect } from '@/hooks';

const DataImageLayerRenderer: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const { dataImageSource } = mapboxSourceIds;
  const { dataImageLayer, productRegionBoxLayer, argoAsProductPointLayer } = mapboxLayerIds;

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
      (layer) => layer.includes(productRegionBoxLayer) || layer.includes(argoAsProductPointLayer),
    );

    if (polygonLayers.length > 0 && layers.includes(dataImageLayer)) {
      const bottomPolygonLayer = polygonLayers[0];

      map.moveLayer(dataImageLayer, bottomPolygonLayer);
    }
  }, layers);

  return (
    <div>
      <Source
        id={dataImageSource}
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
          id={dataImageLayer}
          type="raster"
          source={dataImageSource}
          paint={{
            'raster-fade-duration': 0,
          }}
        />
      </Source>
    </div>
  );
};

export default DataImageLayerRenderer;
