import { renderHook, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { createQueryWrapper } from '@/test/queryClientUtils';
import { fetchRegionLatestDatesByProductId } from '@/services/imageList';
import { API_LATEST_DATES_DISABLED_PRODUCTS } from '@/configs/products/data-source';
import { useRegionLatestDates, useMultipleRegionLatestDates } from './useRegionLatestDates';

vi.mock('@/services/imageList');

const DISABLED_PRODUCT = API_LATEST_DATES_DISABLED_PRODUCTS[0];
const ENABLED_PRODUCT = 'fourHourSst-sst';

describe('useRegionLatestDates', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('disables the query for products in API_LATEST_DATES_DISABLED_PRODUCTS', () => {
    const { result } = renderHook(() => useRegionLatestDates(DISABLED_PRODUCT), {
      wrapper: createQueryWrapper(),
    });

    expect(result.current.fetchStatus).toBe('idle');
    expect(fetchRegionLatestDatesByProductId).not.toHaveBeenCalled();
  });

  it('enables the query for products not in API_LATEST_DATES_DISABLED_PRODUCTS', async () => {
    const mockResponse = { dates: ['2024-01-01'] };
    vi.mocked(fetchRegionLatestDatesByProductId).mockResolvedValue(mockResponse as never);

    const { result } = renderHook(() => useRegionLatestDates(ENABLED_PRODUCT), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(fetchRegionLatestDatesByProductId).toHaveBeenCalledWith(ENABLED_PRODUCT);
    expect(result.current.data).toEqual(mockResponse);
  });

  it('respects enabled=false for products not in the disabled list', () => {
    const { result } = renderHook(() => useRegionLatestDates(ENABLED_PRODUCT, false), {
      wrapper: createQueryWrapper(),
    });

    expect(result.current.fetchStatus).toBe('idle');
    expect(fetchRegionLatestDatesByProductId).not.toHaveBeenCalled();
  });

  it('keeps the query disabled even when enabled=true is passed for a disabled product', () => {
    const { result } = renderHook(() => useRegionLatestDates(DISABLED_PRODUCT, true), {
      wrapper: createQueryWrapper(),
    });

    expect(result.current.fetchStatus).toBe('idle');
    expect(fetchRegionLatestDatesByProductId).not.toHaveBeenCalled();
  });
});

describe('useMultipleRegionLatestDates', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('disables queries for products in API_LATEST_DATES_DISABLED_PRODUCTS', () => {
    const { result } = renderHook(() => useMultipleRegionLatestDates([DISABLED_PRODUCT]), {
      wrapper: createQueryWrapper(),
    });

    expect(result.current[0].fetchStatus).toBe('idle');
    expect(fetchRegionLatestDatesByProductId).not.toHaveBeenCalled();
  });

  it('enables queries for products not in API_LATEST_DATES_DISABLED_PRODUCTS', async () => {
    const mockResponse = { dates: ['2024-01-01'] };
    vi.mocked(fetchRegionLatestDatesByProductId).mockResolvedValue(mockResponse as never);

    const { result } = renderHook(() => useMultipleRegionLatestDates([ENABLED_PRODUCT]), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => {
      expect(result.current[0].isSuccess).toBe(true);
    });

    expect(fetchRegionLatestDatesByProductId).toHaveBeenCalledWith(ENABLED_PRODUCT);
  });

  it('handles a mixed array with both disabled and enabled products', async () => {
    const mockResponse = { dates: ['2024-01-01'] };
    vi.mocked(fetchRegionLatestDatesByProductId).mockResolvedValue(mockResponse as never);

    const { result } = renderHook(() => useMultipleRegionLatestDates([ENABLED_PRODUCT, DISABLED_PRODUCT]), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => {
      expect(result.current[0].isSuccess).toBe(true);
    });

    // Enabled product fetches
    expect(result.current[0].data).toEqual(mockResponse);
    // Disabled product does not fetch
    expect(result.current[1].fetchStatus).toBe('idle');
    expect(fetchRegionLatestDatesByProductId).toHaveBeenCalledTimes(1);
    expect(fetchRegionLatestDatesByProductId).toHaveBeenCalledWith(ENABLED_PRODUCT);
  });

  it('disables all queries when enabled=false regardless of product list', () => {
    const { result } = renderHook(() => useMultipleRegionLatestDates([ENABLED_PRODUCT, DISABLED_PRODUCT], false), {
      wrapper: createQueryWrapper(),
    });

    expect(result.current[0].fetchStatus).toBe('idle');
    expect(result.current[1].fetchStatus).toBe('idle');
    expect(fetchRegionLatestDatesByProductId).not.toHaveBeenCalled();
  });
});
