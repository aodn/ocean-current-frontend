import { renderHook } from '@testing-library/react';
import useProductStore from '../productStore';
import useProductPath from './useProductPath';

vi.mock('../productStore', () => ({
  default: vi.fn(),
}));

describe('useProductPath', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return an empty string if product is not found', () => {
    vi.mocked(useProductStore).mockReturnValue(() => 'nonExistentProduct');

    const { result } = renderHook(() => useProductPath());

    expect(result.current).toBe('');
  });

  it('should return the correct path for a product without a parent', () => {
    vi.mocked(useProductStore).mockReturnValue('surfaceWaves');

    const { result } = renderHook(() => useProductPath());

    expect(result.current).toBe('surface-waves');
  });

  it('should return the correct path for a product with a parent', () => {
    vi.mocked(useProductStore).mockReturnValue('sixDaySst-sst');

    const { result } = renderHook(() => useProductPath());

    expect(result.current).toBe('6-day-sst/sst');
  });
});
