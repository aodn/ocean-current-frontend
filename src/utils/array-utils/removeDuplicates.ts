import { removeDuplicatesByKey } from './removeDuplicatesByKey';

const UNDEFINED_SENTINEL = '__undefined__';

const stableStringify = (value: unknown): string =>
  JSON.stringify(value, (_, v) => {
    if (v === undefined) return UNDEFINED_SENTINEL;
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      return Object.fromEntries(
        Object.entries(v as Record<string, unknown>)
          .map(([k, val]): [string, unknown] => [k, val === undefined ? UNDEFINED_SENTINEL : val])
          .sort(([a], [b]) => a.localeCompare(b)),
      );
    }
    return v;
  });

export function removeDuplicates<T>(arr: T[]): T[] {
  return removeDuplicatesByKey(arr, stableStringify);
}
