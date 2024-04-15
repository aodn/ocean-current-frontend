import React, { PropsWithChildren, useState } from 'react';
import Map, { FullscreenControl, MapStyle, NavigationControl, ViewState, ViewStateChangeEvent } from 'react-map-gl';
import { mapConfig } from '@/configs/map';
import { setZoom } from '@/stores/map-store/mapStore';
import RegionPolygonLayer from './layers/RegionPolygonLayer/RegionPolygonLayer';
import MAP_STYLE from './data/map-style.basic-v8.json';

interface BasicMapOptionalProps {
  id?: string;
  initialViewState?: Partial<ViewState>;
  mapStyle?: string;
  style?: React.CSSProperties;
}

interface BasicMapProps extends BasicMapOptionalProps, PropsWithChildren {
  fullScreenControl?: boolean;
}
const BasicMap: React.FC<BasicMapProps> = ({
  id = 'landing-oc-map',
  mapStyle = MAP_STYLE as MapStyle,
  initialViewState = {
    latitude: -25.824806,
    longitude: 140.265399,
    bearing: 0,
    pitch: 0,
    zoom: 2.6,
  },
  style,
  children,
}) => {
  const [viewState, setViewState] = useState<Partial<ViewState>>(initialViewState);

  const handleMove = ({ viewState }: ViewStateChangeEvent) => setViewState(viewState);

  const handleZoom = ({ viewState }: ViewStateChangeEvent) => {
    setZoom(viewState.zoom);
  };

  if (!mapConfig.accessToken) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <h2>Map cannot be loaded.</h2>
        <p>Mapbox API Key is not configured.</p>
      </div>
    );
  }

  return (
    <Map
      id={id}
      data-testid={id}
      mapboxAccessToken={mapConfig.accessToken}
      {...viewState}
      onMove={handleMove}
      onZoom={handleZoom}
      style={{ width: '100%', height: '100%', ...style }}
      mapStyle={mapStyle}
      projection={{ name: 'equirectangular' }}
      reuseMaps
      attributionControl={false}
    >
      {children}
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <RegionPolygonLayer />
    </Map>
  );
};

export default BasicMap;
