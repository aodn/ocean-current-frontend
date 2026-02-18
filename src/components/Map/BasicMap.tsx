import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Map, {
  MapMouseEvent,
  MapRef,
  NavigationControl,
  ViewStateChangeEvent,
  StyleSpecification,
} from 'react-map-gl/mapbox';
import type { Map as MapboxMap } from 'mapbox-gl';
import { initialMobileMapViewState, mapConfig, MAP_LIMIT_BOUNDS } from '@/configs/map';
import useMapStore, { setMapViewState, patchMapViewState, updateZoom } from '@/stores/map-store/mapStore';
import { mapboxInstanceIds, mapboxLayerIds } from '@/constants/mapboxId';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import { useDeviceType, useResizeObserver } from '@/hooks';
import { resetCurrentMetersStore } from '@/stores/current-meters-store/currentMeters';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import { PRODUCTS_WITH_ARGO_DATA } from '@/configs/products/data-source';
import MAP_STYLE from './data/map-style.bathymetry.json';
import { RegionPolygonLayer, ArgoAsProductLayer, DataImageLayer, CurrentMetersDeploymentPlotsLayer } from './layers';
import { MouseCursorLocationPanel } from './panels';
import MapAnimationCompleteHandler from './controls/MapAnimationCompleteHandler';
import { BasicMapProps } from './types/map.types';

const { PRODUCT_REGION_BOX_LAYER_ID, ARGO_AS_PRODUCT_POINT_LAYER_ID } = mapboxLayerIds;
const interactiveIds = [PRODUCT_REGION_BOX_LAYER_ID, ARGO_AS_PRODUCT_POINT_LAYER_ID];

const BasicMap: React.FC<BasicMapProps> = ({
  id = mapboxInstanceIds.OCEAN_CURRENT_BASIC_MAP_ID,
  mapStyle = MAP_STYLE as StyleSpecification,
  style,
  children,
  isMiniMap = false,
  navigationControl = true,
  showCursorLocationPanel = true,
  mapWrapperRef,
  onMoveStart,
  onContainerResize,
}) => {
  const [cursor, setCursor] = useState<string>('grab');
  const [cursorLngLat, setCursorLngLat] = useState<{
    lng: number;
    lat: number;
  } | null>(null);
  const mapRef = useRef<MapRef | null>(null);
  const hasAppliedViewLimitsRef = useRef<boolean>(false);
  const useMapViewState = useMapStore((state) => state.mapViewState);
  const { isArgo, isCurrentMeters } = useProductCheck();
  const { isMobile } = useDeviceType();
  const { mainProduct, subProduct } = useProductConvert();

  const shouldShowArgoLayer = useMemo(() => {
    if (!mainProduct?.key) return false;

    if (isMiniMap) {
      return isArgo;
    }

    return PRODUCTS_WITH_ARGO_DATA.includes(mainProduct.key);
  }, [isMiniMap, isArgo, mainProduct?.key]);

  const shouldShowCursorLocationPanel = showCursorLocationPanel && !isMobile && cursorLngLat?.lng && cursorLngLat?.lat;

  const handleMapResize = useCallback(() => {
    if (mapRef.current) {
      mapRef.current.resize();
      onContainerResize?.();
    }
  }, [onContainerResize]);

  useResizeObserver((mapWrapperRef as React.RefObject<HTMLDivElement>) || null, handleMapResize);

  useEffect(() => {
    resetCurrentMetersStore();
    if (isMobile) {
      patchMapViewState(initialMobileMapViewState.mapViewState);
    }
  }, [isMobile]);

  const handleMove = useCallback(({ viewState }: ViewStateChangeEvent) => {
    setMapViewState(viewState);
  }, []);

  const handleZoom = useCallback(({ viewState }: ViewStateChangeEvent) => {
    updateZoom(viewState.zoom);
  }, []);

  const handleMouseMove = useCallback((e: MapMouseEvent) => {
    const { lng, lat } = e.lngLat;
    setCursorLngLat({ lng, lat });
  }, []);

  const handleMouseEnter = useCallback(() => setCursor('pointer'), []);
  const handleMouseLeave = useCallback(() => setCursor('grab'), []);

  const memoizedLayers = useMemo(
    () => ({
      dataImageLayer: <DataImageLayer />,
      currentMetersDeploymentPlotsLayer: (
        <CurrentMetersDeploymentPlotsLayer isMiniMap={isMiniMap} subProduct={subProduct} />
      ),
      regionPolygonLayer: <RegionPolygonLayer isMiniMap={isMiniMap} />,
      argoAsProductLayer: <ArgoAsProductLayer isMiniMap={isMiniMap} isArgo={isArgo} />,
    }),
    [isMiniMap, isArgo, subProduct],
  );

  const applyViewLimits = useCallback(
    (map: MapboxMap) => {
      if (isMiniMap) {
        return;
      }

      const camera = map.cameraForBounds(MAP_LIMIT_BOUNDS, { padding: 40 });

      if (camera?.zoom != null) {
        map.setMinZoom(camera.zoom);
      }

      // For the main Argo map, maxBounds is managed dynamically in ArgoAsProductLayer.
      if (!isArgo) {
        map.setMaxBounds(MAP_LIMIT_BOUNDS);
      }
    },
    [isArgo, isMiniMap],
  );

  const handleRender = useCallback(() => {
    if (hasAppliedViewLimitsRef.current) return;

    const mapbox = mapRef.current?.getMap();
    if (!mapbox || !mapbox.isStyleLoaded()) return;

    applyViewLimits(mapbox);
    hasAppliedViewLimitsRef.current = true;
  }, [applyViewLimits]);

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
      ref={mapRef}
      id={id}
      data-testid={id}
      mapboxAccessToken={mapConfig.accessToken}
      {...useMapViewState}
      bearing={0}
      pitch={0}
      cursor={cursor}
      onRender={handleRender}
      onMoveStart={onMoveStart}
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
      dragRotate={false}
      touchPitch={false}
      pitchWithRotate={false}
    >
      {children}
      {navigationControl && <NavigationControl position="top-right" />}

      {shouldShowCursorLocationPanel && <MouseCursorLocationPanel lat={cursorLngLat?.lat} lng={cursorLngLat?.lng} />}

      {/* Control to handle actions after map animations complete */}
      <MapAnimationCompleteHandler />

      {memoizedLayers.dataImageLayer}
      {!isArgo && memoizedLayers.regionPolygonLayer}
      {shouldShowArgoLayer && memoizedLayers.argoAsProductLayer}
      {isCurrentMeters && memoizedLayers.currentMetersDeploymentPlotsLayer}
    </Map>
  );
};

export default BasicMap;
