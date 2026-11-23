import type { GliderYearmap } from '@/types/gliders';

// Variable and window preferred for the initial map; year, platform and mode come from the published yearmaps.
export const GLIDERS_DEFAULT_LAYER: Pick<GliderYearmap, 'variable' | 'window'> = {
  variable: 'temp',
  window: '04d',
};

export const GLIDER_PLATFORM_LABELS = { sl: 'Slocum', sg: 'Seaglider' } as const;
export const GLIDER_MODE_LABELS = { nrt: 'NRT', delayed: 'Delayed' } as const;
