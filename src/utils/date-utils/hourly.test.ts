import { describe, it, expect } from 'vitest';
import { DateFormat } from '@/types/date';
import { isHourlyFormat, findFirstHourlyDateForDay } from './hourly';

describe('hourly utils', () => {
  describe('isHourlyFormat', () => {
    it('should return true for HOUR format', () => {
      expect(isHourlyFormat(DateFormat.HOUR)).toBe(true);
    });

    it('should return false for non-hourly formats', () => {
      expect(isHourlyFormat(DateFormat.DAY)).toBe(false);
      expect(isHourlyFormat(DateFormat.MONTH)).toBe(false);
      expect(isHourlyFormat(DateFormat.YEAR_ONLY)).toBe(false);
    });
  });

  describe('findFirstHourlyDateForDay', () => {
    const mockDates = ['2024031800', '2024031806', '2024031812', '2024031900', '2024031912'];

    it('should find the first hourly entry for a given day', () => {
      const result = findFirstHourlyDateForDay(mockDates, '20240318', DateFormat.HOUR);
      expect(result).toBe('2024031800');
    });

    it('should return undefined if no entries found for the day', () => {
      const result = findFirstHourlyDateForDay(mockDates, '20240320', DateFormat.HOUR);
      expect(result).toBeUndefined();
    });

    it('should handle empty dates array', () => {
      const result = findFirstHourlyDateForDay([], '20240318', DateFormat.HOUR);
      expect(result).toBeUndefined();
    });

    it('should handle dates in different formats', () => {
      const datesInDifferentFormat = ['2024-03-18 00:00', '2024-03-18 06:00', '2024-03-18 12:00'];
      const result = findFirstHourlyDateForDay(datesInDifferentFormat, '20240318', DateFormat.HOUR);
      expect(result).toBe('2024-03-18 00:00');
    });
  });
});
