import React from 'react';
import Map, { FullscreenControl, MapStyle, NavigationControl, ViewStateChangeEvent } from 'react-map-gl';
import { mapConfig } from '@/configs/map';
import useMapStore, { setMapViewState, updateZoom } from '@/stores/map-store/mapStore';
import useProductStore from '@/stores/product-store/productStore';
import { mapboxInstanceIds } from '@/constants/mapboxId';
import { RegionPolygonLayer, ArgoAsProductLayer } from './layers';
import MAP_STYLE from './data/map-style.basic-v8.json';

interface BasicMapProps {
  children?: React.ReactNode;
  id?: string;
  mapStyle?: string;
  style?: React.CSSProperties;
  fullScreenControl?: boolean;
  navigationControl?: boolean;
}

const BasicMap: React.FC<BasicMapProps> = ({
  id = mapboxInstanceIds.oceanCurrentBasicMap,
  mapStyle = MAP_STYLE as MapStyle,
  style,
  children,
  fullScreenControl = true,
  navigationControl = true,
}) => {
  const useMainProduct = useProductStore((state) => state.productParams.mainProduct);
  const useMapViewState = useMapStore((state) => state.mapViewState);
  const handleMove = ({ viewState }: ViewStateChangeEvent) => {
    setMapViewState(viewState);
  };

  const handleZoom = ({ viewState }: ViewStateChangeEvent) => {
    updateZoom(viewState.zoom);
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
      {...useMapViewState}
      onMove={handleMove}
      onZoom={handleZoom}
      style={{ width: '100%', height: '100%', ...style }}
      mapStyle={mapStyle}
      projection={{ name: 'mercator' }}
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
