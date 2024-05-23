export type UseQueryParamsResult<T, U extends T> = {
  searchParams: T;
  updateQueryParams: (params: Partial<U>) => void;
  updateQueryParamsAndNavigate: (path: string, params?: Partial<U>) => void;
};
