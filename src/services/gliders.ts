import type { GliderYearmap, GliderYearmapsResponse } from '@/types/gliders';
import { ec2ProxyClient } from './httpClient';

export async function fetchGliderYearmaps(signal?: AbortSignal): Promise<GliderYearmap[]> {
  const { data } = await ec2ProxyClient.get<GliderYearmapsResponse>('/api/gliders-yearmaps.json', { signal });
  if (data?.schema_version !== 1 || !Array.isArray(data.maps)) {
    throw new Error('Unsupported Gliders yearmaps response');
  }
  return data.maps;
}
