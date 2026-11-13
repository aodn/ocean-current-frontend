import { useEffect } from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
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
  default: ({
    data,
    onSelect,
    selectedId,
  }: {
    data: { features: { id: string }[] };
    onSelect: (id: string) => void;
    selectedId?: string;
  }) => (
    <div
      data-testid="deployment-layer"
      data-ids={data.features.map(({ id }) => id).join(',')}
      data-selected={selectedId ?? ''}
    >
      {data.features.map(({ id }) => (
        <button key={id} onClick={() => onSelect(id)}>
          {id}
        </button>
      ))}
    </div>
  ),
}));

function setup(props: { isMiniMap?: boolean; missionName?: string; window?: string } = {}, cached = false) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  if (cached) client.setQueryData(['gliders', 'yearmaps'], maps);
  const router = createMemoryRouter(
    [
      { path: '/map/gliders', element: <GlidersMap {...props} /> },
      { path: '/product/gliders', element: <p>Mission page</p> },
    ],
    {
      initialEntries: ['/map/gliders'],
    },
  );
  render(
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
  return router;
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
  expect(layer).toHaveAttribute('data-selected', '');
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
    { ...seaglider, id: '2026_sg_temp_04d', year: 2026, is_nrt: true },
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
  await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Data mode' }), 'delayed');
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
  await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Data mode' }), 'delayed');
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

const mission = {
  id: 'TwoRocks20261028_nrt@5.',
  mission_name: 'TwoRocks20261028_nrt',
  visualisations: { latest_images: { '4d': '/gliders/TwoRocks20261028_nrt_4d/2026110412.gif', '12d': '/wrong.gif' } },
};

it.each(['04d', '12d', '30d'])(
  'navigates directly to the mission image for %s without showing a preview',
  async (window) => {
    const yearmap = maps.find(({ id }) => id === '2026_sl_temp_04d_nrt')!;
    vi.mocked(source.fetchGliderYearmaps).mockResolvedValue([{ ...yearmap, window }]);
    vi.spyOn(source, 'fetchGliderMission').mockResolvedValue(mission);
    const router = setup();
    await userEvent.click(await screen.findByRole('button', { name: mission.mission_name }));
    await screen.findByText('Mission page');
    expect(router.state.location.search).toBe(
      `?missionId=TwoRocks20261028_nrt%405.&window=${window.replace(/^0+/, '')}`,
    );
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  },
);

it('keeps the map usable if mission resolution fails', async () => {
  vi.spyOn(source, 'fetchGliderMission').mockRejectedValue(new Error('offline'));
  setup();
  await userEvent.click(await screen.findByRole('button', { name: mission.mission_name }));
  await screen.findByRole('alert');
  expect(screen.getByTestId('interactive-map')).toBeInTheDocument();
});

it('shows only the map in sidebar mode and selects the displayed mission yearmap', async () => {
  vi.spyOn(source, 'fetchGliderMission').mockResolvedValue({ ...mission, id: 'Bicheno20100813@5.' });
  const router = setup({ isMiniMap: true, missionName: 'Bicheno20100813' });
  const layer = await screen.findByTestId('deployment-layer');
  expect(layer).toHaveAttribute('data-ids', 'Bicheno20100813');
  expect(layer).toHaveAttribute('data-selected', 'Bicheno20100813');
  expect(screen.queryByRole('combobox', { name: 'Year' })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Glider type' })).not.toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: 'Bicheno20100813' }));
  await waitFor(() => expect(router.state.location.pathname).toBe('/product/gliders'));
});

it('ignores a pending mission when the yearmap changes', async () => {
  let finish!: (value: typeof mission) => void;
  vi.spyOn(source, 'fetchGliderMission').mockReturnValue(
    new Promise((resolve) => {
      finish = resolve;
    }),
  );
  const router = setup();
  await userEvent.click(await screen.findByRole('button', { name: mission.mission_name }));
  await screen.findByText('Loading mission…');
  await userEvent.click(screen.getByRole('button', { name: 'Previous year' }));
  await act(async () => finish(mission));
  expect(router.state.location.pathname).toBe('/map/gliders');
  expect(screen.queryByText('Loading mission…')).not.toBeInTheDocument();
});

it('only navigates for the most recently clicked deployment', async () => {
  let finishFirst!: (value: typeof mission) => void;
  let finishSecond!: (value: typeof mission) => void;
  vi.spyOn(source, 'fetchGliderMission')
    .mockReturnValueOnce(
      new Promise((resolve) => {
        finishFirst = resolve;
      }),
    )
    .mockReturnValueOnce(
      new Promise((resolve) => {
        finishSecond = resolve;
      }),
    );
  const router = setup();
  await userEvent.click(await screen.findByRole('button', { name: mission.mission_name }));
  await userEvent.click(screen.getByRole('button', { name: 'Ceduna20260924_nrt' }));
  await act(async () => finishFirst(mission));
  expect(router.state.location.pathname).toBe('/map/gliders');
  await act(async () => finishSecond({ ...mission, id: 'Ceduna20260924_nrt@5.' }));
  expect(router.state.location.search).toBe('?missionId=Ceduna20260924_nrt%405.&window=4d');
});

it('preserves the active image window when selecting another mission from the minimap', async () => {
  const yearmap = maps.find(({ id }) => id === '2026_sl_temp_04d_nrt')!;
  vi.mocked(source.fetchGliderYearmaps).mockResolvedValue([
    yearmap,
    { ...yearmap, id: '2026_sl_temp_12d_nrt', window: '12d' },
  ]);
  vi.spyOn(source, 'fetchGliderMission').mockResolvedValue(mission);
  const router = setup({ isMiniMap: true, missionName: mission.mission_name, window: '12d' });
  await userEvent.click(await screen.findByRole('button', { name: mission.mission_name }));
  await screen.findByText('Mission page');
  expect(router.state.location.search).toBe('?missionId=TwoRocks20261028_nrt%405.&window=12d');
});

it('preserves mobile initialization on a cached revisit', async () => {
  mobile.value = true;
  setup({}, true);
  await screen.findByTestId('deployment-layer');
  expect(useMapStore.getState().mapViewState).toEqual(initialMobileMapViewState.mapViewState);
});

it('exposes mission names and geographic bounds outside the canvas', async () => {
  setup();
  const list = await screen.findByRole('list', { name: 'Deployment bounds' });
  expect(list).toHaveTextContent('TwoRocks20261028_nrt');
  expect(list).toHaveTextContent(/west .*south .*east .*north/);
});

it.each(['UnknownMission', 'TwoRocks20261028_nrt'])(
  'keeps the minimap usable with unmatched mission/window: %s',
  async (missionName) => {
    setup({ isMiniMap: true, missionName, window: 'invalid' });
    await screen.findByTestId('interactive-map');
    expect(screen.getByTestId('deployment-layer').dataset.ids).not.toBe('');
  },
);

it('restores an explicit glider type after visiting a year that only has the other type', async () => {
  const sg = maps.find(({ platform }) => platform === 'sg')!;
  vi.mocked(source.fetchGliderYearmaps).mockResolvedValue([...maps, { ...sg, id: '2026_sg_temp_04d', year: 2026 }]);
  setup();
  const year = await screen.findByRole('combobox', { name: 'Year' });
  await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Data mode' }), 'delayed');
  await userEvent.click(screen.getByRole('button', { name: 'Glider type' }));
  await userEvent.click(screen.getByRole('menuitemradio', { name: 'Seaglider' }));
  await userEvent.click(screen.getByRole('button', { name: 'Glider type' }));
  await userEvent.click(screen.getByRole('menuitemradio', { name: 'Slocum' }));
  await userEvent.selectOptions(year, '2011');
  expect(screen.getByRole('button', { name: 'Glider type' })).toHaveTextContent('Seaglider');
  expect(screen.getByText('Slocum is unavailable for 2011; showing Seaglider.')).toBeInTheDocument();
  await userEvent.selectOptions(year, '2026');
  expect(screen.getByRole('button', { name: 'Glider type' })).toHaveTextContent('Slocum');
});
