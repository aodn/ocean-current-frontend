import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useLocation, useMatch } from 'react-router';
import { getProductByPath } from '@/utils/product-utils/product';
import { useProductIdFromUrl } from './useProductIdFromUrl';

vi.mock('react-router', () => ({
  useLocation: vi.fn(),
  useMatch: vi.fn(),
}));

vi.mock('@/utils/product-utils/product', () => ({
  getProductByPath: vi.fn(),
}));

describe('useProductIdFromUrl', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/product/invalid-product',
      state: undefined,
      key: '',
      search: '',
      hash: '',
    });
  });

  it('should return undefined when getProductByPath throws for an invalid product path', () => {
    vi.mocked(useMatch)
      .mockReturnValueOnce({ params: { product: 'invalid-product' } } as unknown as ReturnType<typeof useMatch>)
      .mockReturnValueOnce(null);

    vi.mocked(getProductByPath).mockImplementation(() => {
      throw new Error('Product not found');
    });

    const { result } = renderHook(() => useProductIdFromUrl('product'));

    expect(result.current).toBeUndefined();
  });

  it('should return undefined when getProductByPath throws for an invalid sub-product path', () => {
    vi.mocked(useMatch)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce({
        params: { product: 'valid-product', subProduct: 'invalid-sub' },
      } as unknown as ReturnType<typeof useMatch>);

    vi.mocked(getProductByPath).mockImplementation(() => {
      throw new Error('Product not found');
    });

    const { result } = renderHook(() => useProductIdFromUrl('product'));

    expect(result.current).toBeUndefined();
  });
});
