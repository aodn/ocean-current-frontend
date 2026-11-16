import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { apiClient } from '@/services/httpClient';
import * as service from '@/services/gliders';
import GliderMission from './GliderMission';

const diagrams = [
  { id: 'sg_Historical20010101', image_url: '/gliders/missionTS/historical.gif', mission_ids: [] },
  { id: 'sl_Current20260101', image_url: '/gliders/missionTS/current.gif', mission_ids: ['Current20260101@5.'] },
];
function setup(search: string) {
  const router = createMemoryRouter([{ path: '/product/gliders', element: <GliderMission /> }], {
    initialEntries: [`/product/gliders?${search}`],
  });
  render(
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
  return router;
}
beforeEach(() => {
  vi.spyOn(apiClient, 'get').mockResolvedValue({ data: { diagrams } });
  vi.spyOn(service, 'fetchGliderMissionById').mockResolvedValue({
    id: 'Current20260101@5.',
    mission_name: 'Current20260101',
    visualisations: {},
  });
});
afterEach(() => vi.restoreAllMocks());
it('wraps in both directions and updates mission associations', async () => {
  const router = setup('view=ts&diagramId=sg_Historical20010101');
  await screen.findByRole('img');
  await userEvent.click(screen.getByRole('link', { name: 'Previous' }));
  expect(router.state.location.search).toContain('missionId=Current20260101%405.');
  await userEvent.click(screen.getByRole('link', { name: 'Next' }));
  expect(router.state.location.search).not.toContain('missionId');
  expect(screen.getByRole('img')).toHaveAttribute('src', '/resource/gliders/missionTS/historical.gif');
});
it('lists historical diagrams in source order and opens them', async () => {
  setup('view=ts-index');
  await screen.findByRole('link', { name: diagrams[0].id });
  expect(screen.getAllByRole('listitem').map((item) => item.textContent)).toEqual(diagrams.map((d) => d.id));
  await userEvent.click(screen.getByRole('link', { name: diagrams[0].id }));
  expect(screen.getByRole('img')).toBeInTheDocument();
});
it('shows unavailable images and recovers when navigating', async () => {
  setup('view=ts&diagramId=sg_Historical20010101');
  fireEvent.error(await screen.findByRole('img'));
  expect(screen.getByRole('status')).toHaveTextContent('unavailable');
  await userEvent.click(screen.getByRole('link', { name: 'Next' }));
  expect(screen.getByRole('img')).toBeInTheDocument();
});
it('offers a retry when loading fails', async () => {
  vi.mocked(apiClient.get).mockRejectedValueOnce(new Error('Unavailable'));
  setup('view=ts-index');
  await screen.findByRole('alert');
  await userEvent.click(screen.getByRole('button', { name: 'Try again' }));
  await screen.findByRole('link', { name: diagrams[0].id });
});
