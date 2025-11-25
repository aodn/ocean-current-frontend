import { useCallback, useEffect, useRef } from 'react';

/**
 * Custom hook to throttle a function
 *
 * Throttling ensures that a function is called at most once in a specified time period.
 * This is useful for performance optimization when handling high-frequency events like
 * scrolling, resizing, or mousemove.
 *
 * @param callback - The function to throttle
 * @param delay - The throttle delay in milliseconds (must be >= 0)
 * @returns A throttled version of the callback function
 *
 * @example
 * ```tsx
 * const handleResize = useThrottle(() => {
 *   console.log('Window resized!');
 * }, 200);
 *
 * useEffect(() => {
 *   window.addEventListener('resize', handleResize);
 *   return () => window.removeEventListener('resize', handleResize);
 * }, [handleResize]);
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const lastRan = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackRef = useRef(callback);

  // Keep callback ref up to date
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Cleanup timeout on unmount or when delay changes
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [delay]);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const throttleDelay = Math.max(0, delay);

      if (throttleDelay === 0) {
        // If delay is 0, execute immediately without throttling
        callbackRef.current(...args);
        lastRan.current = now;
        return;
      }

      if (now - lastRan.current >= throttleDelay) {
        // First call or enough time has passed - execute immediately
        callbackRef.current(...args);
        lastRan.current = now;
      } else {
        // Too soon - schedule for later
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        const remainingTime = throttleDelay - (now - lastRan.current);
        timeoutRef.current = setTimeout(
          () => {
            callbackRef.current(...args);
            lastRan.current = Date.now();
            timeoutRef.current = null;
          },
          Math.max(0, remainingTime),
        );
      }
    },
    [delay],
  );
}
