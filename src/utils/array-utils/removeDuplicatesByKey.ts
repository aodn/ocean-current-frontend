/**
 * Removes duplicate objects from an array based on a derived key.
 *
 * Creates a `Map` using the value returned by `keyFn(item)` as the unique key
 * for each element. When duplicate keys occur, the **last** item with that key
 * is kept (previous ones are overwritten).
 *
 * @template T - The type of items in the array.
 * @template K - The type of the key returned by `keyFn`.
 * @param {T[]} arr - The input array containing potential duplicates.
 * @param {(item: T) => K} keyFn - A function that extracts or computes a unique key from each item.
 * @returns {T[]} A new array containing only the last occurrence of each unique key.
 *
 * @example
 * // Remove duplicates by a simple property
 * const users = [
 *   { id: 1, name: "Alice" },
 *   { id: 2, name: "Bob" },
 *   { id: 1, name: "Charlie" }
 * ];
 * const unique = removeDuplicatesByKey(users, u => u.id);
 * // => [ { id: 2, name: "Bob" }, { id: 1, name: "Charlie" } ]
 *
 * @example
 * // Remove duplicates by a derived key (case-insensitive email)
 * const users = [
 *   { email: "John@Example.com" },
 *   { email: "john@example.com" }
 * ];
 * const unique = removeDuplicatesByKey(users, u => u.email.toLowerCase());
 * // => [ { email: "john@example.com" } ]
 */
export function removeDuplicatesByKey<T, K>(arr: T[], keyFn: (item: T) => K): T[] {
  return [...new Map(arr.map((item) => [keyFn(item), item])).values()];
}
