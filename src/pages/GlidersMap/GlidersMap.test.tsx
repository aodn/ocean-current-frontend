import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createMemoryRouter, RouterProvider } from 'react-router';
import * as source from '@/services/gliders';
import type { GliderYearmap } from '@/types/gliders';
import fixture from './fixtures/yearmaps.json';
import GlidersMap from './GlidersMap';

const maps = fixture.maps as GliderYearmap[];

vi.mock('@/components/Map/BasicMap', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="interactive-map">{children}</div>,
}));
vi.mock('@/components/Map/layers/GlidersDeploymentLayer', () => ({
  default: ({ data }: { data: { features: { id: string }[] } }) => (
    <div data-testid="deployment-layer" data-ids={data.features.map(({ id }) => id).join(',')} />
  ),
}));

function setup() {
  const router = createMemoryRouter([{ path: '/map/gliders', element: <GlidersMap /> }], {
    initialEntries: ['/map/gliders'],
  });
  render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  vi.spyOn(source, 'fetchGliderYearmaps').mockResolvedValue(maps);
});
afterEach(() => vi.restoreAllMocks());

it('shows the latest NRT yearmap by default', async () => {
  setup();
  const layer = await screen.findByTestId('deployment-layer');
  expect(layer.dataset.ids?.split(',')).toHaveLength(12);
  expect(layer.dataset.ids).toContain('TwoRocks20261028_nrt');
});

it('shows an empty state when no yearmap has bounds', async () => {
  vi.mocked(source.fetchGliderYearmaps).mockResolvedValueOnce([
    { ...maps[0], deployments: maps[0].deployments.map((deployment) => ({ ...deployment, bbox: null })) },
  ]);
  setup();
  await screen.findByText('No deployment areas are available for this map.');
  expect(screen.queryByTestId('interactive-map')).not.toBeInTheDocument();
});

it('supports retry after the request fails', async () => {
  vi.mocked(source.fetchGliderYearmaps).mockRejectedValueOnce(new Error('offline'));
  setup();
  await userEvent.click(await screen.findByRole('button', { name: 'Try again' }));
  await screen.findByTestId('interactive-map');
});
