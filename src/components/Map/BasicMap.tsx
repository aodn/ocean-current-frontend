import React, { useCallback, useMemo, useState } from 'react';
import Map, { FullscreenControl, MapStyle, NavigationControl, ViewStateChangeEvent } from 'react-map-gl';
import { mapConfig } from '@/configs/map';
import useMapStore, { setMapViewState, updateZoom } from '@/stores/map-store/mapStore';
import { mapboxInstanceIds, mapboxLayerIds } from '@/constants/mapboxId';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import { RegionPolygonLayer, ArgoAsProductLayer } from './layers';
import MAP_STYLE from './data/map-style.basic-v8.json';
import { BasicMapProps } from './types/map.types';

const BasicMap: React.FC<BasicMapProps> = ({
  id = mapboxInstanceIds.oceanCurrentBasicMap,
  mapStyle = MAP_STYLE as MapStyle,
  style,
  children,
  isMiniMap = false,
  fullScreenControl = false,
  navigationControl = true,
}) => {
  const interactiveIds = [mapboxLayerIds.productRegionBoxLayer, mapboxLayerIds.argoAsProductPointLayer];

  const [cursor, setCursor] = useState<string>('grab');
  const useMapViewState = useMapStore((state) => state.mapViewState);
  const { isArgo } = useProductCheck();

  const handleMove = ({ viewState }: ViewStateChangeEvent) => {
    setMapViewState(viewState);
  };

  const handleZoom = ({ viewState }: ViewStateChangeEvent) => {
    updateZoom(viewState.zoom);
  };

  const handleMouseEnter = useCallback(() => setCursor('pointer'), []);
  const handleMouseLeave = useCallback(() => setCursor('grab'), []);

  const memoizedRegionPolygonLayer = useMemo(() => <RegionPolygonLayer />, []);
  const memoizedArgoAsProductLayer = useMemo(() => <ArgoAsProductLayer isMiniMap={isMiniMap} />, [isMiniMap]);

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
      cursor={cursor}
      onMove={handleMove}
      onZoom={handleZoom}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ width: '100%', height: '100%', ...style }}
      mapStyle={mapStyle}
      projection={{ name: 'mercator' }}
      attributionControl={false}
      interactiveLayerIds={interactiveIds}
    >
      {children}
      {fullScreenControl && <FullscreenControl position="top-right" />}
      {navigationControl && <NavigationControl position="top-right" />}

      {!isArgo && memoizedRegionPolygonLayer}
      {isArgo && memoizedArgoAsProductLayer}
    </Map>
  );
};

export default BasicMap;
