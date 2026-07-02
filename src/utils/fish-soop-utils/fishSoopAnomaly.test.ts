import { describe, expect, it } from 'vitest';
import { parseAnomFileName } from '@/constants/fishSoop';
import { ImageListResponse } from '@/types/imageList';
import { parseFishSoopAnomalyImageList, resolveFishSoopAnomaly, FishSoopAnomalySelection } from './fishSoopAnomaly';

describe('parseAnomFileName', () => {
  it('parses quarterly anomaly filenames', () => {
    expect(parseAnomFileName('tanom_reg11_TasE_2025Q2_layer3.gif')).toEqual({
      name: 'tanom_reg11_TasE_2025Q2_layer3.gif',
      isAvg: false,
      regNo: 11,
      region: 'TasE',
      quarter: '2025Q2',
      layer: 3,
    });
  });

  it('parses depth anomaly filenames (no quarter)', () => {
    expect(parseAnomFileName('tanom_reg18_Au_layer8.gif')).toEqual({
      name: 'tanom_reg18_Au_layer8.gif',
      isAvg: false,
      regNo: 18,
      region: 'Au',
      quarter: undefined,
      layer: 8,
    });
  });

  it('parses whole-dataset average pages', () => {
    expect(parseAnomFileName('tanom_avg_p2.gif')).toEqual({
      name: 'tanom_avg_p2.gif',
      isAvg: true,
      avgPage: 2,
    });
  });

  it('returns null for unrecognised names', () => {
    expect(parseAnomFileName('index.html')).toBeNull();
    expect(parseAnomFileName('20260609.gif')).toBeNull();
  });
});

const quarterlyImageList: ImageListResponse[] = [
  {
    path: '/fishsoop/anom2',
    productId: 'fishSOOP-quarterlyAnomalies',
    region: '',
    files: [
      { name: 'tanom_reg11_TasE_2025Q1_layer1.gif' },
      { name: 'tanom_reg11_TasE_2025Q2_layer1.gif' },
      { name: 'tanom_reg11_TasE_2025Q2_layer3.gif' },
      { name: 'tanom_reg18_Au_2025Q2_layer8.gif' },
      { name: 'tanom_reg01_Darwin_2024Q4_layer1.gif' },
      { name: 'tanom_avg_p1.gif' },
      { name: 'tanom_avg_p2.gif' },
      { name: 'not-an-anomaly.gif' },
    ],
  },
];

const selection = (overrides: Partial<FishSoopAnomalySelection>): FishSoopAnomalySelection => ({
  mode: 'region',
  region: '',
  quarter: '',
  layer: '',
  avgPage: '',
  ...overrides,
});

describe('parseFishSoopAnomalyImageList', () => {
  it('flattens the list, keeps the path and drops unrecognised names', () => {
    const entries = parseFishSoopAnomalyImageList(quarterlyImageList);
    expect(entries).toHaveLength(7);
    expect(entries.every((entry) => entry.path === '/fishsoop/anom2')).toBe(true);
  });
});

describe('resolveFishSoopAnomaly', () => {
  const entries = parseFishSoopAnomalyImageList(quarterlyImageList);

  it('resolves a valid region/quarter/layer selection to the matching entry', () => {
    const resolved = resolveFishSoopAnomaly(entries, selection({ region: 'TasE', quarter: '2025Q2', layer: '3' }));
    expect(resolved.entry?.name).toBe('tanom_reg11_TasE_2025Q2_layer3.gif');
    expect(resolved.quarterOptions).toEqual(['2025Q2', '2025Q1']);
    expect(resolved.layerOptions).toEqual([1, 3]);
  });

  it('orders regions in legacy reg## order', () => {
    const resolved = resolveFishSoopAnomaly(entries, selection({}));
    expect(resolved.regionOptions).toEqual(['Darwin', 'TasE', 'Au']);
  });

  it('falls back to Au, the latest quarter and the shallowest layer for invalid selections', () => {
    const resolved = resolveFishSoopAnomaly(entries, selection({ region: 'Nowhere', quarter: '1999Q1', layer: '9' }));
    expect(resolved.region).toBe('Au');
    expect(resolved.quarter).toBe('2025Q2');
    expect(resolved.layer).toBe(8);
    expect(resolved.entry?.name).toBe('tanom_reg18_Au_2025Q2_layer8.gif');
  });

  it('only offers quarters and layers that exist for the selected region', () => {
    const resolved = resolveFishSoopAnomaly(entries, selection({ region: 'Darwin' }));
    expect(resolved.quarterOptions).toEqual(['2024Q4']);
    expect(resolved.layerOptions).toEqual([1]);
  });

  it('resolves average mode to the requested overview page', () => {
    const resolved = resolveFishSoopAnomaly(entries, selection({ mode: 'average', avgPage: '2' }));
    expect(resolved.entry?.name).toBe('tanom_avg_p2.gif');
    expect(resolved.avgPageOptions).toEqual([1, 2]);
  });

  it('falls back to the first average page when the requested page does not exist', () => {
    const resolved = resolveFishSoopAnomaly(entries, selection({ mode: 'average', avgPage: '7' }));
    expect(resolved.entry?.name).toBe('tanom_avg_p1.gif');
  });

  it('resolves depth anomaly selections without quarters', () => {
    const depthEntries = parseFishSoopAnomalyImageList([
      {
        path: '/fishsoop/anom',
        productId: 'fishSOOP-depthAnomalies',
        region: '',
        files: [{ name: 'tanom_reg11_TasE_layer1.gif' }, { name: 'tanom_reg11_TasE_layer8.gif' }],
      },
    ]);
    const resolved = resolveFishSoopAnomaly(depthEntries, selection({ region: 'TasE', layer: '8' }));
    expect(resolved.quarterOptions).toEqual([]);
    expect(resolved.layerOptions).toEqual([1, 8]);
    expect(resolved.entry?.name).toBe('tanom_reg11_TasE_layer8.gif');
  });
});
