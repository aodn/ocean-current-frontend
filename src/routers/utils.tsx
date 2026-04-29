import { Navigate, useLocation, type RouteObject } from 'react-router';
import { DEFAULT_SUB_PRODUCT_ROUTES } from '@/configs/products/default-routes';
import { ProductGroupID } from '@/types/product';
import { findFlatProductById } from '@/utils/product-utils/product';
import { APP_ROUTES } from './appRoutes';

/**
 * Creates redirect routes for products based on their default sub-product paths
 * @returns Array of route objects with redirects for each product
 */
export const createProductRedirects = (): RouteObject[] => {
  const redirects: RouteObject[] = [];

  Object.entries(DEFAULT_SUB_PRODUCT_ROUTES).forEach(([productId, subProductPath]) => {
    const product = findFlatProductById(productId as ProductGroupID);
    if (product) {
      redirects.push({
        path: product.path,
        element: <Navigate to={`${subProductPath}`} replace />,
      });
    }
  });

  return redirects;
};

export const NewsPhpRedirect = () => {
  const { hash } = useLocation();
  return <Navigate to={`${APP_ROUTES.NEWS}${hash}`} replace />;
};
