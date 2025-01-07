import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useDeviceType from './useDeviceType';

describe('useDeviceType', () => {
  let originalInnerWidth: number;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
    vi.useFakeTimers();
  });

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should return isMobile as true when window width is less than 768px', () => {
    window.innerWidth = 600;
    const { result } = renderHook(() => useDeviceType());
    expect(result.current).toEqual({
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    });
  });

  it('should return isTablet as true when window width is between 768px and 1280px', () => {
    window.innerWidth = 1024;
    const { result } = renderHook(() => useDeviceType());
    expect(result.current).toEqual({
      isMobile: false,
      isTablet: true,
      isDesktop: false,
    });
  });

  it('should return isDesktop as true when window width is greater than or equal to 1280px', () => {
    window.innerWidth = 1280;
    const { result } = renderHook(() => useDeviceType());
    expect(result.current).toEqual({
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    });
  });

  it('should update the values when the window size changes', () => {
    window.innerWidth = 1024;
    const { result } = renderHook(() => useDeviceType());
    expect(result.current).toEqual({
      isMobile: false,
      isTablet: true,
      isDesktop: false,
    });

    act(() => {
      window.innerWidth = 600;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    });

    act(() => {
      window.innerWidth = 1300;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    });
  });

  it('should correctly add and remove the event listener', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useDeviceType());

    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });
});
