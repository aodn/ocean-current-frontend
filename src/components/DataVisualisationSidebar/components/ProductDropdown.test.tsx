import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createMemoryRouter, RouterProvider } from 'react-router';
import ProductDropdown from './ProductDropdown';

it('navigates to Gliders without carrying date or region parameters or fetching latest dates', async () => {
  const user = userEvent.setup();
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const fetchQuery = vi.spyOn(queryClient, 'fetchQuery');
  const router = createMemoryRouter(
    [
      { path: '/map/four-hour-sst/sst', element: <ProductDropdown mainProductKey="fourHourSst" /> },
      { path: '/map/gliders', element: <p>Gliders map</p> },
    ],
    { initialEntries: ['/map/four-hour-sst/sst?date=20261028&region=SE&property=temperature&depth=0'] },
  );

  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );

  await user.click(screen.getByTestId('product-dropdown-toggle'));
  await user.click(screen.getByRole('menuitem', { name: 'Gliders' }));

  expect(await screen.findByText('Gliders map')).toBeInTheDocument();
  expect(router.state.location.pathname).toBe('/map/gliders');
  expect(router.state.location.search).toBe('');
  expect(fetchQuery).not.toHaveBeenCalled();
});
