import dayjs from 'dayjs';
import { apiConfig } from '@/configs/api';
import { imageBaseUrl } from '@/configs/image';
import type { GliderMission, GliderYearmap } from '@/types/gliders';

/** Yearmaps include missions active in a year, including deployments that started the previous year. */
export function getGliderMissionFilters(mission: GliderMission, yearmaps: GliderYearmap[]) {
  const maps = yearmaps.filter(({ deployments }) =>
    deployments.some(({ mission_name }) => mission_name === mission.mission_name),
  );
  const prefix = mission.glider_id?.trim().slice(0, 2).toLowerCase();
  const platform = prefix === 'sl' || prefix === 'sg' ? prefix : maps[0]?.platform;
  const start = mission.start_date ? dayjs(mission.start_date) : undefined;
  const end = mission.end_date ? dayjs(mission.end_date) : start;
  const years =
    start?.isValid() && end?.isValid() && end.year() >= start.year()
      ? Array.from({ length: end.year() - start.year() + 1 }, (_, index) => start.year() + index)
      : [...new Set(maps.map(({ year }) => year))];
  return { years, platform };
}

/** Keep external scientific destinations intact and route legacy resources through the existing proxy. */
export function resolveGliderResourceUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  if (url.startsWith(`${apiConfig.ec2ProxyURL}/`)) return url;
  try {
    const resolved = new URL(url, imageBaseUrl);
    if (!['http:', 'https:'].includes(resolved.protocol)) return undefined;
    return resolved.host === new URL(imageBaseUrl).host
      ? `${apiConfig.ec2ProxyURL}${resolved.pathname}${resolved.search}${resolved.hash}`
      : resolved.href;
  } catch {
    return undefined;
  }
}
