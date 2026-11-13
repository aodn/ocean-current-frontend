import { useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { initialMobileMapViewState } from '@/configs/map';
import useMapStore, { patchMapViewState } from '@/stores/map-store/mapStore';
import * as source from '@/services/gliders';
import type { GliderYearmap } from '@/types/gliders';
import fixture from './fixtures/yearmaps.json';
import GlidersMap from './GlidersMap';

const maps = fixture.maps as GliderYearmap[];
const mobile = vi.hoisted(() => ({ value: false }));

vi.mock('@/components/Map/BasicMap', () => ({
  default: function MockBasicMap({ children }: { children: React.ReactNode }) {
    useEffect(() => {
      if (mobile.value) patchMapViewState(initialMobileMapViewState.mapViewState);
    }, []);
    return <div data-testid="interactive-map">{children}</div>;
  },
}));
vi.mock('@/components/Map/layers/GlidersDeploymentLayer', () => ({
  default: ({ data }: { data: { features: { id: string }[] } }) => (
    <div data-testid="deployment-layer" data-ids={data.features.map(({ id }) => id).join(',')} />
  ),
}));

function setup(cached = false) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  if (cached) client.setQueryData(['gliders', 'yearmaps'], maps);
  const router = createMemoryRouter([{ path: '/map/gliders', element: <GlidersMap /> }], {
    initialEntries: ['/map/gliders'],
  });
  render(
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  vi.spyOn(source, 'fetchGliderYearmaps').mockResolvedValue(maps);
});
afterEach(() => {
  mobile.value = false;
  vi.restoreAllMocks();
});

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

it('preserves mobile initialization on a cached revisit', async () => {
  mobile.value = true;
  setup(true);
  await screen.findByTestId('deployment-layer');
  expect(useMapStore.getState().mapViewState).toEqual(initialMobileMapViewState.mapViewState);
});

it('exposes mission names and geographic bounds outside the canvas', async () => {
  setup();
  const list = await screen.findByRole('list', { name: 'Deployment bounds' });
  expect(list).toHaveTextContent('TwoRocks20261028_nrt');
  expect(list).toHaveTextContent(/west .*south .*east .*north/);
});

it('opens delayed deployments explicitly without mixing them with NRT', async () => {
  setup();
  const mode = await screen.findByRole('combobox', { name: 'Data mode' });
  expect(mode).toHaveValue('nrt');
  await userEvent.selectOptions(mode, 'delayed');
  const layer = screen.getByTestId('deployment-layer');
  expect(layer.dataset.ids).toContain('BassStrait20260316');
  expect(layer.dataset.ids).not.toContain('TwoRocks20261028_nrt');
  await userEvent.selectOptions(mode, 'nrt');
  expect(layer.dataset.ids).toContain('TwoRocks20261028_nrt');
});

it('keeps the mode selector available when a mode has no deployments', async () => {
  vi.mocked(source.fetchGliderYearmaps).mockResolvedValue([maps[0]]);
  setup();
  const mode = await screen.findByRole('combobox', { name: 'Data mode' });
  expect(screen.queryByTestId('interactive-map')).not.toBeInTheDocument();
  await userEvent.selectOptions(mode, 'delayed');
  await screen.findByTestId('interactive-map');
});
