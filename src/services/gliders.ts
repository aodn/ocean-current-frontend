import type { GliderMission, GliderYearmap, GliderYearmapsResponse } from '@/types/gliders';
import { apiClient, ec2ProxyClient } from './httpClient';

export async function fetchGliderYearmaps(signal?: AbortSignal): Promise<GliderYearmap[]> {
  const { data } = await ec2ProxyClient.get<GliderYearmapsResponse>('/api/gliders/gliders-yearmaps.json', { signal });
  if (data?.schema_version !== 1 || !Array.isArray(data.maps)) {
    throw new Error('Unsupported Gliders yearmaps response');
  }
  return data.maps;
}

/** Match the exact published name; the API's search is a paginated substring search. */
export async function fetchGliderMission(missionName: string, signal?: AbortSignal): Promise<GliderMission> {
  const matches: GliderMission[] = [];
  let page = 0;
  let total: number;
  do {
    const { data } = await apiClient.get<{ missions: GliderMission[]; total: number }>('/gliders/missions', {
      params: { q: missionName, size: 100, page },
      signal,
    });
    matches.push(...data.missions.filter(({ mission_name }) => mission_name === missionName));
    total = data.total;
    page += 1;
  } while (page * 100 < total);
  if (matches.length !== 1) throw new Error(`Expected one mission for ${missionName}; found ${matches.length}`);
  return matches[0];
}

export async function fetchGliderMissionById(id: string, signal?: AbortSignal): Promise<GliderMission> {
  const { data } = await apiClient.get<GliderMission>(`/gliders/missions/${encodeURIComponent(id)}`, { signal });
  return data;
}

/** Fetch the catalogue once for table metadata, rather than resolving each deployment separately. */
export async function fetchGliderMissions(signal?: AbortSignal): Promise<GliderMission[]> {
  const missions: GliderMission[] = [];
  let page = 0;
  let total: number;
  do {
    const { data } = await apiClient.get<{ missions: GliderMission[]; total: number }>('/gliders/missions', {
      params: { size: 100, page },
      signal,
    });
    if (!data || !Array.isArray(data.missions) || !Number.isSafeInteger(data.total) || data.total < 0) {
      throw new Error('Invalid Gliders catalogue response');
    }
    if (!data.missions.length && missions.length < data.total) throw new Error('Incomplete Gliders catalogue page');
    missions.push(...data.missions);
    total = data.total;
    page += 1;
  } while (missions.length < total);
  return missions;
}
