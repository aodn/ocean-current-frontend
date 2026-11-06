import fixture from '@/pages/GlidersMap/fixtures/yearmaps.json';
import { apiClient, ec2ProxyClient } from './httpClient';
import { fetchGliderMission, fetchGliderMissionById, fetchGliderMissions, fetchGliderYearmaps } from './gliders';

const mission = { id: 'TwoRocks20261028_nrt@5.', mission_name: 'TwoRocks20261028_nrt', visualisations: {} };
afterEach(() => vi.restoreAllMocks());

it('matches the exact published name without a redundant detail request', async () => {
  const get = vi.spyOn(apiClient, 'get').mockResolvedValueOnce({
    data: { missions: [{ ...mission, mission_name: `${mission.mission_name}Extra` }, mission], total: 2 },
  });
  const signal = new AbortController().signal;
  expect(await fetchGliderMission(mission.mission_name, signal)).toEqual(mission);
  expect(get).toHaveBeenNthCalledWith(1, '/gliders/missions', {
    params: { q: mission.mission_name, size: 100, page: 0 },
    signal,
  });
  expect(get).toHaveBeenCalledTimes(1);
});

it.each([{ missions: [] }, { missions: [mission, { ...mission, id: `${mission.mission_name}@3.0.` }] }])(
  'rejects missing or ambiguous matches instead of guessing an ID',
  async ({ missions }) => {
    vi.spyOn(apiClient, 'get').mockResolvedValueOnce({ data: { missions, total: missions.length } });
    await expect(fetchGliderMission(mission.mission_name)).rejects.toThrow('Expected one mission');
  },
);

it('checks subsequent pages before choosing the exact match', async () => {
  const get = vi
    .spyOn(apiClient, 'get')
    .mockResolvedValueOnce({ data: { missions: [], total: 101 } })
    .mockResolvedValueOnce({ data: { missions: [mission], total: 101 } });
  expect(await fetchGliderMission(mission.mission_name)).toEqual(mission);
  expect(get.mock.calls[1][1]?.params.page).toBe(1);
});

describe('fetchGliderYearmaps', () => {
  it('fetches the published yearmaps through the resource client', async () => {
    const get = vi.spyOn(ec2ProxyClient, 'get').mockResolvedValue({ data: fixture });
    const signal = new AbortController().signal;
    expect(await fetchGliderYearmaps(signal)).toEqual(fixture.maps);
    expect(get).toHaveBeenCalledExactlyOnceWith('/api/gliders-yearmaps.json', { signal });
  });

  it.each([null, {}, { schema_version: 2, maps: [] }])('rejects unsupported responses: %o', async (data) => {
    vi.spyOn(ec2ProxyClient, 'get').mockResolvedValue({ data });
    await expect(fetchGliderYearmaps()).rejects.toThrow();
  });
});

it('fetches details with the encoded, unmodified versioned ID and cancellation', async () => {
  const get = vi.spyOn(apiClient, 'get').mockResolvedValue({ data: mission });
  const signal = new AbortController().signal;
  expect(await fetchGliderMissionById(mission.id, signal)).toEqual(mission);
  expect(get).toHaveBeenCalledExactlyOnceWith('/gliders/missions/TwoRocks20261028_nrt%405.', { signal });
});

it('loads all catalogue pages with cancellation for table metadata', async () => {
  const get = vi
    .spyOn(apiClient, 'get')
    .mockResolvedValueOnce({ data: { missions: [mission], total: 2 } })
    .mockResolvedValueOnce({ data: { missions: [{ ...mission, id: 'second' }], total: 2 } });
  const signal = new AbortController().signal;
  expect(await fetchGliderMissions(signal)).toEqual([mission, { ...mission, id: 'second' }]);
  expect(get).toHaveBeenNthCalledWith(1, '/gliders/missions', { params: { size: 100, page: 0 }, signal });
  expect(get).toHaveBeenNthCalledWith(2, '/gliders/missions', { params: { size: 100, page: 1 }, signal });
});
