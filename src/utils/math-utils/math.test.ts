import { stringToHash } from './math';

describe('stringToHash', () => {
  test('should return a number', () => {
    // Arrange
    const input = 'test';

    // Act
    const result = stringToHash(input);

    // Assert
    expect(typeof result).toBe('number');
  });

  test('should return the same hash for the same input', () => {
    // Arrange
    const input = 'hello world';

    // Act
    const hash1 = stringToHash(input);
    const hash2 = stringToHash(input);

    // Assert
    expect(hash1).toBe(hash2);
  });

  test('should return different hashes for different inputs', () => {
    // Arrange
    const input1 = 'hello';
    const input2 = 'world';

    // Act
    const hash1 = stringToHash(input1);
    const hash2 = stringToHash(input2);

    // Assert
    expect(hash1).not.toBe(hash2);
  });

  test('should handle empty strings', () => {
    // Arrange
    const input = '';

    // Act
    const result = stringToHash(input);

    // Assert
    expect(typeof result).toBe('number');
    expect(result).toBe(0);
  });

  test('should handle long strings', () => {
    // Arrange
    const longString = 'a'.repeat(1000);

    // Act
    const result = stringToHash(longString);

    // Assert
    expect(typeof result).toBe('number');
  });

  test('should always return a positive number', () => {
    // Arrange
    const inputs = ['test', 'hello', 'world', 'long string with spaces'];

    // Act & Assert
    inputs.forEach((input) => {
      const result = stringToHash(input);
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });
});
