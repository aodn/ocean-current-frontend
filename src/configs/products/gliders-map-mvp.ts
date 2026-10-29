import type { GliderMissionFilters } from '@/types/gliders';

// MVP scope: the twelve deployments on the verified 2026 Slocum NRT source map.
export const GLIDERS_MVP_FILTERS: GliderMissionFilters = {
  platform: 'sl',
  year: '2026',
  mode: 'nrt',
};

// Width/height in degrees, fixed from the original source selection rectangles.
// Source calibration: 2026 Slocum NRT, checked 29 October 2026.
// These are display marker sizes, not scientific trajectory bounds.
// Centres come from the API; HTML, GIFs and runtime calibration are not used.
export const GLIDERS_MVP_RECTANGLE_SIZES: Record<string, { width: number; height: number }> = {
  TasEastCoast20260811_nrt: {
    width: 1.62164429,
    height: 2.26911104,
  },
  TasEastCoast20260922_nrt: {
    width: 1.62164429,
    height: 2.8363888,
  },
  Esperance20260526_nrt: {
    width: 2.16219238,
    height: 1.57577155,
  },
  ForsterA20260909_nrt: {
    width: 2.47107701,
    height: 2.77335794,
  },
  Ceduna20260924_nrt: {
    width: 1.62164429,
    height: 2.71032707,
  },
  Forster20260909_nrt: {
    width: 1.15831735,
    height: 1.07152466,
  },
  TwoRocks20260730_nrt: {
    width: 1.38998082,
    height: 1.26061724,
  },
  TwoRocks20261028_nrt: {
    width: 1.00387503,
    height: 1.13455552,
  },
  TwoRocksA20260910_nrt: {
    width: 1.2355385,
    height: 1.32364811,
  },
  CapricornChannel20260723_nrt: {
    width: 1.7760866,
    height: 2.01698759,
  },
  MissionBeach20261022_nrt: {
    width: 1.15831735,
    height: 1.13455552,
  },
  Groote_Eylandt20261027_nrt: {
    width: 1.15831735,
    height: 1.07152466,
  },
};
