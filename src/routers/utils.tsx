import { Navigate, type RouteObject } from 'react-router';
import { DEFAULT_SUB_PRODUCT_ROUTES } from '@/configs/products/default-routes';
import { ProductGroupID } from '@/types/product';
import { getProductByIdFromFlat } from '@/utils/product-utils/product';

/**
 * Creates redirect routes for products based on their default sub-product paths
 * @returns Array of route objects with redirects for each product
 */
export const createProductRedirects = (): RouteObject[] => {
  const redirects: RouteObject[] = [];

  Object.entries(DEFAULT_SUB_PRODUCT_ROUTES).forEach(([productId, subProductPath]) => {
    const product = getProductByIdFromFlat(productId as ProductGroupID);
    if (product) {
      redirects.push({
        path: product.path,
        element: <Navigate to={`${subProductPath}`} replace />,
      });
    }
  });

  return redirects;
};
