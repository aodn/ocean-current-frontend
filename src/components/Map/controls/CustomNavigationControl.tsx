import React, { useEffect, useRef, useCallback } from 'react';
import { useMap } from 'react-map-gl/mapbox';
import type { IControl } from 'mapbox-gl';
import { initialMapViewState, initialMobileMapViewState, mapAnimation } from '@/configs/map';
import { useDeviceType } from '@/hooks';

interface CustomNavigationControlProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

/**
 * Custom map control with zoom in/out, compass, and a reset-to-initial-view button.
 * Implements the Mapbox IControl interface directly rather than wrapping NavigationControl.
 */
const CustomNavigationControl: React.FC<CustomNavigationControlProps> = ({ position = 'top-right' }) => {
  const { current: map } = useMap();
  const { isMobile } = useDeviceType();
  const controlRef = useRef<IControl | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleReset = useCallback(() => {
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
  }, [map, isMobile]);

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

        // Add compass/reset bearing button
        const compassButton = document.createElement('button');
        compassButton.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-compass';
        compassButton.type = 'button';
        compassButton.title = 'Reset bearing to north';
        compassButton.setAttribute('aria-label', 'Reset bearing to north');
        const compassArrow = document.createElement('span');
        compassArrow.className = 'mapboxgl-ctrl-icon';
        compassArrow.setAttribute('aria-hidden', 'true');
        compassButton.appendChild(compassArrow);
        compassButton.addEventListener('click', () => {
          mapInstance.resetNorth();
        });
        container.appendChild(compassButton);

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
        resetButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M204-318q-22-38-33-78t-11-82q0-134 93-228t227-94h7l-64-64 56-56 160 160-160 160-56-56 64-64h-7q-100 0-170 70.5T240-478q0 26 6 51t18 49l-60 60ZM481-40 321-200l160-160 56 56-64 64h7q100 0 170-70.5T720-482q0-26-6-51t-18-49l60-60q22 38 33 78t11 82q0 134-93 228t-227 94h-7l64 64-56 56Z"/></svg>
        `;
        resetButton.addEventListener('click', handleReset);
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
