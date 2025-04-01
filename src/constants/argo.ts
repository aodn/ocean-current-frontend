import { ArgoTagPath } from '@/types/argo';

export enum ArgoDepths {
  '400M' = '0-400m',
  '2000M' = '0-2000m',
}

export const argoTagFilePaths: ArgoTagPath = {
  // TODO: implement after json files are available
  // 'fourHourSst-sstFilled': {
  //   state: null,
  //   local: 'SST_4hr',
  // },
  // 'fourHourSst-sst': {
  //   state: null,
  //   local: 'SST_4hr',
  // },
  // 'fourHourSst-sstAge': {
  //   state: null,
  //   local: 'SST_4hr',
  // },
  // 'fourHourSst-windSpeed': {
  //   state: null,
  //   local: 'SST_4hr',
  // },
  'sixDaySst-sst': {
    state: 'STATE_daily',
    local: 'DR_SST_daily',
  },
  'sixDaySst-sstAnomaly': {
    state: 'STATE_daily',
    local: 'DR_SST_daily',
  },
  'sixDaySst-centiles': {
    state: 'STATE_daily',
    local: 'DR_SST_daily',
  },
  'adjustedSeaLevelAnomaly-sla': {
    state: 'STATE_daily',
    local: null,
  },
  'adjustedSeaLevelAnomaly-centiles': {
    state: 'STATE_daily',
    local: null,
  },
  'oceanColour-chlA': {
    state: 'STATE_daily',
    local: 'SnapshotCHL',
  },
  'oceanColour-chlAAge': {
    state: 'STATE_daily',
    local: null,
  },
  EACMooringArray: {
    state: null,
    local: 'EAC_array_figures',
  },
};
