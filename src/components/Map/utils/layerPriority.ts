import type { Map } from 'mapbox-gl';
import { MapMouseEvent, MapRef } from 'react-map-gl/mapbox';
import { mapboxLayerIds } from '@/constants/mapboxId';

const { CURRENT_METERS_PLOT_LAYER_ID, ARGO_AS_PRODUCT_POINT_LAYER_ID, PRODUCT_REGION_BOX_LAYER_ID } = mapboxLayerIds;

/**
 * Layer priority order from highest to lowest.
 * Layers at the top of this array have higher priority and will block clicks to lower layers.
 *
 * IMPORTANT: Layers may be conditionally rendered (e.g., only shown for certain products).
 * The utility functions automatically check if a layer exists before querying it.
 */
export const INTERACTIVE_LAYER_PRIORITY = [
  CURRENT_METERS_PLOT_LAYER_ID, // Highest priority (conditionally rendered)
  ARGO_AS_PRODUCT_POINT_LAYER_ID, // (conditionally rendered)
  PRODUCT_REGION_BOX_LAYER_ID, // Lowest priority (conditionally rendered)
] as const;

/**
 * Layers that should block region hover effects when they have features.
 *
 * - Argo points: Independent observations, shouldn't show region highlight
 * - CurrentMeter points: NOT in this list, so region highlight shows (dual effect)
 */
export const LAYERS_BLOCKING_REGION_HOVER = [ARGO_AS_PRODUCT_POINT_LAYER_ID] as const;

/**
 * Checks if any higher-priority layers have features at the click point.
 * Use this to prevent handling clicks when a higher-priority layer should handle it.
 *
 * @param map - Mapbox map instance
 * @param e - Map click event
 * @param currentLayerId - The layer ID checking for priority
 * @returns true if a higher-priority layer has a feature at the click point
 *
 * @example
 * const handleMouseClick = useCallback((e: MapMouseEvent) => {
 *   if (!map) return;
 *
 *   // Don't handle click if a higher-priority layer has a feature here
 *   if (shouldDeferToHigherPriorityLayer(map, e, PRODUCT_REGION_BOX_LAYER_ID)) {
 *     return;
 *   }
 *
 *   // Continue with click handling...
 * }, [map]);
 */
export const shouldDeferToHigherPriorityLayer = (
  map: Map | MapRef,
  e: MapMouseEvent,
  currentLayerId: string,
): boolean => {
  const currentLayerIndex = INTERACTIVE_LAYER_PRIORITY.indexOf(
    currentLayerId as (typeof INTERACTIVE_LAYER_PRIORITY)[number],
  );

  // If layer not found or is highest priority, don't defer
  if (currentLayerIndex === -1 || currentLayerIndex === 0) {
    return false;
  }

  // Check all higher-priority layers (those before current layer in array)
  const higherPriorityLayers = INTERACTIVE_LAYER_PRIORITY.slice(0, currentLayerIndex);

  for (const layerId of higherPriorityLayers) {
    const layer = map.getLayer(layerId);
    if (!layer) {
      continue;
    }

    const features = map.queryRenderedFeatures(e.point, {
      layers: [layerId],
    });

    if (features.length > 0) {
      return true; // A higher-priority layer has a feature here
    }
  }

  return false; // No higher-priority layers have features here
};

/**
 * Checks if the current layer has any features at the click point.
 * Use this for early return if the layer has no features to handle.
 *
 * @param map - Mapbox map instance
 * @param e - Map click event
 * @param layerId - The layer ID to check
 * @returns true if the layer has features at the click point
 */
export const hasFeatureAtPoint = (map: Map | MapRef, e: MapMouseEvent, layerId: string): boolean => {
  const layer = map.getLayer(layerId);
  if (!layer) {
    return false; // Layer doesn't exist (conditionally rendered)
  }

  const features = map.queryRenderedFeatures(e.point, {
    layers: [layerId],
  });

  return features.length > 0;
};

/**
 * Checks if region hover should be blocked by a higher-priority layer.
 * Some layers (like Argo points) should block region highlighting, while others
 * (like CurrentMeter plots) should allow dual hover effects.
 *
 * @param map - Mapbox map instance
 * @param e - Map hover event
 * @returns true if a layer that blocks region hover has a feature here
 *
 * @example
 * // In RegionPolygonLayer hover handler:
 * if (shouldBlockRegionHover(map, e)) {
 *   clearRegionHover();
 *   return;
 * }
 * // Continue with region highlighting...
 */
export const shouldBlockRegionHover = (map: Map | MapRef, e: MapMouseEvent): boolean => {
  for (const layerId of LAYERS_BLOCKING_REGION_HOVER) {
    // Check if the layer exists on the map first
    const layer = map.getLayer(layerId);
    if (!layer) {
      continue; // Skip layers that don't exist (conditionally rendered)
    }

    const features = map.queryRenderedFeatures(e.point, {
      layers: [layerId],
    });

    if (features.length > 0) {
      return true; // This layer blocks region hover
    }
  }

  return false; // No blocking layers have features here
};
