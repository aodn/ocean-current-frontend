import { isNotNullOrUndefined } from './general';

describe('isNotNullOrUndefined', () => {
  it('should return true if the value is not null or undefined', () => {
    // Act and Assert
    expect(isNotNullOrUndefined(1)).toBe(true);
    expect(isNotNullOrUndefined('')).toBe(true);
    expect(isNotNullOrUndefined(0)).toBe(true);
    expect(isNotNullOrUndefined([])).toBe(true);
    expect(isNotNullOrUndefined({})).toBe(true);
    expect(isNotNullOrUndefined(false)).toBe(true);
  });

  it('should return false if the value is null or undefined', () => {
    // Act and Assert
    expect(isNotNullOrUndefined(null)).toBe(false);
    expect(isNotNullOrUndefined(undefined)).toBe(false);
  });
});
