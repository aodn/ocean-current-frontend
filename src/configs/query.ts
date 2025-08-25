// Shared React Query configuration for consistent caching behavior
export const sharedQueryConfig = {
  staleTime: 6 * 60 * 60 * 1000, // 6 hours
  gcTime: 12 * 60 * 60 * 1000, // 12 hours (previously cacheTime)
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
} as const;
