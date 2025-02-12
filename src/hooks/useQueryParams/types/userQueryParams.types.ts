export type UseQueryParamsResult = {
  searchParams: QueryParams;
  updateQueryParams: (params: Partial<QueryParams>) => void;
  updateQueryParamsAndNavigate: (path: string, params?: Partial<QueryParams>) => void;
};

export type QueryParams = {
  date?: string | null;
  region?: string | null;
  property?: string | null; // Current Meters
  deploymentPlot?: string | null; // Current Meters
  depth?: string | null; // Current Meters, Argo
  wmoid?: string | null; // Argo
  cycle?: string | null; // Argo
};
