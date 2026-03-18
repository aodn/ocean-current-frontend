import { ProductGroupID } from '@/types/product';

/**
 * This file defines the default sub-product paths for each main product ID.
 * It's used by both the router configuration and product utility functions
 * to ensure consistency between URL redirects and product ID mapping.
 */

export const DEFAULT_SUB_PRODUCT_ROUTES: Record<ProductGroupID, string> = {
  fourHourSst: 'sst',
  sixDaySst: 'sst',
  oceanColour: 'chl-a',
  adjustedSeaLevelAnomaly: 'sla',
  monthlyMeans: '30-day',
  climatology: 'sst',
  tidalCurrents: 'speed',
  currentMeters: 'moored-instrument-array',
  sealCtd: 'tracks',
  sealCtdTags: 'timeseries',
  surfaceWaves: 'wave',
  swotGsla: 'ssh',
};
