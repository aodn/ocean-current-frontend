import type { GliderMission, GliderMissionFilters } from '@/types/gliders';
import { apiClient } from './httpClient';

/** Fetch only this map's year/mode partition, never the entire mission catalogue. */
export async function fetchGliderMissions(
  filters: GliderMissionFilters,
  signal?: AbortSignal,
): Promise<GliderMission[]> {
  const missions: GliderMission[] = [];
  for (let page = 0; ; page++) {
    const { data } = await apiClient.get<unknown>('/gliders/missions', {
      params: { q: filters.year, nrt: filters.mode === 'nrt', page, size: 100 },
      signal,
    });
    if (
      !data ||
      typeof data !== 'object' ||
      !('missions' in data) ||
      !Array.isArray(data.missions) ||
      !('total' in data) ||
      !Number.isInteger(data.total) ||
      Number(data.total) < 0 ||
      Number(data.total) > 1000
    ) {
      throw new Error('Invalid Gliders mission coordinate response');
    }
    for (const mission of data.missions) {
      if (
        !mission ||
        typeof mission !== 'object' ||
        typeof mission.mission_name !== 'string' ||
        !['latitude', 'longitude'].every(
          (key) => mission[key] === null || (typeof mission[key] === 'number' && Number.isFinite(mission[key])),
        )
      ) {
        throw new Error('Invalid Gliders mission coordinates');
      }
      const prefix = filters.platform === 'sl' ? 'SL' : 'SG';
      if (
        typeof mission.glider_id === 'string' &&
        mission.glider_id.toUpperCase().startsWith(prefix) &&
        mission.is_nrt === (filters.mode === 'nrt')
      ) {
        missions.push({ mission_name: mission.mission_name, latitude: mission.latitude, longitude: mission.longitude });
      }
    }
    if ((page + 1) * 100 >= Number(data.total)) return missions;
    if (data.missions.length === 0) throw new Error('Incomplete Gliders mission coordinate response');
  }
}
