import { fetchGliderMissionById, searchGliderMissions } from '@/services/gliders';
import type { GliderMission } from '@/types/gliders';
import { resolveImageTag } from './GliderImageTag';

vi.mock('@/services/gliders');

const delayed: GliderMission = {
  id: 'LizardSlope20210317@5.01',
  mission_name: 'LizardSlope20210317',
  glider_id: 'SL502',
  is_nrt: false,
  visualisations: {},
  image_history: {
    '12d': [
      { date: '2021-03-31T00:00:00', url: '/first.gif' },
      { date: '2021-03-31T12:00:00', url: '/second.gif' },
    ],
  },
};
const nrt = { ...delayed, id: 'LizardSlope20210317_nrt@5.', mission_name: 'LizardSlope20210317_nrt', is_nrt: true };

beforeEach(() => vi.resetAllMocks());

it('matches a historical tag and chooses the nearest frame that day', async () => {
  vi.mocked(searchGliderMissions).mockResolvedValue([delayed, { ...nrt, glider_id: 'SL999' }]);
  vi.mocked(fetchGliderMissionById).mockResolvedValue(delayed);
  expect(await resolveImageTag('LizardSlope20210317', 'SL502', '202103311000')).toMatchObject({
    mission: { id: delayed.id },
    date: '2021033112',
  });
  expect(fetchGliderMissionById).toHaveBeenCalledTimes(1);
});

it('prefers NRT when both editions supply the same date and time', async () => {
  vi.mocked(searchGliderMissions).mockResolvedValue([delayed, nrt]);
  vi.mocked(fetchGliderMissionById).mockImplementation(async (id) => (id === nrt.id ? nrt : delayed));
  expect(await resolveImageTag(delayed.mission_name, 'SL502', '20210331')).toMatchObject({
    mission: { id: nrt.id },
    date: '2021033100',
  });
});

it('does not silently choose an ambiguous processing version or a different day', async () => {
  const other = { ...delayed, id: 'LizardSlope20210317@4.00' };
  vi.mocked(searchGliderMissions).mockResolvedValue([delayed, other]);
  vi.mocked(fetchGliderMissionById).mockImplementation(async (id) => (id === other.id ? other : delayed));
  expect(await resolveImageTag(delayed.mission_name, 'SL502', '20210331')).toEqual({
    reason: 'Unable to locate this glider mission.',
  });
  expect(await resolveImageTag(delayed.mission_name, 'SL502', '20210401')).toEqual({
    reason: 'No 12-day profile is available for this image date.',
  });
});
