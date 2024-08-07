import { isArrayEqual } from './compare';

describe('isArrayEqual', () => {
  it('should return true for identical arrays (order matters)', () => {
    expect(isArrayEqual([1, 2, 3], [1, 2, 3])).toBe(true);
  });

  it('should return false for arrays with different order (order matters)', () => {
    expect(isArrayEqual([1, 2, 3], [3, 2, 1])).toBe(false);
  });

  it("should return true for arrays with different order (order doesn't matter)", () => {
    expect(isArrayEqual([1, 2, 3], [3, 2, 1], false)).toBe(true);
  });

  it('should return false for arrays with different elements', () => {
    expect(isArrayEqual([1, 2, 3], [1, 2, 4])).toBe(false);
  });

  it('should handle empty arrays', () => {
    expect(isArrayEqual([], [])).toBe(true);
  });

  it('should handle undefined first array', () => {
    expect(isArrayEqual(undefined, [1, 2, 3])).toBe(false);
  });

  it('should handle arrays with different types', () => {
    expect(isArrayEqual([1, 'two', true], [1, 'two', true])).toBe(true);
    expect(isArrayEqual([1, 'two', true], [1, 'two', false])).toBe(false);
  });
});
