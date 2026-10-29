import missionFixture from '@/pages/GlidersMap/fixtures/missions-2026-nrt.json';
import { GLIDERS_MVP_FILTERS } from '@/configs/products/gliders-map-mvp';
import { apiClient } from './httpClient';
import { fetchGliderMissions } from './gliders';

describe('Gliders missions API', () => {
  afterEach(() => vi.restoreAllMocks());

  it('requests only the selected year/mode partition through the shared API client', async () => {
    const get = vi.spyOn(apiClient, 'get').mockResolvedValue({ data: missionFixture });
    const signal = new AbortController().signal;
    const result = await fetchGliderMissions(GLIDERS_MVP_FILTERS, signal);
    expect(result).toHaveLength(12);
    expect(get).toHaveBeenCalledWith('/gliders/missions', {
      params: { q: '2026', nrt: true, page: 0, size: 100 },
      signal,
    });
    expect(result[0]).toMatchObject({ mission_name: 'TwoRocks20261028_nrt', latitude: -31.86, longitude: 115.61 });
  });

  it('handles pagination within the partition and filters other platforms', async () => {
    const mission = missionFixture.missions[0];
    const get = vi
      .spyOn(apiClient, 'get')
      .mockResolvedValueOnce({
        data: { missions: Array.from({ length: 100 }, () => mission), total: 101 },
      })
      .mockResolvedValueOnce({
        data: { missions: [{ ...mission, glider_id: 'SG123' }], total: 101 },
      });
    expect(await fetchGliderMissions(GLIDERS_MVP_FILTERS)).toHaveLength(100);
    expect(get.mock.calls[1][1]?.params.page).toBe(1);
  });

  it.each([
    {},
    { missions: [], total: -1 },
    { missions: [], total: 1001 },
    { missions: [{ mission_name: 'bad', latitude: 'south', longitude: 150 }], total: 1 },
    { missions: [], total: 101 },
  ])('rejects invalid or incomplete API responses', async (data) => {
    vi.spyOn(apiClient, 'get').mockResolvedValue({ data });
    await expect(fetchGliderMissions(GLIDERS_MVP_FILTERS)).rejects.toThrow();
  });
});
