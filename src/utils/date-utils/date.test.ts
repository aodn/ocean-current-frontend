import { describe, it, expect } from 'vitest';
import { findClosestDateIndex } from './date';

describe('date utils', () => {
  describe('findClosestDateIndex', () => {
    const testDates = ['2024031800', '2024031806', '2024031812', '2024031900', '2024031912'];

    // Tests for finding next date
    describe('when searching for next date', () => {
      it('should find the next date when target is between two dates', () => {
        // Target is between 2024031800 and 2024031806
        const result = findClosestDateIndex(testDates, '2024031803', 'next');
        expect(result).toBe(1); // Should return index 1 (2024031806)
      });

      it('should find the next date when target is equal to an existing date', () => {
        const result = findClosestDateIndex(testDates, '2024031806', 'next');
        expect(result).toBe(2); // Should return index 2 (2024031812)
      });

      it('should find the first date when target is before all dates', () => {
        const result = findClosestDateIndex(testDates, '2024031700', 'next');
        expect(result).toBe(0); // Should return index 0 (2024031800)
      });

      it('should return -1 when target is after all dates', () => {
        const result = findClosestDateIndex(testDates, '2024032000', 'next');
        expect(result).toBe(-1); // No next date available
      });

      it('should handle empty array', () => {
        const result = findClosestDateIndex([], '2024031803', 'next');
        expect(result).toBe(-1);
      });
    });

    // Tests for finding previous date
    describe('when searching for previous date', () => {
      it('should find the previous date when target is between two dates', () => {
        // Target is between 2024031806 and 2024031812
        const result = findClosestDateIndex(testDates, '2024031810', 'previous');
        expect(result).toBe(1); // Should return index 1 (2024031806)
      });

      it('should find the previous date when target is equal to an existing date', () => {
        const result = findClosestDateIndex(testDates, '2024031806', 'previous');
        expect(result).toBe(0); // Should return index 0 (2024031800)
      });

      it('should find the last date when target is after all dates', () => {
        const result = findClosestDateIndex(testDates, '2024032000', 'previous');
        expect(result).toBe(4); // Should return index 4 (2024031912)
      });

      it('should return -1 when target is before all dates', () => {
        const result = findClosestDateIndex(testDates, '2024031700', 'previous');
        expect(result).toBe(-1); // No previous date available
      });

      it('should handle empty array', () => {
        const result = findClosestDateIndex([], '2024031803', 'previous');
        expect(result).toBe(-1);
      });
    });

    // Edge cases
    describe('edge cases', () => {
      it('should handle array with single element', () => {
        const singleDate = ['2024031800'];

        // Next with target before the only date
        expect(findClosestDateIndex(singleDate, '2024031700', 'next')).toBe(0);

        // Previous with target after the only date
        expect(findClosestDateIndex(singleDate, '2024031900', 'previous')).toBe(0);

        // Next with target after the only date
        expect(findClosestDateIndex(singleDate, '2024031900', 'next')).toBe(-1);

        // Previous with target before the only date
        expect(findClosestDateIndex(singleDate, '2024031700', 'previous')).toBe(-1);
      });

      it('should handle unsorted array by treating it as sorted', () => {
        // Note: The function expects the array to be sorted
        const unsortedDates = ['2024031812', '2024031800', '2024031900'];

        // This test demonstrates that the function assumes the array is sorted
        const result = findClosestDateIndex(unsortedDates, '2024031806', 'next');
        expect(result).toBe(2); // Finds index 2 since binary search assumes sorted data
      });
    });
  });
});
