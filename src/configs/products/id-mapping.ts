import { ProductID } from '@/types/product';

/**
 * Maps frontend product IDs to backend API product IDs for cases where they differ
 * If a product ID is not in this map, it means the frontend and backend IDs are identical
 */
export const FRONTEND_TO_API_ID_MAP: Partial<Record<ProductID, string>> = {
  // Current Meters mappings
  'currentMeters-mooredInstrumentArray': 'currentMetersPlot-49',
  'currentMeters-shelf': 'currentMetersRegion-49',
  'currentMeters-deepADCP': 'currentMetersCalendar-49',
  'currentMeters-deepADV': 'currentMetersPlot-48',
  'currentMeters-southernOcean': 'currentMetersRegion-48',
};

/**
 * Gets the corresponding API product ID for a given frontend product ID
 * @param frontendProductId The product ID used in the frontend
 * @returns The corresponding product ID to use in API requests
 */
export function getApiProductId(frontendProductId: ProductID): string {
  return FRONTEND_TO_API_ID_MAP[frontendProductId] || frontendProductId;
}
