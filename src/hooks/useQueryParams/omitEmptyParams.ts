// TODO: Merge this into `useQueryParams` so the codebase has one consistent
// convention for stripping query params. `useQueryParams.buildNewSearchParams`
// currently uses `null` as the explicit delete sentinel and keeps `''` as a
// set-with-empty-value, while this helper drops any empty/nullish value. Once
// the call sites (CurrentMetersFilters, DataImageWithCurrentMetersMap) are
// migrated to `useQueryParams`, this file can be deleted.
const omitEmptyParams = (params: Record<string, string | null | undefined>): Record<string, string> =>
  Object.fromEntries(
    Object.entries(params).filter((entry): entry is [string, string] => entry[1] !== '' && entry[1] != null),
  );

export default omitEmptyParams;
