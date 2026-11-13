import { useEffect } from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { initialMobileMapViewState } from '@/configs/map';
import useMapStore, { patchMapViewState } from '@/stores/map-store/mapStore';
import * as source from '@/services/gliders';
import type { GliderMission as Mission, GliderYearmap } from '@/types/gliders';
import GliderMission from '@/pages/GliderMission/GliderMission';
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

function setup(
  props: { isMiniMap?: boolean; missionName?: string; window?: string } = {},
  cached = false,
  search = '',
) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  if (cached) client.setQueryData(['gliders', 'yearmaps'], maps);
  const router = createMemoryRouter(
    [
      { path: '/map/gliders', element: <GlidersMap {...props} /> },
      {
        path: '/product/gliders',
        element: <GliderMission />,
      },
    ],
    {
      initialEntries: [`/map/gliders${search}`],
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
  vi.spyOn(source, 'fetchGliderMissions').mockResolvedValue(catalogueMissions);
  vi.spyOn(source, 'fetchGliderMissionById').mockResolvedValue(mission);
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
  expect(screen.getByRole('button', { name: 'Glider type' })).toHaveTextContent('Seaglider');
  expect(screen.getByText('No deployment areas are available for this map.')).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: 'Glider type' }));
  await userEvent.click(screen.getByRole('menuitemradio', { name: 'Slocum' }));
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
  is_nrt: true,
  visualisations: { latest_images: { '4d': '/gliders/TwoRocks20261028_nrt_4d/2026110412.gif', '12d': '/wrong.gif' } },
};

const catalogueMissions: Mission[] = [
  {
    ...mission,
    start_date: '2026-10-28',
    glider_id: 'SL1292',
    visualisations: {
      ...mission.visualisations,
      latest_images: { ...mission.visualisations.latest_images, '30d': '/gliders/thirty.gif' },
      details: ['4', '12', '30'].map((label) => ({ label, url: `/gliders/mission_${label}d/latest.html` })),
    },
  },
  {
    id: 'Bicheno20100813@5.',
    mission_name: 'Bicheno20100813',
    start_date: '2010-08-13',
    end_date: '2011-01-02',
    glider_id: 'SG519',
    visualisations: {},
  },
  {
    id: 'Perth20110626_1@5.',
    mission_name: 'Perth20110626_1',
    start_date: '2011-06-26',
    glider_id: 'SG514',
    visualisations: {},
  },
  {
    id: 'PortStephens20081125@5.',
    mission_name: 'PortStephens20081125',
    start_date: '2008-11-25',
    glider_id: 'SL210',
    visualisations: {},
  },
];

it.each(['04d', '12d', '30d'])(
  'navigates directly to the mission image for %s without showing a preview',
  async (window) => {
    const yearmap = maps.find(({ id }) => id === '2026_sl_temp_04d_nrt')!;
    vi.mocked(source.fetchGliderYearmaps).mockResolvedValue([{ ...yearmap, window }]);
    vi.spyOn(source, 'fetchGliderMission').mockResolvedValue(mission);
    const router = setup();
    await userEvent.click(await screen.findByRole('button', { name: mission.mission_name }));
    await screen.findByRole('region', { name: 'Glider mission image' });
    expect(router.state.location.search).toBe(
      `?missionId=TwoRocks20261028_nrt%405.&window=${window.replace(/^0+/, '')}`,
    );
    expect(screen.getByRole('region', { name: 'Glider mission image' })).toBeInTheDocument();
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
  await screen.findByRole('region', { name: 'Glider mission image' });
  expect(router.state.location.search).toBe('?missionId=TwoRocks20261028_nrt%405.&window=12d');
});

it('preserves the year and type across view switches and loads the catalogue only once', async () => {
  setup();
  await screen.findByTestId('interactive-map');
  expect(screen.getByRole('switch', { name: 'Table view' })).toHaveAttribute('aria-checked', 'false');
  expect(source.fetchGliderMissions).not.toHaveBeenCalled();
  await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Data mode' }), 'delayed');
  await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Year' }), '2011');
  await userEvent.click(screen.getByRole('switch', { name: 'Table view' }));
  await screen.findByRole('table');
  expect(screen.getByRole('combobox', { name: 'Year' })).toHaveValue('2011');
  expect(screen.getByRole('button', { name: 'Glider type' })).toHaveTextContent('Seaglider');
  await userEvent.click(screen.getByRole('switch', { name: 'Table view' }));
  expect(screen.getByTestId('deployment-layer')).toHaveAttribute('data-ids', 'Bicheno20100813');
  await userEvent.click(screen.getByRole('switch', { name: 'Table view' }));
  expect(screen.getByRole('combobox', { name: 'Year' })).toHaveValue('2011');
  await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Year' }), '2008');
  expect(screen.getByRole('button', { name: 'Glider type' })).toHaveTextContent('Slocum');
  expect(screen.getByRole('button', { name: 'PortStephens20081125' })).toBeInTheDocument();
  expect(source.fetchGliderMissions).toHaveBeenCalledTimes(1);
  expect(source.fetchGliderMissionById).not.toHaveBeenCalled();
});

it('includes deployments without bounds, deduplicates map variants and uses catalogue dates', async () => {
  const yearmap = maps.find(({ year }) => year === 2011)!;
  const unbounded = yearmap.deployments.find(({ bbox }) => bbox === null)!;
  vi.mocked(source.fetchGliderYearmaps).mockResolvedValue([yearmap, { ...yearmap, id: 'variant', window: '12d' }]);
  vi.mocked(source.fetchGliderMissions).mockResolvedValue([
    { ...mission, is_nrt: false, mission_name: unbounded.mission_name, start_date: '2011-01-02', end_date: null },
  ]);
  setup();
  await userEvent.selectOptions(await screen.findByRole('combobox', { name: 'Data mode' }), 'delayed');
  await userEvent.click(screen.getByRole('switch', { name: 'Table view' }));
  await screen.findByText('02 Jan 2011 – —');
  expect(screen.getAllByRole('row')).toHaveLength(2);
  expect(screen.getAllByRole('button', { name: unbounded.mission_name })).toHaveLength(1);
  expect(screen.getAllByRole('cell', { name: '—' })).toHaveLength(10);
  expect(source.fetchGliderMissionById).not.toHaveBeenCalled();
});

it('opens an unbounded mission by keyboard and returns to the table with browser Back', async () => {
  const yearmap = maps.find(({ year }) => year === 2011)!;
  const unbounded = yearmap.deployments.find(({ bbox }) => bbox === null)!;
  vi.spyOn(source, 'fetchGliderMission').mockResolvedValue({ ...mission, mission_name: unbounded.mission_name });
  const router = setup();
  await userEvent.selectOptions(await screen.findByRole('combobox', { name: 'Data mode' }), 'delayed');
  await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Year' }), '2011');
  await userEvent.click(screen.getByRole('switch', { name: 'Table view' }));
  await screen.findByRole('table');
  await userEvent.click(screen.getByRole('button', { name: 'Sort deployments' }));
  await userEvent.click(screen.getByRole('menuitem', { name: 'Mission name (Z–A)' }));
  screen.getByRole('button', { name: unbounded.mission_name }).focus();
  await userEvent.keyboard('{Enter}');
  await screen.findByRole('region', { name: 'Glider mission image' });
  await act(async () => {
    await router.navigate(-1);
  });
  await screen.findByRole('table');
  expect(router.state.location.pathname).toBe('/map/gliders');
  expect(screen.getByRole('switch', { name: 'Table view' })).toHaveAttribute('aria-checked', 'true');
  expect(screen.getByRole('combobox', { name: 'Year' })).toHaveValue('2011');
  expect(screen.getByRole('button', { name: 'Glider type' })).toHaveTextContent('Seaglider');
  expect(screen.getByRole('button', { name: 'Sort deployments' })).toHaveTextContent('Mission name (Z–A)');
});

it('keeps the toolbar usable when all deployments lack bounds', async () => {
  vi.mocked(source.fetchGliderYearmaps).mockResolvedValue([
    { ...maps[0], deployments: maps[0].deployments.map((deployment) => ({ ...deployment, bbox: null })) },
  ]);
  setup();
  await screen.findByText('No deployment areas are available for this map.');
  await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Data mode' }), 'delayed');
  await userEvent.click(screen.getByRole('switch', { name: 'Table view' }));
  expect(await screen.findByRole('table')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'PortStephens20081125' })).toBeInTheDocument();
});

it('shows an empty table state and allows switching back to the map', async () => {
  vi.mocked(source.fetchGliderYearmaps).mockResolvedValue([]);
  vi.mocked(source.fetchGliderMissions).mockResolvedValue([]);
  setup();
  await userEvent.click(await screen.findByRole('switch', { name: 'Table view' }));
  await screen.findByText('No deployments are available for the selected year and glider type.');
  await userEvent.click(screen.getByRole('switch', { name: 'Table view' }));
  expect(screen.getByText('No deployment areas are available for this map.')).toBeInTheDocument();
});

it('supports retry when the catalogue fails to load', async () => {
  vi.mocked(source.fetchGliderMissions).mockRejectedValue(new Error('offline'));
  setup();
  await userEvent.click(await screen.findByRole('switch', { name: 'Table view' }));
  await screen.findByText('Unable to load Gliders missions.');
  vi.mocked(source.fetchGliderMissions).mockResolvedValue(catalogueMissions);
  await userEvent.click(screen.getByRole('button', { name: 'Try again' }));
  expect(await screen.findByRole('button', { name: mission.mission_name })).toBeEnabled();
});

it('includes catalogue missions absent from all yearmaps and preserves their filters in map view', async () => {
  vi.mocked(source.fetchGliderMissions).mockResolvedValue([
    ...catalogueMissions,
    {
      ...mission,
      id: 'OffMap@5.',
      mission_name: 'OffMap',
      start_date: '2011-12-01',
      end_date: '2012-01-15',
      glider_id: 'SG152',
    },
  ]);
  const router = setup();
  await userEvent.selectOptions(await screen.findByRole('combobox', { name: 'Data mode' }), 'nrt');
  await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Year' }), '2011');
  await userEvent.click(screen.getByRole('switch', { name: 'Table view' }));
  expect(await screen.findByRole('button', { name: 'OffMap' })).toBeInTheDocument();
  await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Year' }), '2012');
  expect(screen.getByRole('button', { name: 'OffMap' })).toBeInTheDocument();
  await userEvent.click(screen.getByRole('switch', { name: 'Table view' }));
  expect(screen.getByText('No deployment areas are available for this map.')).toBeInTheDocument();
  expect(screen.getByRole('combobox', { name: 'Year' })).toHaveValue('2012');
  await userEvent.click(screen.getByRole('switch', { name: 'Table view' }));
  expect(screen.getByRole('button', { name: 'OffMap' })).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: 'OffMap' }));
  await screen.findByRole('region', { name: 'Glider mission image' });
  await act(async () => {
    await router.navigate(-1);
  });
  expect(await screen.findByRole('button', { name: 'OffMap' })).toBeInTheDocument();
  expect(screen.getByRole('combobox', { name: 'Year' })).toHaveValue('2012');
});

it('reports catalogue missions whose missing year or platform cannot be resolved', async () => {
  vi.mocked(source.fetchGliderMissions).mockResolvedValue([{ ...mission, mission_name: 'Unknown', id: 'unknown' }]);
  setup();
  await userEvent.click(await screen.findByRole('switch', { name: 'Table view' }));
  await screen.findByText(
    'Some catalogue missions have no year, glider type or data mode metadata and cannot be filtered.',
  );
  expect(screen.getByText('No deployments are available for the selected year and glider type.')).toBeInTheDocument();
});

it.each(['4', '12', '30'])(
  'passes the %s day Details window in the mission URL and preserves table state',
  async (label) => {
    const router = setup();
    await userEvent.click(await screen.findByRole('switch', { name: 'Table view' }));
    await screen.findByRole('table');
    await userEvent.click(screen.getByRole('button', { name: 'Sort deployments' }));
    await userEvent.click(screen.getByRole('menuitem', { name: 'Mission name (A–Z)' }));
    const row = screen.getByRole('button', { name: mission.mission_name }).closest('tr')!;
    const detailsButton = Array.from(row.querySelectorAll('button')).find((button) => button.textContent === label)!;
    await userEvent.click(detailsButton);
    await screen.findByRole('region', { name: 'Glider mission image' });
    expect(new URLSearchParams(router.state.location.search).get('window')).toBe(`${label}d`);
    expect(new URLSearchParams(router.state.location.search).get('missionId')).toBe(mission.id);
    await act(async () => {
      await router.navigate(-1);
    });
    await screen.findByRole('table');
    expect(screen.getByRole('switch', { name: 'Table view' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('button', { name: 'Sort deployments' })).toHaveTextContent('Mission name (A–Z)');
  },
);

it('opens the selected mission T-S diagram from the table and returns with filters and sort', async () => {
  const tsImage = '/gliders/missionTS/sl_TwoRocks20261028_nrt.gif';
  const withDiagram = {
    ...catalogueMissions[0],
    temperature_salinity_url: 'https://oceancurrent.aodn.org.au/gliders/missionTS/sl_TwoRocks20261028_nrt.html',
    visualisations: { ...catalogueMissions[0].visualisations, temperature_salinity_image: tsImage },
  };
  vi.mocked(source.fetchGliderMissions).mockResolvedValue([withDiagram, ...catalogueMissions.slice(1)]);
  vi.mocked(source.fetchGliderMissionById).mockResolvedValue(withDiagram);
  const router = setup();
  await userEvent.click(await screen.findByRole('switch', { name: 'Table view' }));
  await screen.findByRole('table');
  await userEvent.click(screen.getByRole('button', { name: 'Sort deployments' }));
  await userEvent.click(screen.getByRole('menuitem', { name: 'Oldest deployment' }));
  const tableSearch = new URLSearchParams(router.state.location.search);

  await userEvent.click(
    screen.getByRole('button', { name: `View ${mission.mission_name} temperature–salinity diagram` }),
  );
  await screen.findByRole('region', { name: 'Glider mission image' });
  expect(router.state.location.search).toBe(`?missionId=${encodeURIComponent(mission.id)}&view=ts`);
  const diagram = await screen.findByRole('img', { name: `${mission.mission_name} temperature–salinity diagram` });
  expect(diagram).toHaveAttribute('src', `/resource${tsImage}`);
  expect(source.fetchGliderMissionById).toHaveBeenCalledWith(mission.id, expect.any(AbortSignal));

  await userEvent.click(screen.getByRole('link', { name: 'Back to deployments' }));
  await screen.findByRole('table');
  const returned = new URLSearchParams(router.state.location.search);
  expect(router.state.location.pathname).toBe('/map/gliders');
  for (const key of ['view', 'year', 'platform', 'sort']) expect(returned.get(key)).toBe(tableSearch.get(key));
  expect(returned.get('sort')).toBe('date-asc');
  expect(screen.getByRole('switch', { name: 'Table view' })).toHaveAttribute('aria-checked', 'true');
  expect(screen.getByRole('button', { name: 'Sort deployments' })).toHaveTextContent('Oldest deployment');
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

it.each(['?year=1999', '?year=2099&platform=invalid', '?view=table&year=1999'])(
  'recovers usable filters for an unavailable URL year: %s',
  async (search) => {
    setup({}, false, search);
    await waitFor(() => expect(screen.getByRole('combobox', { name: 'Year' })).toHaveValue('2026'));
    expect(screen.getByRole('button', { name: 'Glider type' })).toHaveTextContent('Slocum');
    await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Data mode' }), 'delayed');
    await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Year' }), '2011');
    expect(screen.getByRole('combobox', { name: 'Year' })).toHaveValue('2011');
  },
);

it('resolves a saved catalogue-only map selection before falling back', async () => {
  let finish!: (value: Mission[]) => void;
  vi.mocked(source.fetchGliderMissions).mockReturnValue(
    new Promise((resolve) => {
      finish = resolve;
    }),
  );
  setup({}, false, '?view=map&year=2012&platform=sg');
  await screen.findByText('Loading missions…');
  await act(async () => finish([{ ...mission, mission_name: 'OffMap', glider_id: 'SG152', start_date: '2012-01-01' }]));
  expect(await screen.findByRole('combobox', { name: 'Year' })).toHaveValue('2012');
  expect(screen.getByRole('button', { name: 'Glider type' })).toHaveTextContent('Seaglider');
  expect(screen.getByText('No deployment areas are available for this map.')).toBeInTheDocument();
});

it('does not pick a platform whose yearmap is empty', async () => {
  const sl = { ...maps[0], year: 2020 };
  vi.mocked(source.fetchGliderYearmaps).mockResolvedValue([
    { ...sl, platform: 'sg', is_nrt: true, deployments: [] },
    sl,
  ]);
  setup({}, false, '?year=2020&mode=delayed');
  expect(await screen.findByRole('button', { name: 'Glider type' })).toHaveTextContent('Slocum');
  await screen.findByTestId('deployment-layer');
});

it('defaults to the latest drawable year when a newer year has no bounds', async () => {
  const latest = maps.find(({ year }) => year === 2026)!;
  vi.mocked(source.fetchGliderYearmaps).mockResolvedValue([
    ...maps,
    { ...latest, id: 'unverified2030', year: 2030, deployments: latest.deployments.map((d) => ({ ...d, bbox: null })) },
  ]);
  setup();
  expect(await screen.findByRole('combobox', { name: 'Year' })).toHaveValue('2026');
  await screen.findByTestId('deployment-layer');
});

it('ignores a pending map lookup after switching to the table', async () => {
  let finish!: (value: typeof mission) => void;
  vi.spyOn(source, 'fetchGliderMission').mockReturnValue(
    new Promise((resolve) => {
      finish = resolve;
    }),
  );
  const router = setup();
  await userEvent.click(await screen.findByRole('button', { name: mission.mission_name }));
  await userEvent.click(screen.getByRole('switch', { name: 'Table view' }));
  await screen.findByRole('table');
  await act(async () => finish(mission));
  expect(router.state.location.pathname).toBe('/map/gliders');
  expect(screen.queryByText('Loading mission…')).not.toBeInTheDocument();
});

it('keeps table access available when yearmaps fail', async () => {
  vi.mocked(source.fetchGliderYearmaps).mockRejectedValue(new Error('offline'));
  setup();
  await screen.findByText('Unable to load Gliders deployments.');
  await userEvent.click(screen.getByRole('switch', { name: 'Table view' }));
  await screen.findByRole('table');
  await userEvent.click(screen.getByRole('switch', { name: 'Table view' }));
  await screen.findByText('Unable to load Gliders deployments.');
  expect(screen.getByRole('switch', { name: 'Table view' })).toBeEnabled();
});

it('opens an available window when a table mission lacks the default image', async () => {
  vi.mocked(source.fetchGliderMissions).mockResolvedValue([
    { ...mission, visualisations: { latest_images: { '4d': null, '12d': '/gliders/twelve.gif' } } },
  ]);
  const router = setup();
  await userEvent.click(await screen.findByRole('switch', { name: 'Table view' }));
  await userEvent.click(await screen.findByRole('button', { name: mission.mission_name }));
  await waitFor(() => expect(new URLSearchParams(router.state.location.search).get('window')).toBe('12d'));
});

it('clears a map lookup error when switching views', async () => {
  vi.spyOn(source, 'fetchGliderMission').mockRejectedValue(new Error('offline'));
  setup();
  await userEvent.click(await screen.findByRole('button', { name: mission.mission_name }));
  await screen.findByText('Unable to open this mission. Please select a deployment to try again.');
  await userEvent.click(screen.getByRole('switch', { name: 'Table view' }));
  await screen.findByRole('table');
  expect(
    screen.queryByText('Unable to open this mission. Please select a deployment to try again.'),
  ).not.toBeInTheDocument();
});

it('prefers a drawable platform over an unbounded NRT map in the same year', async () => {
  const sl = { ...maps[0], year: 2020, platform: 'sl' as const, is_nrt: false };
  vi.mocked(source.fetchGliderYearmaps).mockResolvedValue([
    {
      ...sl,
      id: 'unbounded',
      platform: 'sg',
      is_nrt: true,
      deployments: sl.deployments.map((d) => ({ ...d, bbox: null })),
    },
    sl,
  ]);
  setup({}, false, '?year=2020&mode=delayed');
  expect(await screen.findByRole('button', { name: 'Glider type' })).toHaveTextContent('Slocum');
  await screen.findByTestId('deployment-layer');
});

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

it('keeps map and table in the same explicit mode and preserves it on return from a mission', async () => {
  const delayed = { ...catalogueMissions[0], id: 'Delayed@5.', mission_name: 'Delayed_nrt', is_nrt: false };
  vi.mocked(source.fetchGliderMissions).mockResolvedValue([catalogueMissions[0], delayed]);
  const router = setup();
  const mode = await screen.findByRole('combobox', { name: 'Data mode' });
  expect(mode).toHaveValue('nrt');
  await userEvent.selectOptions(mode, 'delayed');
  expect(screen.getByRole('combobox', { name: 'Year' })).toHaveValue('2026');
  expect(screen.getByTestId('deployment-layer').dataset.ids).toContain('BassStrait20260316');
  expect(screen.getByTestId('deployment-layer').dataset.ids).not.toContain(mission.mission_name);
  await userEvent.click(screen.getByRole('switch', { name: 'Table view' }));
  const delayedButton = await screen.findByRole('button', { name: delayed.mission_name });
  expect(screen.queryByRole('button', { name: mission.mission_name })).not.toBeInTheDocument();
  await userEvent.click(delayedButton);
  await screen.findByRole('region', { name: 'Glider mission image' });
  await act(async () => {
    await router.navigate(-1);
  });
  await screen.findByRole('button', { name: delayed.mission_name });
  expect(screen.getByRole('combobox', { name: 'Data mode' })).toHaveValue('delayed');
  await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Data mode' }), 'nrt');
  await screen.findByRole('button', { name: mission.mission_name });
  expect(screen.queryByRole('button', { name: delayed.mission_name })).not.toBeInTheDocument();
});

it('restores the explicit type after a temporary fallback and a map/table switch', async () => {
  const router = setup({}, false, '?year=2026&platform=sl&mode=delayed');
  await userEvent.selectOptions(await screen.findByRole('combobox', { name: 'Year' }), '2011');
  expect(screen.getByRole('button', { name: 'Glider type' })).toHaveTextContent('Seaglider');
  expect(new URLSearchParams(router.state.location.search).get('platform')).toBe('sl');
  await userEvent.click(screen.getByRole('switch', { name: 'Table view' }));
  await screen.findByRole('table');
  await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Year' }), '2026');
  expect(screen.getByRole('button', { name: 'Glider type' })).toHaveTextContent('Slocum');
  expect(new URLSearchParams(router.state.location.search).get('platform')).toBe('sl');
});

it('does not silently fall back to delayed data when NRT is empty', async () => {
  setup({}, false, '?year=2011');
  await screen.findByText('No deployment areas are available for this map.');
  expect(screen.getByRole('combobox', { name: 'Data mode' })).toHaveValue('nrt');
  await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Data mode' }), 'delayed');
  expect(screen.getByTestId('deployment-layer').dataset.ids).toContain('Bicheno20100813');
});
