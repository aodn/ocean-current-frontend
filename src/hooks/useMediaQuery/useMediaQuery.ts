import { useState, useEffect } from 'react';
import { breakpoints } from '@/styles/screens';

/**
 * Custom hook to track media query matches
 * @param query - The media query string (e.g., '(min-width: 768px)')
 * @returns boolean indicating if the media query matches
 *
 * @example
 * const isDesktop = useMediaQuery('(min-width: 768px)');
 * const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
 */
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    setMatches(mediaQuery.matches);

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;

/**
 * Hook to detect if viewport is mobile size (< md breakpoint)
 * Matches below Tailwind's md breakpoint
 */
export const useIsMobile = () => useMediaQuery(`(max-width: ${breakpoints.md - 1}px)`);

/**
 * Hook to detect if viewport is tablet size (md - xl breakpoint)
 * Matches between Tailwind's md and xl breakpoints
 */
export const useIsTablet = () =>
  useMediaQuery(`(min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.xl - 1}px)`);

/**
 * Hook to detect if viewport is desktop size (>= xl breakpoint)
 * Matches Tailwind's xl breakpoint and above
 */
export const useIsDesktop = () => useMediaQuery(`(min-width: ${breakpoints.xl}px)`);

/**
 * Hook to detect if viewport is at least tablet size (>= md breakpoint)
 * Matches Tailwind's md breakpoint and above
 */
export const useIsTabletOrDesktop = () => useMediaQuery(`(min-width: ${breakpoints.md}px)`);

/**
 * Hook to detect if viewport is small mobile (< sm breakpoint)
 * Below Tailwind's sm breakpoint
 */
export const useIsSmallMobile = () => useMediaQuery(`(max-width: ${breakpoints.sm - 1}px)`);

/**
 * Hook to detect if viewport is at least small (>= sm breakpoint)
 * Matches Tailwind's sm breakpoint and above
 */
export const useIsSmallAndAbove = () => useMediaQuery(`(min-width: ${breakpoints.sm}px)`);

/**
 * Hook to get all device type states at once
 * @returns Object with isMobile, isTablet, and isDesktop boolean flags
 *
 * @example
 * const { isMobile, isTablet, isDesktop } = useDeviceTypes();
 */
export const useDeviceTypes = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();

  return { isMobile, isTablet, isDesktop };
};
