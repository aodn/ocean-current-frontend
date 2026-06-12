import { FISHSOOP_REGIONS, FishSoopAnomFile, parseAnomFileName } from '@/constants/fishSoop';
import { ImageListResponse } from '@/types/imageList';

/** A parsed anomaly gif together with the server path it lives under (e.g. '/fishsoop/anom2'). */
export interface FishSoopAnomalyEntry extends FishSoopAnomFile {
  path: string;
}

export interface FishSoopAnomalySelection {
  mode: 'region' | 'average';
  region: string;
  quarter: string;
  layer: string;
  avgPage: string;
}

export interface ResolvedFishSoopAnomaly {
  /** Region codes present in the list, in legacy `reg##` order. */
  regionOptions: string[];
  /** Quarters available for the resolved region, latest first (quarterly product only). */
  quarterOptions: string[];
  /** Layers available for the resolved region (and quarter), ascending. */
  layerOptions: number[];
  /** Average-overview pages available, ascending (quarterly product only). */
  avgPageOptions: number[];
  region: string;
  quarter: string;
  layer: number | null;
  avgPage: number | null;
  /** The list entry matching the resolved selection, if any. */
  entry: FishSoopAnomalyEntry | null;
}

/** Flattens an API image-list response into parsed anomaly entries, dropping unrecognised names. */
export const parseFishSoopAnomalyImageList = (imageList: ImageListResponse[]): FishSoopAnomalyEntry[] =>
  imageList.flatMap((group) =>
    group.files.flatMap((file) => {
      const parsed = parseAnomFileName(file.name);
      return parsed ? [{ ...parsed, path: group.path }] : [];
    }),
  );

const regionOrder = new Map(FISHSOOP_REGIONS.map((region, index) => [region.code, index]));

/**
 * Resolves a (possibly stale or empty) selection against the available anomaly
 * entries: invalid values fall back to defaults (region 'Au' if present, latest
 * quarter, shallowest layer, first average page) so only existing combinations
 * are ever offered or requested.
 */
export const resolveFishSoopAnomaly = (
  entries: FishSoopAnomalyEntry[],
  selection: FishSoopAnomalySelection,
): ResolvedFishSoopAnomaly => {
  const regionEntries = entries.filter((entry) => !entry.isAvg);
  const avgEntries = entries.filter((entry) => entry.isAvg);

  const regionOptions = [...new Set(regionEntries.map((entry) => entry.region!))].sort(
    (a, b) => (regionOrder.get(a) ?? Number.MAX_SAFE_INTEGER) - (regionOrder.get(b) ?? Number.MAX_SAFE_INTEGER),
  );
  const avgPageOptions = [...new Set(avgEntries.map((entry) => entry.avgPage!))].sort((a, b) => a - b);

  if (selection.mode === 'average') {
    const selectedPage = Number(selection.avgPage);
    const avgPage = avgPageOptions.includes(selectedPage) ? selectedPage : (avgPageOptions[0] ?? null);

    return {
      regionOptions,
      quarterOptions: [],
      layerOptions: [],
      avgPageOptions,
      region: selection.region,
      quarter: '',
      layer: null,
      avgPage,
      entry: avgEntries.find((entry) => entry.avgPage === avgPage) ?? null,
    };
  }

  const fallbackRegion = regionOptions.includes('Au') ? 'Au' : (regionOptions[0] ?? '');
  const region = regionOptions.includes(selection.region) ? selection.region : fallbackRegion;
  const entriesForRegion = regionEntries.filter((entry) => entry.region === region);

  // Quarterly entries carry a quarter; depth entries don't, so quarterOptions stays empty.
  const quarterOptions = [...new Set(entriesForRegion.flatMap((entry) => (entry.quarter ? [entry.quarter] : [])))].sort(
    (a, b) => b.localeCompare(a),
  );
  const quarter = quarterOptions.includes(selection.quarter) ? selection.quarter : (quarterOptions[0] ?? '');

  const entriesForQuarter = quarter ? entriesForRegion.filter((entry) => entry.quarter === quarter) : entriesForRegion;
  const layerOptions = [...new Set(entriesForQuarter.map((entry) => entry.layer!))].sort((a, b) => a - b);
  const selectedLayer = Number(selection.layer);
  const layer = layerOptions.includes(selectedLayer) ? selectedLayer : (layerOptions[0] ?? null);

  return {
    regionOptions,
    quarterOptions,
    layerOptions,
    avgPageOptions,
    region,
    quarter,
    layer,
    avgPage: null,
    entry: entriesForQuarter.find((entry) => entry.layer === layer) ?? null,
  };
};
