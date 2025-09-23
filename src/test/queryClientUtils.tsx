import React from 'react';
import { render } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createTestQueryClient } from '@/configs/query';

/**
 * Creates a test wrapper component with QueryClientProvider
 * @returns React component that wraps children with QueryClientProvider
 */
export const createQueryWrapper = () => {
  const queryClient = createTestQueryClient();

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return Wrapper;
};

/**
 * Renders a component with QueryClientProvider for testing
 * @param ui - React element to render
 * @returns Render result from @testing-library/react
 */
export const renderWithQueryClient = (ui: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  return render(<QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>);
};

/**
 * Re-export createTestQueryClient for direct use if needed
 */
export { createTestQueryClient } from '@/configs/query';
