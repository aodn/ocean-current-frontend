export type UseQueryParamsResult = {
  searchParams: QueryParams;
  getQueryParamsByKey: (key: keyof QueryParams) => QueryParams[keyof QueryParams];
  updateQueryParams: (params: Partial<QueryParams>) => void;
  updateQueryParamsAndNavigate: (path: string, params?: Partial<QueryParams>, replace?: boolean) => void;
  isSameUrlWithParams: (path: string, params?: Partial<QueryParams>, replace?: boolean) => boolean;
};

export type QueryParams = {
  date?: string | null;
  region?: string | null;
  property?: string | null; // Current Meters
  deploymentPlot?: string | null; // Current Meters
  depth?: string | null; // Current Meters, Argo
  wmoid?: string | null; // Argo
  cycle?: string | null; // Argo
  point?: string | null; // Tidal Currents
};
