import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { apiClient } from '@/services/httpClient';
import * as service from '@/services/gliders';
import GliderMission from './GliderMission';
import { describeTsDiagram } from './GliderTs';

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
const diagramLink = (id: string) => screen.getByRole('link', { name: `View ${id} temperature–salinity diagram` });
const rowNames = () => screen.getAllByRole('rowheader').map((cell) => cell.textContent);
it('lists historical diagrams in a table in source order and opens them', async () => {
  setup('view=ts-index');
  await screen.findByRole('table');
  expect(rowNames()).toEqual(['Historical20010101', 'Current20260101']);
  const historical = screen.getByRole('row', { name: /Historical20010101/ });
  expect(historical).toHaveTextContent('01 Jan 2001');
  expect(historical).toHaveTextContent('Seaglider');
  expect(historical).toHaveTextContent('Delayed');
  await userEvent.click(diagramLink(diagrams[0].id));
  expect(screen.getByRole('img')).toBeInTheDocument();
});
it('filters by year, glider type and data mode', async () => {
  const router = setup('view=ts-index');
  await screen.findByRole('table');
  await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Glider type' }), 'Slocum');
  expect(rowNames()).toEqual(['Current20260101']);
  expect(router.state.location.search).toContain('platform=Slocum');
  await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Year' }), '2001');
  expect(screen.getByRole('status')).toHaveTextContent('No T-S diagrams match');
  await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Glider type' }), '');
  await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Data mode' }), 'Delayed');
  expect(rowNames()).toEqual(['Historical20010101']);
});
it.each([
  ['sl_TwoRocks20261028_nrt', 'TwoRocks20261028_nrt', 'Slocum', '28 Oct 2026', 'NRT'],
  ['sg_Perth20110626_1', 'Perth20110626_1', 'Seaglider', '26 Jun 2011', 'Delayed'],
  ['sg_Brisbane20180306A_nrt', 'Brisbane20180306A_nrt', 'Seaglider', '06 Mar 2018', 'NRT'],
  ['sl_Forster120230714', 'Forster120230714', 'Slocum', '14 Jul 2023', 'Delayed'],
  ['sg_Bremer201703011', 'Bremer201703011', 'Seaglider', '01 Mar 2017', 'Delayed'],
  ['sl_Groote_Eylandt20261027_nrt', 'Groote_Eylandt20261027_nrt', 'Slocum', '27 Oct 2026', 'NRT'],
  ['sg_Unknown2018', 'Unknown2018', 'Seaglider', undefined, 'Delayed'],
])('describes %s', (id, name, platform, date, mode) => {
  const row = describeTsDiagram({ id, image_url: null, mission_ids: [] });
  expect({ ...row, date: row.date?.format('DD MMM YYYY') }).toEqual({ name, platform, date, mode });
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
  await screen.findByRole('table');
});
