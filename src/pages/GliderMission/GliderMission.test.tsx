import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as service from '@/services/gliders';
import GlidersFilters from '@/components/DataVisualisationSidebar/components/GlidersFilters';
import MiniMap from '@/components/DataVisualisationSidebar/components/MiniMap';
import useProductStore, { setProductId } from '@/stores/product-store/productStore';
import GliderMission from './GliderMission';

vi.mock('@/pages/GlidersMap/GlidersMap', () => ({
  default: (props: { missionName?: string; window?: string }) => (
    <div data-testid="minimap" data-mission={props.missionName} data-window={props.window} />
  ),
}));

const mission = {
  id: 'TwoRocks20261028_nrt@5.',
  mission_name: 'TwoRocks20261028_nrt',
  visualisations: { latest_images: { '4d': '/gliders/four.gif', '12d': '/gliders/twelve.gif', '30d': null } },
};
function setup(search = 'missionId=TwoRocks20261028_nrt%405.&window=12d') {
  const router = createMemoryRouter(
    [
      {
        path: '/product/gliders',
        element: (
          <>
            <MiniMap />
            <GlidersFilters />
            <GliderMission />
          </>
        ),
      },
    ],
    { initialEntries: [`/product/gliders?${search}`] },
  );
  render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
  return router;
}
const windowButton = (name: string) => screen.getByRole('button', { name });
beforeEach(() => {
  setProductId('gliders');
  vi.spyOn(service, 'fetchGliderMissionById').mockResolvedValue(mission);
});
afterEach(() => {
  useProductStore.setState(useProductStore.getInitialState());
  vi.restoreAllMocks();
});

it('opens a mission directly from its encoded ID and window', async () => {
  setup();
  expect(await screen.findByRole('img')).toHaveAttribute('src', '/resource/gliders/twelve.gif');
  expect(service.fetchGliderMissionById).toHaveBeenCalledWith(mission.id, expect.any(AbortSignal));
  expect(screen.getByRole('heading', { name: mission.mission_name })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Back to map' })).not.toBeInTheDocument();
});
it('defaults to the four day window', async () => {
  setup('missionId=TwoRocks20261028_nrt%405.');
  expect(await screen.findByRole('img')).toHaveAttribute('src', '/resource/gliders/four.gif');
});
it.each(['', 'missionId=test&window=invalid'])('handles incomplete or invalid URLs: %s', async (search) => {
  setup(search);
  expect(screen.getByText('Select a mission and a valid window from the Gliders map.')).toBeInTheDocument();
  expect(screen.queryByRole('group', { name: 'Time window' })).not.toBeInTheDocument();
  expect(service.fetchGliderMissionById).not.toHaveBeenCalled();
});
it('shows the selected mission on the minimap of its yearmap window', async () => {
  setup();
  await screen.findByRole('img');
  const minimap = screen.getByTestId('minimap');
  expect(minimap).toHaveAttribute('data-mission', mission.mission_name);
  expect(minimap).toHaveAttribute('data-window', '12d');
});
it('offers only published windows and switches the image and URL without refetching', async () => {
  const router = setup();
  await screen.findByRole('img');
  const group = screen.getByRole('group', { name: 'Time window' });
  expect([...group.querySelectorAll('button')].map((button) => button.textContent)).toEqual(['4 days', '12 days']);
  expect(windowButton('12 days')).toHaveAttribute('aria-pressed', 'true');
  await userEvent.click(windowButton('4 days'));
  expect(screen.getByRole('img')).toHaveAttribute('src', '/resource/gliders/four.gif');
  expect(windowButton('4 days')).toHaveAttribute('aria-pressed', 'true');
  expect(windowButton('12 days')).toHaveAttribute('aria-pressed', 'false');
  expect(screen.getByTestId('minimap')).toHaveAttribute('data-window', '4d');
  expect(router.state.location.search).toBe('?missionId=TwoRocks20261028_nrt%405.&window=4d');
  expect(router.state.historyAction).toBe('REPLACE');
  expect(service.fetchGliderMissionById).toHaveBeenCalledTimes(1);
});
it('recovers from a missing window image by selecting another window', async () => {
  const router = setup('missionId=TwoRocks20261028_nrt%405.&window=30d');
  await screen.findByText('Image unavailable');
  expect(screen.queryByRole('button', { name: '30 days' })).not.toBeInTheDocument();
  await userEvent.click(windowButton('12 days'));
  expect(screen.getByRole('img')).toHaveAttribute('src', '/resource/gliders/twelve.gif');
  expect(screen.queryByText('Image unavailable')).not.toBeInTheDocument();
  expect(router.state.location.search).toBe('?missionId=TwoRocks20261028_nrt%405.&window=12d');
});
it('recovers from a failed image by selecting another window', async () => {
  setup();
  fireEvent.error(await screen.findByRole('img'));
  expect(screen.getByText('Image unavailable')).toBeInTheDocument();
  await userEvent.click(windowButton('4 days'));
  expect(screen.getByRole('img')).toHaveAttribute('src', '/resource/gliders/four.gif');
});
it('uses the window from the URL when another mission is opened', async () => {
  const router = setup();
  await screen.findByRole('img');
  await userEvent.click(windowButton('4 days'));
  vi.mocked(service.fetchGliderMissionById).mockResolvedValue({
    ...mission,
    id: 'Ceduna20260924_nrt@5.',
    mission_name: 'Ceduna20260924_nrt',
  });
  await router.navigate('/product/gliders?missionId=Ceduna20260924_nrt%405.&window=12d');
  expect(await screen.findByRole('heading', { name: 'Ceduna20260924_nrt' })).toBeInTheDocument();
  expect(screen.getByRole('img')).toHaveAttribute('src', '/resource/gliders/twelve.gif');
  expect(screen.getByTestId('minimap')).toHaveAttribute('data-mission', 'Ceduna20260924_nrt');
});
it('allows retrying a mission request failure', async () => {
  vi.mocked(service.fetchGliderMissionById).mockRejectedValueOnce(new Error('404'));
  setup();
  await screen.findByRole('alert');
  expect(screen.queryByText('Image unavailable')).not.toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: 'Try again' }));
  await screen.findByRole('img');
});

it('keeps a mission heading in the main content', async () => {
  setup();
  const heading = await screen.findByRole('heading', { level: 1, name: mission.mission_name });
  expect(screen.getByRole('region', { name: 'Glider mission image' })).toContainElement(heading);
});

it('does not truncate an unversioned mission ID in the minimap', async () => {
  setup('missionId=unversioned&window=4d');
  expect(await screen.findByTestId('minimap')).not.toHaveAttribute('data-mission');
});

describe('temperature–salinity diagram', () => {
  const tsImage = '/gliders/missionTS/sl_TwoRocks20261028_nrt.gif';
  const withDiagram = {
    ...mission,
    visualisations: { ...mission.visualisations, temperature_salinity_image: tsImage },
  };
  const search = 'missionId=TwoRocks20261028_nrt%405.&view=ts';

  it('switches from the sidebar to the mission diagram and back, preserving the window', async () => {
    vi.mocked(service.fetchGliderMissionById).mockResolvedValue(withDiagram);
    const router = setup();
    await screen.findByRole('img', { name: 'TwoRocks20261028_nrt 12d mission profile' });
    await userEvent.click(screen.getByRole('button', { name: 'Temperature–salinity diagram' }));
    expect(screen.getByRole('img')).toHaveAttribute('src', `/resource${tsImage}`);
    expect(screen.getByRole('button', { name: 'Temperature–salinity diagram' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(router.state.location.search).toBe('?missionId=TwoRocks20261028_nrt%405.&window=12d&view=ts');
    await userEvent.click(screen.getByRole('button', { name: 'Mission profile' }));
    expect(screen.getByRole('img')).toHaveAttribute('src', '/resource/gliders/twelve.gif');
    expect(router.state.location.search).toBe('?missionId=TwoRocks20261028_nrt%405.&window=12d');
    expect(router.state.historyAction).toBe('REPLACE');
    expect(service.fetchGliderMissionById).toHaveBeenCalledTimes(1);
  });

  it('shows the mission diagram with its name, without date or window controls', async () => {
    vi.mocked(service.fetchGliderMissionById).mockResolvedValue(withDiagram);
    setup(search);
    const image = await screen.findByRole('img');
    expect(image).toHaveAttribute('src', `/resource${tsImage}`);
    expect(image).toHaveAccessibleName('TwoRocks20261028_nrt temperature–salinity diagram');
    // The sidebar names the mission; the image identifies the view.
    expect(screen.getByRole('heading', { name: 'TwoRocks20261028_nrt' })).toBeInTheDocument();
    expect(screen.queryByRole('group', { name: 'Time window' })).not.toBeInTheDocument();
  });

  it.each([
    ['not published', mission],
    [
      'explicitly null',
      { ...mission, visualisations: { ...mission.visualisations, temperature_salinity_image: null } },
    ],
  ])('shows an unavailable state when the diagram is %s', async (_, data) => {
    vi.mocked(service.fetchGliderMissionById).mockResolvedValue(data);
    setup(search);
    expect(await screen.findByText('Temperature–salinity diagram unavailable')).toHaveRole('status');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByRole('group', { name: 'Visualisation' })).not.toBeInTheDocument();
  });

  it('shows an unavailable state when the diagram fails to load', async () => {
    vi.mocked(service.fetchGliderMissionById).mockResolvedValue(withDiagram);
    setup(search);
    fireEvent.error(await screen.findByRole('img'));
    expect(screen.getByText('Temperature–salinity diagram unavailable')).toHaveRole('status');
  });

  it('shows a retryable request error for an unknown mission', async () => {
    vi.mocked(service.fetchGliderMissionById).mockRejectedValue(new Error('404'));
    setup(search);
    expect(await screen.findByRole('alert')).toHaveTextContent('Unable to load this Gliders mission.');
  });
});

describe('mission video', () => {
  const withVideo = {
    ...mission,
    visualisations: {
      ...mission.visualisations,
      animations: [{ label: '12', url: 'https://oceancurrent.aodn.org.au/gliders/twelve.mp4' }],
    },
  };

  it('toggles the published MP4 and returns to the same mission profile without refetching', async () => {
    vi.mocked(service.fetchGliderMissionById).mockResolvedValue(withVideo);
    const router = setup();
    await screen.findByRole('img');
    const button = screen.getByRole('button', { name: 'Toggle video' });
    await userEvent.click(button);
    const video = screen.getByLabelText(`${mission.mission_name} 12d mission video`);
    expect(video).toHaveAttribute('controls');
    expect(video).toHaveAttribute('playsinline');
    expect(video.querySelector('source')).toHaveAttribute('src', '/resource/gliders/twelve.mp4');
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).toHaveTextContent('Video');
    expect(button).not.toHaveTextContent('Exit');
    expect(router.state.location.search).toBe('?missionId=TwoRocks20261028_nrt%405.&window=12d&view=video');
    await userEvent.click(button);
    expect(screen.getByRole('img')).toHaveAttribute('src', '/resource/gliders/twelve.gif');
    expect(screen.queryByLabelText(`${mission.mission_name} 12d mission video`)).not.toBeInTheDocument();
    expect(router.state.location.search).toBe('?missionId=TwoRocks20261028_nrt%405.&window=12d');
    expect(service.fetchGliderMissionById).toHaveBeenCalledTimes(1);
  });

  it('disables video for a window without an animation', async () => {
    vi.mocked(service.fetchGliderMissionById).mockResolvedValue(withVideo);
    setup();
    await screen.findByRole('img');
    await userEvent.click(windowButton('4 days'));
    expect(screen.getByRole('button', { name: 'Toggle video' })).toBeDisabled();
  });

  it('disables video in the T-S view even when the mission has an animation', async () => {
    vi.mocked(service.fetchGliderMissionById).mockResolvedValue({
      ...withVideo,
      visualisations: { ...withVideo.visualisations, temperature_salinity_image: '/gliders/ts.gif' },
    });
    setup('missionId=TwoRocks20261028_nrt%405.&window=12d&view=ts');
    await screen.findByRole('img');
    expect(screen.getByRole('button', { name: 'Toggle video' })).toBeDisabled();
  });

  it('handles a direct video link and a failed MP4, allowing a return to the profile', async () => {
    vi.mocked(service.fetchGliderMissionById).mockResolvedValue(withVideo);
    setup('missionId=TwoRocks20261028_nrt%405.&window=12d&view=video');
    const video = await screen.findByLabelText(`${mission.mission_name} 12d mission video`);
    fireEvent.error(video.querySelector('source')!);
    expect(screen.getByText('Video unavailable')).toHaveRole('status');
    await userEvent.click(screen.getByRole('button', { name: 'Toggle video' }));
    expect(screen.getByRole('img')).toHaveAttribute('src', '/resource/gliders/twelve.gif');
  });

  it('shows an unavailable state when changing to a window without a video', async () => {
    vi.mocked(service.fetchGliderMissionById).mockResolvedValue(withVideo);
    setup('missionId=TwoRocks20261028_nrt%405.&window=12d&view=video');
    await screen.findByLabelText(`${mission.mission_name} 12d mission video`);
    await userEvent.click(windowButton('4 days'));
    expect(screen.getByText('Video unavailable')).toHaveRole('status');
    expect(screen.getByRole('button', { name: 'Toggle video' })).toBeEnabled();
  });
});

it.each([
  [{ glidersReturnTo: '/map/gliders?view=table&year=2026&platform=sl&sort=name-asc' }, true],
  [{ glidersReturnTo: 'https://example.org/map/gliders?view=table' }, false],
  [null, false],
])('only offers a return link to the Gliders deployments view: %o', async (state, shown) => {
  const router = createMemoryRouter([{ path: '/product/gliders', element: <GliderMission /> }], {
    initialEntries: [{ pathname: '/product/gliders', search: '?missionId=TwoRocks20261028_nrt%405.&view=ts', state }],
  });
  render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
  await screen.findByText('Temperature–salinity diagram unavailable');
  const link = screen.queryByRole('link', { name: 'Back to deployments' });
  if (shown) expect(link).toHaveAttribute('href', state!.glidersReturnTo);
  else expect(link).not.toBeInTheDocument();
});
