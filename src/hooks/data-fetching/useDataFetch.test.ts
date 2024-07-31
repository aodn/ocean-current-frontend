import { renderHook, waitFor } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import useDataFetch from './useDataFetch';

vi.mock('axios');

describe('useDataFetch', () => {
  it('should fetch data successfully', async () => {
    const mockData = { id: 1, name: 'Test' };
    const mockFetchFn = vi.fn().mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => useDataFetch(mockFetchFn, ['arg1', 'arg2']));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);

    await waitFor(() => result.current.loading === false);

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
    expect(mockFetchFn).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should handle error', async () => {
    const mockError = new Error('API Error');
    const mockFetchFn = vi.fn().mockRejectedValue(mockError);

    const { result } = renderHook(() => useDataFetch(mockFetchFn, ['arg1', 'arg2']));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);

    await waitFor(() => result.current.loading === false);

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toEqual(new Error('API Error'));
    expect(mockFetchFn).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should update when arguments change', async () => {
    const mockData1 = { id: 1, name: 'Test 1' };
    const mockData2 = { id: 2, name: 'Test 2' };
    const mockFetchFn = vi.fn().mockResolvedValueOnce({ data: mockData1 }).mockResolvedValueOnce({ data: mockData2 });

    const { result, rerender } = renderHook(({ args }) => useDataFetch(mockFetchFn, args), {
      initialProps: { args: ['arg1'] },
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(mockData1);
      expect(result.current.error).toBeNull();
    });

    rerender({ args: ['arg2'] });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(mockData2);
      expect(result.current.error).toBeNull();
    });

    expect(mockFetchFn).toHaveBeenCalledTimes(2);
    expect(mockFetchFn).toHaveBeenNthCalledWith(1, 'arg1');
    expect(mockFetchFn).toHaveBeenNthCalledWith(2, 'arg2');
  });
});
