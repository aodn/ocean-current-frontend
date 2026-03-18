import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { breakpoints } from '@/styles/screens';
import useMediaQuery, { useIsMobile, useIsTablet, useIsDesktop } from './useMediaQuery';

const mockMatchMedia = (matches: boolean) => {
  const listeners = new Set<(e: MediaQueryListEvent) => void>();
  const mql = {
    matches,
    addEventListener: vi.fn((_event: string, cb: (e: MediaQueryListEvent) => void) => listeners.add(cb)),
    removeEventListener: vi.fn((_event: string, cb: (e: MediaQueryListEvent) => void) => listeners.delete(cb)),
    dispatchChange: (newMatches: boolean) => {
      listeners.forEach((cb) => cb({ matches: newMatches } as MediaQueryListEvent));
    },
  };
  window.matchMedia = vi.fn().mockReturnValue(mql);
  return mql;
};

describe('useMediaQuery', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns true when the media query initially matches', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(true);
  });

  it('returns false when the media query initially does not match', () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(false);
  });

  it('updates when the media query match changes', () => {
    const mql = mockMatchMedia(false);
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(false);

    act(() => mql.dispatchChange(true));
    expect(result.current).toBe(true);

    act(() => mql.dispatchChange(false));
    expect(result.current).toBe(false);
  });

  it('removes the event listener on unmount', () => {
    const mql = mockMatchMedia(true);
    const { unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    unmount();
    expect(mql.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });
});

describe('device type hooks use correct breakpoints', () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('useIsMobile queries below md breakpoint', () => {
    renderHook(() => useIsMobile());
    expect(window.matchMedia).toHaveBeenCalledWith(`(max-width: ${breakpoints.md - 1}px)`);
  });

  it('useIsTablet queries between md and xl breakpoints', () => {
    renderHook(() => useIsTablet());
    expect(window.matchMedia).toHaveBeenCalledWith(
      `(min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.xl - 1}px)`,
    );
  });

  it('useIsDesktop queries at xl breakpoint and above', () => {
    renderHook(() => useIsDesktop());
    expect(window.matchMedia).toHaveBeenCalledWith(`(min-width: ${breakpoints.xl}px)`);
  });
});
