import { ProductID } from '@/types/product';

/**
 * Maps frontend product IDs to backend API product IDs for cases where they differ
 * If a product ID is not in this map, it means the frontend and backend IDs are identical
 */
export const FRONTEND_TO_API_ID_MAP: Partial<Record<ProductID, string>> = {
  // Current Meters mappings
  'currentMeters-mooredInstrumentArray': 'currentMetersPlot-48',
  'currentMeters-shelf': 'currentMetersPlot-49',
  'currentMeters-deepADCP': 'currentMetersCalendar-49',
  'currentMeters-deepADV': 'currentMetersPlot-48',
  'currentMeters-southernOcean': 'currentMetersRegion-48',
};

/**
 * Maps frontend region codes to backend API region codes for specific products
 * Only includes products where region mapping differs from the default
 */
export const FRONTEND_TO_API_REGION_MAP: Partial<Record<ProductID, Record<string, string>>> = {
  'adjustedSeaLevelAnomaly-sst': {
    Au: 'ht',
  },
};

/**
 * Gets the corresponding API product ID for a given frontend product ID
 * @param frontendProductId The product ID used in the frontend
 * @returns The corresponding product ID to use in API requests
 */
export function getApiProductId(frontendProductId: ProductID): string {
  return FRONTEND_TO_API_ID_MAP[frontendProductId] || frontendProductId;
}

/**
 * Gets the corresponding API region code for a given frontend region and product
 * @param frontendRegion The region code used in the frontend
 * @param productId The product ID
 * @returns The corresponding region code to use in API requests
 */
export function getApiRegionCode(frontendRegion: string, productId: ProductID): string {
  return FRONTEND_TO_API_REGION_MAP[productId]?.[frontendRegion] || frontendRegion;
}
