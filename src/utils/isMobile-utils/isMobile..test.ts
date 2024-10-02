import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from './isMobile';

describe('useIsMobile', () => {
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

  it('debería devolver true cuando el ancho de la ventana es menor o igual a 768px', () => {
    window.innerWidth = 768;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('debería devolver false cuando el ancho de la ventana es mayor a 768px', () => {
    window.innerWidth = 1024;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('debería actualizar el valor cuando cambia el tamaño de la ventana', () => {
    window.innerWidth = 1024;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    act(() => {
      window.innerWidth = 600;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(true);
  });

  it('debería agregar y eliminar el event listener correctamente', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useIsMobile());

    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });
});
