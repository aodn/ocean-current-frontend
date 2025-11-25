import { useCallback, useEffect, useRef, useState } from 'react';
import { useThrottle } from '../useThrottle';

export interface ElementMetrics {
  itemWidth: number;
  gapWidth: number;
  containerWidth: number;
}

export interface UseElementMetricsOptions {
  /**
   * Test ID of the container element to measure gap from
   */
  containerTestId?: string;
  /**
   * Dependencies that should trigger re-measurement
   */
  dependencies?: React.DependencyList;
  /**
   * Throttle time in milliseconds for resize events
   * Uses throttle (not debounce) to provide real-time feedback during window resize
   * @default 200
   */
  throttleMs?: number;
}

export interface UseElementMetricsReturn {
  itemRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  metrics: ElementMetrics;
}

/**
 * Custom hook to dynamically measure element dimensions and container gaps
 *
 * This hook measures the actual rendered width of an item and the gap between items
 * in a flex container. It automatically re-measures on window resize (with throttling
 * for real-time feedback) and when dependencies change.
 *
 * @param options - Configuration options
 * @returns Object containing refs and measured metrics
 *
 * @example
 * ```tsx
 * // For a carousel with responsive items
 * const { itemRef, containerRef, metrics } = useElementMetrics({
 *   containerTestId: 'carousel-container',
 *   dependencies: [isMobile, isTablet, isDesktop],
 *   throttleMs: 150
 * });
 * const { itemWidth, gapWidth } = metrics;
 *
 * return (
 *   <div ref={containerRef}>
 *     <div data-testid="carousel-container" className="flex gap-4">
 *       {items.map((item, index) => (
 *         <div key={item.id} ref={index === 0 ? itemRef : null} className="w-32">
 *           {item.content}
 *         </div>
 *       ))}
 *     </div>
 *   </div>
 * );
 * ```
 */
export function useElementMetrics(options: UseElementMetricsOptions = {}): UseElementMetricsReturn {
  const { containerTestId, dependencies = [], throttleMs = 200 } = options;
  const [metrics, setMetrics] = useState<ElementMetrics>({ itemWidth: 0, gapWidth: 0, containerWidth: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const measureDimensions = useCallback(() => {
    if (!itemRef.current || !containerRef.current) return;

    const itemElement = itemRef.current;
    const containerElement = containerRef.current;
    let targetContainer: Element | null = containerElement;

    if (containerTestId) {
      targetContainer = containerElement.querySelector(`[data-testid="${containerTestId}"]`);
    }

    if (!targetContainer) return;

    const itemWidth = itemElement.offsetWidth;
    const containerWidth = containerElement.offsetWidth;
    const computedStyle = window.getComputedStyle(targetContainer);
    const gapWidth = parseFloat(computedStyle.columnGap) || 0;

    setMetrics({ itemWidth, gapWidth, containerWidth });
  }, [containerTestId]);

  const throttledMeasure = useThrottle(measureDimensions, throttleMs);

  useEffect(() => {
    measureDimensions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, measureDimensions]);

  useEffect(() => {
    window.addEventListener('resize', throttledMeasure);
    return () => window.removeEventListener('resize', throttledMeasure);
  }, [throttledMeasure]);

  return { itemRef, containerRef, metrics };
}
