/**
 * Breakpoint values in pixels
 * These are used by both Tailwind CSS and media query hooks
 */
export const breakpoints = {
  sm: 450,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

/**
 * Legacy breakpoint constants for backward compatibility
 * @deprecated Use breakpoints object instead
 */
export const minBreakpoint = 320; // sm (legacy)
export const mobileBreakpoint = breakpoints.md; // md
export const tabletBreakpoint = breakpoints.xl; // xl

export enum DeviceType {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  DESKTOP = 'desktop',
}
