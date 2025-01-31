import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Map, {
  FullscreenControl,
  MapLayerMouseEvent,
  MapStyle,
  NavigationControl,
  ViewStateChangeEvent,
} from 'react-map-gl';
import { mapConfig } from '@/configs/map';
import useMapStore, { setMapViewState, updateZoom } from '@/stores/map-store/mapStore';
import { mapboxInstanceIds, mapboxLayerIds } from '@/constants/mapboxId';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import { useDeviceType } from '@/hooks';
import { resetCurrentMetersStore } from '@/stores/current-meters-store/currentMeters';
import MAP_STYLE from './data/map-style.basic-v8.json';
import { RegionPolygonLayer, ArgoAsProductLayer, DataImageLayer, CurrentMetersDeploymentPlotsLayer } from './layers';
import { MouseCursorLocationPanel } from './panels';
import { BasicMapProps } from './types/map.types';

const BasicMap: React.FC<BasicMapProps> = ({
  id = mapboxInstanceIds.OCEAN_CURRENT_BASIC_MAP_ID,
  mapStyle = MAP_STYLE as MapStyle,
  style,
  children,
  isMiniMap = false,
  fullScreenControl = false,
  navigationControl = true,
  showCursorLocationPanel = true,
  minZoom,
  shouldFitArgoBounds = false,
}) => {
  const [cursor, setCursor] = useState<string>('grab');
  const [cursorLngLat, setCursorLngLat] = useState<{ lng: number; lat: number } | null>(null);
  const useMapViewState = useMapStore((state) => state.mapViewState);
  const { isArgo, isCurrentMeters } = useProductCheck();
  const { isMobile } = useDeviceType();

  const { PRODUCT_REGION_BOX_LAYER_ID, ARGO_AS_PRODUCT_POINT_LAYER_ID } = mapboxLayerIds;
  const interactiveIds = [PRODUCT_REGION_BOX_LAYER_ID, ARGO_AS_PRODUCT_POINT_LAYER_ID];

  const shouldShowArgoLayer = ((!isArgo && !isMiniMap) || isArgo) && !isCurrentMeters;

  const shouldShowCursorLocationPanel = showCursorLocationPanel && !isMobile && cursorLngLat?.lng && cursorLngLat?.lat;

  useEffect(() => {
    resetCurrentMetersStore();
  }, []);

  const handleMove = useCallback(({ viewState }: ViewStateChangeEvent) => {
    setMapViewState(viewState);
  }, []);

  const handleZoom = useCallback(({ viewState }: ViewStateChangeEvent) => {
    updateZoom(viewState.zoom);
  }, []);

  const handleMouseMove = useCallback((e: MapLayerMouseEvent) => {
    const { lng, lat } = e.lngLat;
    setCursorLngLat({ lng, lat });
  }, []);

  const handleMouseEnter = useCallback(() => setCursor('pointer'), []);
  const handleMouseLeave = useCallback(() => setCursor('grab'), []);

  const memoizedLayers = useMemo(
    () => ({
      dataImageLayer: <DataImageLayer />,
      currentMetersDeploymentPlotsLayer: <CurrentMetersDeploymentPlotsLayer isMiniMap={isMiniMap} />,
      regionPolygonLayer: (
        <RegionPolygonLayer shouldKeepNationalRegion={!isMiniMap} shouldFitNationalRegionBounds={isMiniMap} />
      ),
      argoAsProductLayer: <ArgoAsProductLayer isMiniMap={isMiniMap} shouldFitBounds={shouldFitArgoBounds} />,
    }),
    [isMiniMap, shouldFitArgoBounds],
  );

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
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ width: '100%', height: '100%', ...style }}
      mapStyle={mapStyle}
      projection={{ name: 'mercator' }}
      attributionControl={false}
      interactiveLayerIds={interactiveIds}
      minZoom={minZoom}
    >
      {children}
      {fullScreenControl && <FullscreenControl position="top-right" />}
      {navigationControl && <NavigationControl position="top-right" />}

      {shouldShowCursorLocationPanel && <MouseCursorLocationPanel lat={cursorLngLat?.lat} lng={cursorLngLat?.lng} />}

      {memoizedLayers.dataImageLayer}
      {!isArgo && memoizedLayers.regionPolygonLayer}
      {shouldShowArgoLayer && memoizedLayers.argoAsProductLayer}
      {isCurrentMeters && memoizedLayers.currentMetersDeploymentPlotsLayer}
    </Map>
  );
};

export default BasicMap;
