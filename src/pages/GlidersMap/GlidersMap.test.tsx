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

it('switches types locally and selects an available type when changing years', async () => {
  const seaglider = maps.find(({ platform }) => platform === 'sg')!;
  vi.mocked(source.fetchGliderYearmaps).mockResolvedValueOnce([
    ...maps,
    { ...seaglider, id: '2026_sg_temp_04d', year: 2026 },
    { ...seaglider, id: '2030_sg_temp_04d', year: 2030, deployments: [] },
    {
      ...seaglider,
      id: '2008_sg_temp_04d',
      year: 2008,
      deployments: seaglider.deployments.map((deployment) => ({ ...deployment, bbox: null })),
    },
  ]);
  setup();
  const year = await screen.findByRole('combobox', { name: 'Year' });
  const type = screen.getByRole('button', { name: 'Glider type' });
  expect(year).toHaveValue('2026');
  expect(type).toHaveTextContent('Slocum');
  expect([...year.querySelectorAll('option')].map((option) => option.value)).toEqual(['2026', '2011', '2008']);
  await userEvent.click(type);
  await userEvent.click(screen.getByRole('menuitemradio', { name: 'Seaglider' }));
  expect(screen.getByTestId('deployment-layer')).toHaveAttribute('data-ids', 'Bicheno20100813');
  await userEvent.selectOptions(year, '2011');
  expect(screen.getByRole('button', { name: 'Glider type' })).toHaveTextContent('Seaglider');
  await userEvent.selectOptions(year, '2008');
  expect(screen.getByRole('button', { name: 'Glider type' })).toHaveTextContent('Slocum');
  expect(screen.getByRole('button', { name: 'Glider type' })).toBeDisabled();
  expect(screen.getByTestId('deployment-layer')).toHaveAttribute(
    'data-ids',
    'PortStephens20081125,SpencerGulf20080716,TwoRocks20080621',
  );
  expect(source.fetchGliderYearmaps).toHaveBeenCalledTimes(1);
});

it('navigates available years with arrows and resets to the current or latest available year', async () => {
  setup();
  const year = await screen.findByRole('combobox', { name: 'Year' });
  const previous = screen.getByRole('button', { name: 'Previous year' });
  const next = screen.getByRole('button', { name: 'Next year' });
  expect(next).toBeDisabled();
  await userEvent.click(previous);
  expect(year).toHaveValue('2011');
  expect(screen.getByRole('button', { name: 'Glider type' })).toHaveTextContent('Seaglider');
  await userEvent.click(previous);
  expect(year).toHaveValue('2008');
  expect(previous).toBeDisabled();
  await userEvent.click(next);
  expect(year).toHaveValue('2011');
  await userEvent.click(screen.getByRole('button', { name: 'Reset to current year' }));
  expect(year).toHaveValue('2026');
  expect(next).toBeDisabled();
  expect(source.fetchGliderYearmaps).toHaveBeenCalledTimes(1);
});
