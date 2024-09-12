import React, { useEffect, useMemo } from 'react';
import { Layer, Source, useMap } from 'react-map-gl';
import { currentMeterDataPointsArray } from '@/data/current-meter/data-point';
import { mapboxSourceIds } from '@/constants/mapboxId';
import { CustomSquareSymbol } from '../../symbols';

const SYMBOL_SIZE = 60;
const SYMBOL_STROKE_WIDTH = 4;
const SYMBOL_STROKE_STYLE = 'rgba(34,34,34,0.5)';

const SQUARE_SIZE_LARGE = 1;
const SQUARE_SIZE_SMALL = 0.6;
const SQUARE_SIZE_THRESHOLD_ZOOM = 5;

const CUSTOM_SQUARE_SYMBOL_IMAGE_NAME = 'outlined-square';

const CurrentMeterRegionPolygonLayer: React.FC = () => {
  const { CURRENT_METER_ALL_REGIONS_SOURCE_ID } = mapboxSourceIds;

  const regionsMapFeatures = currentMeterDataPointsArray.map((region) => {
    return {
      type: 'Feature',
      properties: {
        title: region.title,
      },
      geometry: {
        type: 'Point',
        coordinates: region.coords,
      },
    };
  });

  const regionsMapGeojson: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: regionsMapFeatures as GeoJSON.Feature[],
  };

  const { current: map } = useMap();

  useEffect(() => {
    if (!map) {
      return;
    }

    const outlinedSquare = new CustomSquareSymbol(SYMBOL_SIZE, SYMBOL_STROKE_STYLE, SYMBOL_STROKE_WIDTH);

    map.addImage(CUSTOM_SQUARE_SYMBOL_IMAGE_NAME, outlinedSquare, { pixelRatio: 2 });

    return () => {
      if (!map.hasImage(CUSTOM_SQUARE_SYMBOL_IMAGE_NAME)) {
        return;
      }
      map.removeImage(CUSTOM_SQUARE_SYMBOL_IMAGE_NAME);
    };
  }, [map]);

  const mapZoom = map?.getZoom();
  const squareSize = useMemo(() => {
    if (typeof mapZoom !== 'number') {
      return SQUARE_SIZE_SMALL;
    }
    return mapZoom > SQUARE_SIZE_THRESHOLD_ZOOM ? SQUARE_SIZE_LARGE : SQUARE_SIZE_SMALL;
  }, [mapZoom]);

  return (
    <Source
      type="geojson"
      data={regionsMapGeojson}
      id={CURRENT_METER_ALL_REGIONS_SOURCE_ID}
      cluster={true}
      clusterMaxZoom={4}
      clusterRadius={10}
    >
      <Layer
        type="line"
        source={CURRENT_METER_ALL_REGIONS_SOURCE_ID}
        paint={{ 'line-color': '#000', 'line-width': 2 }}
      />
      <Layer
        source={CURRENT_METER_ALL_REGIONS_SOURCE_ID}
        type="symbol"
        layout={{
          'icon-image': CUSTOM_SQUARE_SYMBOL_IMAGE_NAME,
          'icon-size': squareSize,
          'icon-allow-overlap': true,
        }}
      />
      <Layer
        type="symbol"
        source={CURRENT_METER_ALL_REGIONS_SOURCE_ID}
        layout={{
          'text-field': ['get', 'title'],
          'text-size': 14,
          'text-justify': 'center',
          'text-anchor': 'center',
        }}
      />
    </Source>
  );
};

export default CurrentMeterRegionPolygonLayer;
