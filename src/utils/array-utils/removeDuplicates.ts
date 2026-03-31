import { removeDuplicatesByKey } from './removeDuplicatesByKey';

export function removeDuplicates<T>(arr: T[]): T[] {
  return removeDuplicatesByKey(arr, (item) => JSON.stringify(item));
}
