import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useLocation } from 'react-router-dom';
import useUrlType from './useUrlType';

vi.mock('react-router-dom', () => ({
  useLocation: vi.fn(),
}));

describe('useUrlType', () => {
  it('should return "map" when URL starts with /map', () => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/map/some/path',
      state: undefined,
      key: '',
      search: '',
      hash: '',
    });

    const { result } = renderHook(() => useUrlType());

    expect(result.current).toBe('map');
  });

  it('should return "product" when URL starts with /product', () => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/product/some/path',
      state: undefined,
      key: '',
      search: '',
      hash: '',
    });
    const { result } = renderHook(() => useUrlType());
    expect(result.current).toBe('product');
  });

  it('should return "product" when URL starts with anything else', () => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/other/path',
      state: undefined,
      key: '',
      search: '',
      hash: '',
    });

    const { result } = renderHook(() => useUrlType());

    expect(result.current).toBe('product');
  });

  it('should return "product" when URL is empty', () => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/',
      state: undefined,
      key: '',
      search: '',
      hash: '',
    });

    const { result } = renderHook(() => useUrlType());

    expect(result.current).toBe('product');
  });
});
