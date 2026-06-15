export interface FishSoopRegion {
  code: string;
  regNo: number;
  title: string;
}

export const FISHSOOP_REGIONS: FishSoopRegion[] = [
  { code: 'Darwin', regNo: 1, title: 'Darwin' },
  { code: 'Kimberley', regNo: 2, title: 'Kimberley' },
  { code: 'NWS', regNo: 3, title: 'NW Shelf' },
  { code: 'SharkBay', regNo: 4, title: 'Shark Bay' },
  { code: 'Perth', regNo: 5, title: 'Perth' },
  { code: 'AlbEsp', regNo: 6, title: 'Albany-Esperance' },
  { code: 'RechEyre', regNo: 7, title: 'Esperance-Eyre Pen.' },
  { code: 'SAgulfs', regNo: 8, title: 'SA gulfs' },
  { code: 'BassStr', regNo: 9, title: 'Bass Strait' },
  { code: 'TasW', regNo: 10, title: 'Tasmania-west' },
  { code: 'TasE', regNo: 11, title: 'Tasmania-east' },
  { code: 'SNSW', regNo: 12, title: 'Southern NSW' },
  { code: 'NNSW', regNo: 13, title: 'Northern NSW' },
  { code: 'SGBR', regNo: 14, title: 'Southern GBR' },
  { code: 'CGBR', regNo: 15, title: 'Central GBR' },
  { code: 'NGBR', regNo: 16, title: 'Northern GBR' },
  { code: 'GOC', regNo: 17, title: 'Gulf of Carpentaria' },
  { code: 'Au', regNo: 18, title: 'Australia' },
];

export const getFishSoopRegionByCode = (code: string | null): FishSoopRegion | undefined =>
  FISHSOOP_REGIONS.find((region) => region.code === code);

export const FISHSOOP_LAYER_DEPTHS: Record<number, string> = {
  1: '0–50 m',
  2: '25–125 m',
  3: '75–275 m',
  4: '175–450 m',
  5: '325–625 m',
  6: '500–800 m',
  7: '700–1000 m',
  8: '0–1000 m',
};

/** Pseudo region id for the "Average (whole dataset)" entry in the Quarterly Anomalies region dropdown. */
export const FISHSOOP_AVERAGE_REGION_ID = 'avg';
export const FISHSOOP_AVERAGE_REGION_LABEL = 'Average (whole dataset)';

/** Date of the earliest finder map GIF on the file server (`fishsoop/maps/2021/20211120.gif`). */
// TODO: Eventually this should be replaced with an API call that lists available dates, but for now hardcode the known start date of the finder maps to avoid offering date options that have no data.
export const FISHSOOP_FINDER_START_DATE = '20211120';

export const FISHSOOP_FINDER_MAP_NATURAL_SIZE = { width: 990, height: 820 };

export interface FishSoopFinderArea {
  code: string;
  /** Pixel rect [x1, y1, x2, y2] relative to the finder GIF natural size. */
  coords: [number, number, number, number];
}

/**
 * Clickable region rects on the finder GIF, from the legacy imagemap
 * (php-server/fishsoop/maps/2026/latest.html). The Au region has no rect —
 * the finder itself is the Au-scope view.
 */
export const FISHSOOP_FINDER_MAP_AREAS: FishSoopFinderArea[] = [
  { code: 'Darwin', coords: [367, 52, 495, 219] },
  { code: 'Kimberley', coords: [250, 111, 367, 258] },
  { code: 'NWS', coords: [110, 209, 276, 336] },
  { code: 'SharkBay', coords: [57, 326, 153, 463] },
  { code: 'Perth', coords: [57, 463, 180, 619] },
  { code: 'AlbEsp', coords: [171, 541, 320, 649] },
  { code: 'RechEyre', coords: [320, 508, 495, 641] },
  { code: 'SAgulfs', coords: [486, 522, 626, 698] },
  { code: 'BassStr', coords: [670, 629, 749, 703] },
  { code: 'TasW', coords: [618, 639, 714, 768] },
  { code: 'TasE', coords: [714, 629, 828, 768] },
  { code: 'SNSW', coords: [770, 512, 880, 629] },
  { code: 'NNSW', coords: [810, 414, 915, 522] },
  { code: 'SGBR', coords: [756, 287, 898, 416] },
  { code: 'CGBR', coords: [688, 179, 828, 310] },
  { code: 'NGBR', coords: [618, 62, 802, 189] },
  { code: 'GOC', coords: [477, 52, 635, 248] },
];

export interface FishSoopAnomFile {
  name: string;
  isAvg: boolean;
  avgPage?: number;
  regNo?: number;
  region?: string;
  quarter?: string;
  layer?: number;
}

const AVG_FILE_REGEX = /^tanom_avg_p(\d+)\.gif$/;
const ANOM_FILE_REGEX = /^tanom_reg(\d{2})_([A-Za-z]+)_(?:(\d{4}Q[1-4])_)?layer(\d+)\.gif$/;

/**
 * Parses anomaly gif filenames as indexed by the API:
 * `tanom_reg<NN>_<Region>_<YYYYQn>_layer<L>.gif` (quarterly),
 * `tanom_reg<NN>_<Region>_layer<L>.gif` (depth) and `tanom_avg_p<N>.gif` (average pages).
 * Returns null for unrecognised names.
 */
export const parseAnomFileName = (name: string): FishSoopAnomFile | null => {
  const avgMatch = AVG_FILE_REGEX.exec(name);
  if (avgMatch) {
    return { name, isAvg: true, avgPage: Number(avgMatch[1]) };
  }

  const anomMatch = ANOM_FILE_REGEX.exec(name);
  if (anomMatch) {
    return {
      name,
      isAvg: false,
      regNo: Number(anomMatch[1]),
      region: anomMatch[2],
      quarter: anomMatch[3],
      layer: Number(anomMatch[4]),
    };
  }

  return null;
};
