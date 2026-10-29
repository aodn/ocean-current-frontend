import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createMemoryRouter, RouterProvider } from 'react-router';
import * as source from '@/services/gliders';
import missionFixture from './fixtures/missions-2026-nrt.json';
import GlidersMap from './GlidersMap';

vi.mock('@/components/Map/BasicMap', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="interactive-map">{children}</div>,
}));
vi.mock('@/components/Map/layers/GlidersDeploymentLayer', () => ({
  default: ({ data }: { data: { features: unknown[] } }) => (
    <div data-testid="deployment-layer" data-count={data.features.length} />
  ),
}));

function setup(search = '') {
  const router = createMemoryRouter([{ path: '/map/gliders', element: <GlidersMap /> }], {
    initialEntries: [`/map/gliders${search}`],
  });
  render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
  return router;
}

beforeEach(() => {
  vi.spyOn(source, 'fetchGliderMissions').mockResolvedValue(missionFixture.missions);
});
afterEach(() => vi.restoreAllMocks());

it('renders the MVP rectangles using only API mission positions', async () => {
  setup();
  expect(await screen.findByTestId('deployment-layer')).toHaveAttribute('data-count', '12');
  expect(document.querySelector('img')).toBeNull();
  expect(screen.queryByRole('complementary', { name: 'Gliders options' })).not.toBeInTheDocument();
  expect(screen.queryByRole('region', { name: 'Deployment calendar chart' })).not.toBeInTheDocument();
  expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  expect(source.fetchGliderMissions).toHaveBeenCalledWith(
    expect.objectContaining({ year: '2026', platform: 'sl', mode: 'nrt' }),
    expect.any(AbortSignal),
  );
});

it('reports missing mission positions without an image fallback', async () => {
  vi.mocked(source.fetchGliderMissions).mockResolvedValueOnce([]);
  setup();
  await screen.findByText('No mission positions are available for this MVP map.');
  expect(screen.queryByTestId('interactive-map')).not.toBeInTheDocument();
  expect(document.querySelector('img')).toBeNull();
});

it('supports retry after the API request fails', async () => {
  vi.mocked(source.fetchGliderMissions).mockRejectedValueOnce(new Error('offline'));
  setup();
  await userEvent.click(await screen.findByRole('button', { name: 'Try again' }));
  await screen.findByTestId('interactive-map');
});
