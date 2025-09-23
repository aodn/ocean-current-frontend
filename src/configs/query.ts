import { QueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

// Shared React Query configuration for consistent caching behavior
export const sharedQueryConfig = {
  staleTime: 6 * 60 * 60 * 1000, // 6 hours
  gcTime: 12 * 60 * 60 * 1000, // 12 hours (previously cacheTime)
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
} as const;

// Default QueryClient configuration for production
export const defaultQueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: (failureCount: number, error: unknown) => {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log('retry', failureCount, error);
        }
        if (isAxiosError(error) && error.response?.status === 404) {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
} as const;

// Test QueryClient configuration for testing environments
export const testQueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 0,
      staleTime: 0,
    },
  },
} as const;

// Create QueryClient instance for production use
export const queryClient = new QueryClient(defaultQueryClientConfig);

// Factory function to create test QueryClient instances
export const createTestQueryClient = () => new QueryClient(testQueryClientConfig);
