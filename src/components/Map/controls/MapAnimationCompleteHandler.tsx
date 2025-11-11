import React, { useEffect, useRef } from 'react';
import { MapMouseEvent, useMap } from 'react-map-gl/mapbox';
import { updateInteractiveLayerClickTimestamp } from '@/stores/map-store/mapStore';
import { mapboxLayerIds } from '@/constants/mapboxId';

const { PRODUCT_REGION_BOX_LAYER_ID, ARGO_AS_PRODUCT_POINT_LAYER_ID, CURRENT_METERS_PLOT_LAYER_ID } = mapboxLayerIds;

interface MapAnimationCompleteHandlerProps {
  /**
   * Optional additional callback to execute after map animations complete.
   * The default notifyInteractiveLayerClick is always called.
   */
  onAnimationComplete?: () => void;
}

/**
 * A control component that listens for user interactions on the map
 * and executes callbacks after map animations (moveend) complete.
 *
 * This ensures that actions happen after smooth map transitions finish,
 * providing better UX by not interrupting animations.
 *
 * This component doesn't render anything visible - it only handles events.
 */
const MapAnimationCompleteHandler: React.FC<MapAnimationCompleteHandlerProps> = ({ onAnimationComplete }) => {
  const { current: map } = useMap();
  const hasPendingAction = useRef(false);

  useEffect(() => {
    if (!map) return;

    const handleClick = (e: MapMouseEvent) => {
      // Query if any interactive layers were clicked
      // Check which layers exist in the map's style before querying
      const existingLayers = [
        PRODUCT_REGION_BOX_LAYER_ID,
        ARGO_AS_PRODUCT_POINT_LAYER_ID,
        CURRENT_METERS_PLOT_LAYER_ID,
      ].filter((layerId) => map.getLayer(layerId));

      if (existingLayers.length === 0) return;

      const features = map.queryRenderedFeatures(e.point, {
        layers: existingLayers,
      });

      if (features.length > 0) {
        hasPendingAction.current = true;
      }
    };

    const handleMoveEnd = () => {
      if (hasPendingAction.current) {
        hasPendingAction.current = false;
        updateInteractiveLayerClickTimestamp();
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }
    };

    map.on('click', handleClick);

    // Listen for moveend to execute callback after animations complete
    map.on('moveend', handleMoveEnd);

    return () => {
      map.off('click', handleClick);
      map.off('moveend', handleMoveEnd);
    };
  }, [map, onAnimationComplete]);

  return null;
};

export default MapAnimationCompleteHandler;
