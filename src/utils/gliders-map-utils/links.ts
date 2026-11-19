import { featureFlags } from '@/configs/featureFlags';

export const GLIDERS_COMING_SOON = '/coming-soon?product=gliders';

export const glidersHref = (href: string) => (featureFlags.gliders ? href : GLIDERS_COMING_SOON);

export function gliderProfileHref(missionId: string, window: string, date?: string) {
  const params = new URLSearchParams({ missionId, window });
  if (date) params.set('date', date);
  return glidersHref(`/product/gliders?${params}`);
}

export function copyGliderTsIndexFilters(source: URLSearchParams, target: URLSearchParams) {
  for (const key of ['platform', 'mode', 'startDate', 'endDate']) {
    const value = source.get(key);
    if (value) target.set(key, value);
  }
  return target;
}
