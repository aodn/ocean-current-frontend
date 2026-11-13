import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import type { GliderMission } from '@/types/gliders';
import GlidersTable from './GlidersTable';

const missions: GliderMission[] = [
  {
    id: 'TwoRocks20261028_nrt@5.',
    mission_name: 'TwoRocks20261028_nrt',
    start_date: '2026-10-28',
    end_date: '2026-11-04',
    latitude: -31.72,
    longitude: 115.42,
    glider_id: 'SL1292',
    processing_version: '5.',
    temperature_salinity_url: 'https://oceancurrent.aodn.org.au/gliders/missionTS/sl_TwoRocks20261028_nrt.html',
    scientific_data_url:
      'http://thredds.aodn.org.au/thredds/catalog/IMOS/ANFOG/REALTIME/slocum_glider/TwoRocks20261028/catalog.html',
    visualisations: {
      details: [
        {
          label: '4',
          url: 'https://oceancurrent.aodn.org.au/gliders/TwoRocks20261028_nrt_4d/latest.html',
        },
        {
          label: '12',
          url: 'https://oceancurrent.aodn.org.au/gliders/TwoRocks20261028_nrt_12d/latest.html',
        },
        {
          label: '30',
          url: 'https://oceancurrent.aodn.org.au/gliders/TwoRocks20261028_nrt_30d/latest.html',
        },
      ],
      animations: [
        {
          label: '30',
          url: 'https://oceancurrent.aodn.org.au/gliders/TwoRocks20261028_nrt_30d/TwoRocks20261028_nrt_30d.mp4',
        },
      ],
    },
  },
  {
    id: 'TwoRocks20080621@5.01',
    mission_name: 'TwoRocks20080621',
    start_date: '2008-06-21',
    glider_id: 'SL104',
    processing_version: '5.01',
    visualisations: {},
  },
  {
    id: 'Bicheno20100813@5.00',
    mission_name: 'Bicheno20100813',
    start_date: '2010-08-13',
    visualisations: {},
  },
];

function setup(data: GliderMission[] = missions) {
  const onSelect = vi.fn();
  render(
    <MemoryRouter>
      <GlidersTable missions={data} onSelect={onSelect} />
    </MemoryRouter>,
  );
  return onSelect;
}

it('shows historical and NRT metadata and uses only the published product labels and destinations', () => {
  setup();
  const nrt = screen.getByRole('button', { name: 'TwoRocks20261028_nrt' }).closest('tr')!;
  const row = within(nrt);
  expect(row.getByText('28 Oct 2026 – 04 Nov 2026')).toBeInTheDocument();
  expect(row.getByText('31.72° S')).toBeInTheDocument();
  expect(row.getByText('115.42° E')).toBeInTheDocument();
  expect(row.getByText('SL1292')).toBeInTheDocument();
  expect(row.getByText('5.')).toBeInTheDocument();
  expect(row.queryByRole('link', { name: 'T-S' })).not.toBeInTheDocument();
  expect(screen.getByRole('columnheader', { name: 'T-S' })).toBeInTheDocument();
  const detail = row.getByRole('group', { name: 'Mission images' });
  expect(detail.textContent).toBe('4 / 12 / 30');
  expect(within(detail).getByRole('button', { name: 'View 12-day mission image' })).toBeInTheDocument();
  const animation = row.getByRole('group', { name: 'Animations' });
  expect(within(animation).getByRole('link', { name: 'View 30-day animation' })).toHaveAttribute(
    'href',
    '/resource/gliders/TwoRocks20261028_nrt_30d/TwoRocks20261028_nrt_30d.mp4',
  );
  expect(row.getByRole('link', { name: 'Scientific data' })).toHaveAttribute(
    'href',
    'http://thredds.aodn.org.au/thredds/catalog/IMOS/ANFOG/REALTIME/slocum_glider/TwoRocks20261028/catalog.html',
  );
  const historical = within(screen.getByRole('button', { name: 'TwoRocks20080621' }).closest('tr')!);
  expect(historical.getByText('SL104')).toBeInTheDocument();
  expect(historical.getByText('5.01')).toBeInTheDocument();
});

it('sorts by deployment date and mission name and opens the exact catalogue mission', async () => {
  const onSelect = setup();
  expect(screen.getAllByRole('row')[1]).toHaveTextContent('TwoRocks20261028_nrt');
  await userEvent.click(screen.getByRole('button', { name: 'Sort deployments' }));
  await userEvent.click(screen.getByRole('menuitem', { name: 'Mission name (A–Z)' }));
  expect(screen.getAllByRole('row')[1]).toHaveTextContent('Bicheno20100813');
  await userEvent.click(screen.getByRole('button', { name: 'Sort deployments' }));
  await userEvent.click(screen.getByRole('menuitem', { name: 'Oldest deployment' }));
  expect(screen.getAllByRole('row')[1]).toHaveTextContent('TwoRocks20080621');
  await userEvent.click(screen.getByRole('button', { name: 'TwoRocks20080621' }));
  expect(onSelect).toHaveBeenCalledWith(missions.find(({ mission_name }) => mission_name === 'TwoRocks20080621'));
});

it('handles missing metadata, zero values, west longitude and a partial published window list', () => {
  setup([
    {
      id: 'missing',
      mission_name: 'Missing metadata',
      latitude: 0,
      longitude: -10,
      duration_days: 0,
      distance_travelled_km: 0,
      visualisations: { details: [{ label: '12', url: '/gliders/only-12.html' }] },
    },
  ]);
  expect(screen.getByRole('cell', { name: '0° N' })).toBeInTheDocument();
  expect(screen.getByRole('cell', { name: '10° W' })).toBeInTheDocument();
  expect(screen.getAllByRole('cell', { name: '0' })).toHaveLength(2);
  expect(screen.getAllByRole('cell', { name: '—' })).toHaveLength(6);
  expect(screen.queryByRole('link')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'View 12-day mission image' })).toBeInTheDocument();
});

it.each(['4', '12', '30'])('opens the mission with the selected %s day Details window', async (label) => {
  const mission = missions.find(({ mission_name }) => mission_name === 'TwoRocks20261028_nrt')!;
  const onSelect = setup([mission]);
  await userEvent.click(screen.getByRole('button', { name: `View ${label}-day mission image` }));
  expect(onSelect).toHaveBeenCalledWith(mission, `${label}d`);
});

it('shows the filtered count, explains Version and disables explicitly unavailable images', async () => {
  const onSelect = setup([
    {
      ...missions[0],
      visualisations: { ...missions[0].visualisations, latest_images: { '4d': '/gliders/four.gif', '12d': null } },
    },
  ]);
  expect(screen.getByRole('heading', { name: 'Deployments' })).toBeInTheDocument();
  expect(screen.getByText('1 mission')).toBeInTheDocument();
  expect(screen.getByRole('columnheader', { name: 'Processing version' })).toHaveTextContent('Version');
  const unavailable = screen.getByRole('button', { name: 'View 12-day mission image' });
  expect(unavailable).toBeDisabled();
  expect(unavailable).toHaveAttribute('title', 'Image unavailable');
  await userEvent.click(unavailable);
  expect(onSelect).not.toHaveBeenCalled();
  expect(screen.getByRole('button', { name: 'View 4-day mission image' })).toBeEnabled();
});

it('opens the T-S diagram in the app and disables it when no diagram image is published', async () => {
  const published = {
    ...missions[0],
    visualisations: {
      ...missions[0].visualisations,
      temperature_salinity_image: '/gliders/missionTS/sl_TwoRocks20261028_nrt.gif',
    },
  };
  const onSelect = setup([
    published,
    { ...missions[1], temperature_salinity_url: missions[0].temperature_salinity_url },
  ]);
  const open = screen.getByRole('button', { name: 'View TwoRocks20261028_nrt temperature–salinity diagram' });
  expect(open).toHaveTextContent('T-S');
  await userEvent.click(open);
  expect(onSelect).toHaveBeenCalledWith(published, 'ts');
  const unavailable = screen.getByRole('button', { name: 'View TwoRocks20080621 temperature–salinity diagram' });
  expect(unavailable).toBeDisabled();
  expect(unavailable).toHaveAttribute('title', 'Diagram unavailable');
  // A mission without a published T-S link has no action.
  expect(screen.queryByRole('button', { name: /Bicheno20100813 temperature/ })).not.toBeInTheDocument();
});
