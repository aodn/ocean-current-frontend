import React, { useState } from 'react';
import Map, { FullscreenControl, MapStyle, NavigationControl, ViewState, ViewStateChangeEvent } from 'react-map-gl';
import { mapConfig } from '@/configs/map';
import { setZoom } from '@/stores/map-store/mapStore';
import useProductStore from '@/stores/product-store/productStore';
import { RegionPolygonLayer, ArgoAsProductLayer } from './layers';
import MAP_STYLE from './data/map-style.basic-v8.json';

interface BasicMapProps {
  children?: React.ReactNode;
  id?: string;
  initialViewState?: Partial<ViewState>;
  mapStyle?: string;
  style?: React.CSSProperties;
  fullScreenControl?: boolean;
  navigationControl?: boolean;
}

const BasicMap: React.FC<BasicMapProps> = ({
  id = 'landing-oc-map',
  mapStyle = MAP_STYLE as MapStyle,
  initialViewState,
  style,
  children,
  fullScreenControl = true,
  navigationControl = true,
}) => {
  const defaultViewState = {
    latitude: -25.824806,
    longitude: 140.265399,
    bearing: 0,
    pitch: 0,
    zoom: 2.6,
    ...initialViewState,
  };
  const [viewState, setViewState] = useState<Partial<ViewState>>(defaultViewState);
  const useMainProduct = useProductStore((state) => state.mainProduct);

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
      projection={{ name: 'mercator' }}
      reuseMaps
      attributionControl={false}
    >
      {children}
      {fullScreenControl && <FullscreenControl position="top-left" />}
      {navigationControl && <NavigationControl position="top-left" />}

      {useMainProduct !== 'argo' && <RegionPolygonLayer />}
      {useMainProduct === 'argo' && <ArgoAsProductLayer />}
    </Map>
  );
};

export default BasicMap;
