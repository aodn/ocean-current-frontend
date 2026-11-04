import type { GliderYearmap } from '@/types/gliders';

// Variable and window preferred for the initial map; year, platform and mode come from the published yearmaps.
export const GLIDERS_DEFAULT_LAYER: Pick<GliderYearmap, 'variable' | 'window'> = {
  variable: 'temp',
  window: '04d',
};
