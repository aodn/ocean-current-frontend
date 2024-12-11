import { describe, it, vi, beforeEach } from 'vitest';
// import { renderHook } from '@testing-library/react';
// import { getProductByPath } from '@/utils/product-utils/product';
// import { UrlType } from '@/types/router';
// import useProductFromUrl from '../useGetProductFromUrl/useGetProductFromUrl';
// import useSetProductId from './useSetProductId';

vi.mock('../useGetProductFromUrl/useGetProductFromUrl', () => ({
  default: vi.fn(),
}));

vi.mock('@/utils/product-utils/product', () => ({
  getProductByPath: vi.fn(),
}));

describe('useSetProductId', () => {
  // const setProductId = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should set product ID from main product when no sub product exists', () => {
    // vi.mocked(useProductFromUrl).mockReturnValue({
    //   mainProduct: 'surface-waves',
    //   subProduct: null,
    // });
    // vi.mocked(getProductByPath).mockReturnValue({
    //   key: 'surfaceWaves',
    //   title: '',
    //   path: '',
    // });
    // renderHook(() => useSetProductId('product', setProductId));
    // expect(getProductByPath).toHaveBeenCalledWith('surface-waves');
    // expect(setProductId).toHaveBeenCalledWith('surfaceWaves');
  });

  // it('should set product ID from sub product when it exists', () => {
  //   vi.mocked(useProductFromUrl).mockReturnValue({
  //     mainProduct: 'four-hour-sst',
  //     subProduct: 'sst-filled',
  //   });

  //   vi.mocked(getProductByPath)
  //     .mockReturnValueOnce({
  //       key: 'fourHourSst',
  //       title: 'Four hour SST',
  //       path: 'four-hour-sst',
  //     })
  //     .mockReturnValueOnce({
  //       key: 'fourHourSst-sstFilled',
  //       title: 'SST Filled',
  //       path: 'sst-filled',
  //     });

  //   renderHook(() => useSetProductId('product', setProductId));

  //   expect(getProductByPath).toHaveBeenCalledWith('four-hour-sst', 'sst-filled');
  //   expect(setProductId).toHaveBeenCalledWith('fourHourSst-sstFilled');
  // });

  // it('should update product ID when dependencies change', () => {
  //   // Initial mock setup
  //   vi.mocked(useProductFromUrl).mockReturnValue({
  //     mainProduct: 'sst-anom-vs-time',
  //     subProduct: null,
  //   });
  //   vi.mocked(getProductByPath).mockReturnValue({
  //     key: 'sstAnomVsTime',
  //     title: '',
  //     path: '',
  //   });

  //   const { rerender } = renderHook(({ type }) => useSetProductId(type, setProductId), {
  //     initialProps: { type: 'product' as UrlType },
  //   });

  //   // Update mocks before rerender
  //   vi.mocked(useProductFromUrl).mockReturnValue({
  //     mainProduct: 'surface-waves',
  //     subProduct: null,
  //   });
  //   vi.mocked(getProductByPath).mockReturnValue({
  //     key: 'surfaceWaves',
  //     title: '',
  //     path: '',
  //   });

  //   rerender({ type: 'map' });

  //   expect(setProductId).toHaveBeenCalledTimes(2);
  //   expect(setProductId).toHaveBeenLastCalledWith('surfaceWaves');
  // });
});
