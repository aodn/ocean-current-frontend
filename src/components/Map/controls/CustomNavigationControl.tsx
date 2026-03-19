import React, { useEffect, useRef, useCallback } from 'react';
import { useMap } from 'react-map-gl/mapbox';
import type { IControl, Map } from 'mapbox-gl';
import { initialMapViewState, initialMobileMapViewState, mapAnimation } from '@/configs/map';
import { useDeviceTypes } from '@/hooks';

interface CustomNavigationControlProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

/**
 * Custom map control with zoom in/out, compass, and a reset-to-initial-view button.
 * Implements the Mapbox IControl interface directly rather than wrapping NavigationControl.
 */
const CustomNavigationControl: React.FC<CustomNavigationControlProps> = ({ position = 'top-right' }) => {
  const { current: map } = useMap();
  const { isMobile } = useDeviceTypes();
  const controlRef = useRef<IControl | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleReset = useCallback(
    (map: Map) => {
      if (!map) return;

      // Determine which initial state to use
      const targetViewState = isMobile ? initialMobileMapViewState.mapViewState : initialMapViewState.mapViewState;

      // Animate to the initial view state.
      // The store is kept in sync via BasicMap's onMove handler during the animation,
      // so no explicit store patch is needed here. Passing padding explicitly ensures
      // it is also reset and propagated through onMove.
      map.flyTo({
        center: [targetViewState.longitude, targetViewState.latitude],
        zoom: targetViewState.zoom,
        bearing: targetViewState.bearing,
        pitch: targetViewState.pitch,
        padding: targetViewState.padding,
        duration: mapAnimation.duration,
      });
    },
    [isMobile],
  );

  useEffect(() => {
    if (!map) return;

    // Create a custom control with zoom in/out, compass, and reset buttons
    const customControl: IControl = {
      onAdd: (mapInstance) => {
        // Create the main container
        const container = document.createElement('div');
        container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
        containerRef.current = container;

        // Add zoom in button
        const zoomInButton = document.createElement('button');
        zoomInButton.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-zoom-in';
        zoomInButton.type = 'button';
        zoomInButton.title = 'Zoom in';
        zoomInButton.setAttribute('aria-label', 'Zoom in');
        zoomInButton.innerHTML = '<span class="mapboxgl-ctrl-icon" aria-hidden="true"></span>';
        zoomInButton.addEventListener('click', () => {
          mapInstance.zoomIn();
        });
        container.appendChild(zoomInButton);

        // Add zoom out button
        const zoomOutButton = document.createElement('button');
        zoomOutButton.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-zoom-out';
        zoomOutButton.type = 'button';
        zoomOutButton.title = 'Zoom out';
        zoomOutButton.setAttribute('aria-label', 'Zoom out');
        zoomOutButton.innerHTML = '<span class="mapboxgl-ctrl-icon" aria-hidden="true"></span>';
        zoomOutButton.addEventListener('click', () => {
          mapInstance.zoomOut();
        });
        container.appendChild(zoomOutButton);

        // Add reset view button (custom)
        const resetButton = document.createElement('button');
        resetButton.className = 'mapboxgl-ctrl-icon';
        resetButton.type = 'button';
        resetButton.title = 'Reset map to initial view';
        resetButton.setAttribute('aria-label', 'Reset map to initial view');
        resetButton.style.cssText = `
          background-image: none;
          display: flex;
          align-items: center;
          justify-content: center;
        `;
        resetButton.innerHTML = `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="20px" fill="currentColor">
          <path d="M26.16,29.86l-6.14,6.14-.02-3.67c-3.3,0-6.4-1.31-8.69-3.6-4.64-4.63-4.89-12.27-.3-17.1-1.87,3.45-1.95,7.37.09,10.75,1.83,3.03,5.21,5.04,8.9,5.01l.03-3.66,6.14,6.13Z"/>
          <path d="M20.01,12.61l-.03,3.67-6.14-6.14,6.14-6.14.02,3.68c4.79-.02,9.11,2.8,11.12,7.01,2.13,4.49,1.4,9.96-2.07,13.61,1.83-3.48,1.9-7.36-.16-10.73-1.82-2.98-5.17-4.98-8.88-4.97Z"/>
          </svg>
        `;
        resetButton.addEventListener('click', () => handleReset(mapInstance));
        container.appendChild(resetButton);

        return container;
      },
      onRemove: () => {
        if (containerRef.current && containerRef.current.parentNode) {
          containerRef.current.parentNode.removeChild(containerRef.current);
        }
        containerRef.current = null;
      },
    };

    // Add the control to the map
    map.addControl(customControl, position);
    controlRef.current = customControl;

    return () => {
      if (controlRef.current) {
        map.removeControl(controlRef.current);
      }
    };
  }, [map, position, handleReset]);

  return null;
};

export default CustomNavigationControl;
