import { useLocation } from 'react-router';
import { AppRoute, APP_ROUTES } from '@/routers/routes';

/**
 * Hook to detect the current page type based on the route
 */
export function useCurrentPage(): AppRoute {
  const location = useLocation();

  if (location.pathname === APP_ROUTES.HOME) return APP_ROUTES.HOME;
  if (location.pathname.startsWith(APP_ROUTES.PRODUCT)) return APP_ROUTES.PRODUCT;
  if (location.pathname.startsWith(APP_ROUTES.MAP)) return APP_ROUTES.MAP;

  return APP_ROUTES.NOT_FOUND;
}
