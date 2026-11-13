import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as service from '@/services/gliders';
import GliderMission from './GliderMission';

const mission = {
  id: 'TwoRocks20261028_nrt@5.',
  mission_name: 'TwoRocks20261028_nrt',
  visualisations: { latest_images: { '4d': '/gliders/four.gif', '12d': '/gliders/twelve.gif' } },
};
function setup(search = 'missionId=TwoRocks20261028_nrt%405.&window=12d') {
  const router = createMemoryRouter([{ path: '/product/gliders', element: <GliderMission /> }], {
    initialEntries: [`/product/gliders?${search}`],
  });
  render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}
beforeEach(() => {
  vi.spyOn(service, 'fetchGliderMissionById').mockResolvedValue(mission);
});
afterEach(() => vi.restoreAllMocks());

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
  expect(service.fetchGliderMissionById).not.toHaveBeenCalled();
});
it('handles a missing window image', async () => {
  setup('missionId=TwoRocks20261028_nrt%405.&window=30d');
  await screen.findByText('Image unavailable');
});
it('handles a failed image', async () => {
  setup();
  fireEvent.error(await screen.findByRole('img'));
  expect(screen.getByText('Image unavailable')).toBeInTheDocument();
});
it('allows retrying a mission request failure', async () => {
  vi.mocked(service.fetchGliderMissionById).mockRejectedValueOnce(new Error('404'));
  setup();
  await screen.findByRole('alert');
  expect(screen.queryByText('Image unavailable')).not.toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: 'Try again' }));
  await screen.findByRole('img');
});
