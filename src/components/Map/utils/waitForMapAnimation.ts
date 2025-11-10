import { MapRef } from 'react-map-gl/mapbox';

/**
 * Utility function to wait for map animations to complete before executing a callback.
 * This ensures smooth UX by not interrupting map transitions like fitBounds.
 *
 * @param map - The map instance from useMap()
 * @param callback - Function to execute after animation completes
 */
export const waitForMapAnimation = (map: MapRef | null, callback: () => void): void => {
  if (!map) {
    callback();
    return;
  }

  map.once('moveend', () => {
    callback();
  });
};

/**
 * Promise-based version of waitForMapAnimation for use with async/await.
 * Only waits if the map is actually moving/animating. If the map is static,
 * resolves immediately.
 *
 * @param map - The map instance from useMap()
 * @returns Promise that resolves when the animation completes or immediately if map is not moving
 */
export const waitForMapAnimationAsync = (map: MapRef | null): Promise<void> => {
  return new Promise((resolve) => {
    if (!map) {
      resolve();
      return;
    }

    if (map.isMoving()) {
      map.once('moveend', () => {
        resolve();
      });
    } else {
      resolve();
    }
  });
};
