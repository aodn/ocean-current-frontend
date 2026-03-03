import { describe, it, expect } from 'vitest';
import dayjs from 'dayjs';
import { DateFormat } from '@/types/date';
import { findClosestDateIndex, findNearestDateWithinWindow } from './date';

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

  describe('findNearestDateWithinWindow', () => {
    describe('DAY format', () => {
      it('returns exact match when target exists in list', () => {
        const dates = ['20240515', '20240519', '20240525'];
        const target = dayjs('20240519', DateFormat.DAY);
        expect(findNearestDateWithinWindow(dates, target, 20, DateFormat.DAY)).toBe('20240519');
      });

      it('prefers nearest past date over equidistant future date', () => {
        // 10 days before and 10 days after — past should win
        const dates = ['20240509', '20240529'];
        const target = dayjs('20240519', DateFormat.DAY);
        expect(findNearestDateWithinWindow(dates, target, 20, DateFormat.DAY)).toBe('20240509');
      });

      it('returns most recent past date from multiple past candidates', () => {
        const dates = ['20240510', '20240515', '20240517'];
        const target = dayjs('20240519', DateFormat.DAY);
        expect(findNearestDateWithinWindow(dates, target, 20, DateFormat.DAY)).toBe('20240517');
      });

      it('returns null when no data within window', () => {
        const dates = ['20240410', '20240620'];
        const target = dayjs('20240519', DateFormat.DAY);
        expect(findNearestDateWithinWindow(dates, target, 20, DateFormat.DAY)).toBeNull();
      });

      it('returns null for empty dates array', () => {
        const target = dayjs('20240519', DateFormat.DAY);
        expect(findNearestDateWithinWindow([], target, 20, DateFormat.DAY)).toBeNull();
      });

      it('returns nearest future date when no past data in window', () => {
        const dates = ['20240529'];
        const target = dayjs('20240519', DateFormat.DAY);
        expect(findNearestDateWithinWindow(dates, target, 20, DateFormat.DAY)).toBe('20240529');
      });

      it('includes dates exactly at the window boundary', () => {
        // Exactly 20 days before
        const dates = ['20240429'];
        const target = dayjs('20240519', DateFormat.DAY);
        expect(findNearestDateWithinWindow(dates, target, 20, DateFormat.DAY)).toBe('20240429');
      });

      it('excludes dates just outside the window boundary', () => {
        // 21 days before — outside ±20 day window
        const dates = ['20240428'];
        const target = dayjs('20240519', DateFormat.DAY);
        expect(findNearestDateWithinWindow(dates, target, 20, DateFormat.DAY)).toBeNull();
      });
    });

    describe('MONTH format', () => {
      it('returns nearest past month within ±1 month window', () => {
        const dates = ['202403', '202404', '202406'];
        const target = dayjs('202405', DateFormat.MONTH);
        // 202404 is 1 month before (in window), 202406 is 1 month after (in window)
        // past preferred
        expect(findNearestDateWithinWindow(dates, target, 1, DateFormat.MONTH)).toBe('202404');
      });

      it('returns null when no months within ±1 month window', () => {
        const dates = ['202401', '202408'];
        const target = dayjs('202405', DateFormat.MONTH);
        expect(findNearestDateWithinWindow(dates, target, 1, DateFormat.MONTH)).toBeNull();
      });

      it('returns future month when no past within window', () => {
        const dates = ['202406'];
        const target = dayjs('202405', DateFormat.MONTH);
        expect(findNearestDateWithinWindow(dates, target, 1, DateFormat.MONTH)).toBe('202406');
      });

      it('handles DAY-format target when selecting MONTH product within window', () => {
        const dates = ['202404', '202405', '202406'];
        // Simulate DAY-format URL param (e.g. "20240519") transitioning into a MONTH product
        const target = dayjs('20240519', DateFormat.DAY);
        // Target is in May 2024; expect the May 2024 monthly product within a ±1 month window
        expect(findNearestDateWithinWindow(dates, target, 1, DateFormat.MONTH)).toBe('202405');
      });
    });

    describe('HOUR format — wall-clock-hour preference', () => {
      it('returns hourly entry closest to nowHour on target day (prefer earlier on tie)', () => {
        const dates = ['2024051900', '2024051904', '2024051908'];
        const target = dayjs('20240519', DateFormat.DAY); // DAY-format target (product transition)
        // nowHour = 5 → closest to hour 4 (diff 1) vs hour 8 (diff 3) vs hour 0 (diff 5)
        expect(findNearestDateWithinWindow(dates, target, 20, DateFormat.HOUR, 5)).toBe('2024051904');
      });

      it('prefers earlier time on tie for wall-clock preference', () => {
        // nowHour = 6, candidates at 4 (diff 2) and 8 (diff 2) — prefer 4 (earlier)
        const dates = ['2024051904', '2024051908'];
        const target = dayjs('20240519', DateFormat.DAY);
        expect(findNearestDateWithinWindow(dates, target, 20, DateFormat.HOUR, 6)).toBe('2024051904');
      });

      it('returns nearest past day when no data on target day', () => {
        const dates = ['2024051800', '2024051804'];
        const target = dayjs('20240519', DateFormat.DAY);
        // No data on May 19 — falls back to most recent past (May 18 04:00)
        expect(findNearestDateWithinWindow(dates, target, 20, DateFormat.HOUR, 12)).toBe('2024051804');
      });

      it('returns future hourly entry when only future data within window', () => {
        const dates = ['2024052002'];
        const target = dayjs('20240519', DateFormat.DAY);
        expect(findNearestDateWithinWindow(dates, target, 20, DateFormat.HOUR, 12)).toBe('2024052002');
      });

      it('returns null when no hourly data within window', () => {
        const dates = ['2024040100', '2024062000'];
        const target = dayjs('20240519', DateFormat.DAY);
        expect(findNearestDateWithinWindow(dates, target, 20, DateFormat.HOUR, 12)).toBeNull();
      });
    });
  });
});
