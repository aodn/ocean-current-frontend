import { renderHook } from '@testing-library/react';
import * as compareUtils from '@/utils/compare-utils/compare';
import useArrayCompareEffect from './useArrayCompareEffect';

describe('useArrayCompareEffect with mocked isArrayEqual', () => {
  beforeEach(() => {
    vi.mock('@/utils/compare-utils/compare', async () => ({
      ...(await vi.importActual('@/utils/compare-utils/compare')),
      isArrayEqual: vi.fn(),
    }));
    vi.clearAllMocks();
  });

  it('should call callback when isArrayEqual returns false', () => {
    // Arrange
    const callback = vi.fn();
    vi.mocked(compareUtils.isArrayEqual).mockReturnValue(false);
    const { rerender } = renderHook(({ arr }) => useArrayCompareEffect(callback, arr), {
      initialProps: { arr: ['apple', 'banana', 'cherry'] },
    });

    // Act
    rerender({ arr: ['apple', 'banana', 'date'] });

    // Assert
    expect(callback).toHaveBeenCalledTimes(2);
    expect(compareUtils.isArrayEqual).toHaveBeenCalledTimes(2);
  });

  it('should not call callback when isArrayEqual returns true', () => {
    // Arrange
    const callback = vi.fn();
    vi.mocked(compareUtils.isArrayEqual).mockReturnValue(true);
    const { rerender } = renderHook(({ arr }) => useArrayCompareEffect(callback, arr), {
      initialProps: { arr: ['apple', 'banana', 'cherry'] },
    });

    // Act
    rerender({ arr: ['apple', 'banana', 'cherry'] });

    // Assert
    expect(callback).not.toHaveBeenCalled();
    expect(compareUtils.isArrayEqual).toHaveBeenCalledTimes(2);
  });

  it('should pass correct parameters to isArrayEqual', () => {
    // Arrange
    const callback = vi.fn();
    const { rerender } = renderHook(({ arr, orderMatters }) => useArrayCompareEffect(callback, arr, orderMatters), {
      initialProps: { arr: ['apple', 'banana', 'cherry'], orderMatters: true },
    });

    // Act
    rerender({ arr: ['cherry', 'banana', 'apple'], orderMatters: false });

    // Assert
    expect(compareUtils.isArrayEqual).toHaveBeenLastCalledWith(
      ['apple', 'banana', 'cherry'],
      ['cherry', 'banana', 'apple'],
      false,
    );
  });
});

describe('useArrayCompareEffect with real isArrayEqual', () => {
  beforeEach(() => {
    vi.doUnmock('@/utils/compare-utils/compare');
    vi.resetModules();
  });

  it('should call callback when array changes (order matters)', async () => {
    // Arrange
    const useArrayCompareEffectReal = (await import('./useArrayCompareEffect')).default;
    const callback = vi.fn();
    const { rerender } = renderHook(({ arr }) => useArrayCompareEffectReal(callback, arr), {
      initialProps: { arr: ['apple', 'banana', 'cherry'] },
    });

    // Act
    rerender({ arr: ['apple', 'banana', 'date'] });

    // Assert
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it("should not call callback when array order changes (order doesn't matter)", async () => {
    // Arrange
    const useArrayCompareEffectReal = (await import('./useArrayCompareEffect')).default;
    const callback = vi.fn();
    const { rerender } = renderHook(({ arr }) => useArrayCompareEffectReal(callback, arr, false), {
      initialProps: { arr: ['apple', 'banana', 'cherry'] },
    });

    // Act
    rerender({ arr: ['cherry', 'banana', 'apple'] });

    // Assert
    expect(callback).toHaveBeenCalledTimes(1); // Only called on initial render
  });

  it("should call callback when array content changes (order doesn't matter)", async () => {
    // Arrange
    const useArrayCompareEffectReal = (await import('./useArrayCompareEffect')).default;
    const callback = vi.fn();
    const { rerender } = renderHook(({ arr }) => useArrayCompareEffectReal(callback, arr, false), {
      initialProps: { arr: ['apple', 'banana', 'cherry'] },
    });

    // Act
    rerender({ arr: ['apple', 'banana', 'date'] });

    // Assert
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
