import { useLocation } from 'react-router';
import { AppRoute, APP_ROUTES } from '@/routers/routes';

/**
 * Hook to detect the current page type based on the route
 */
export function useCurrentPage(): AppRoute {
  const location = useLocation();

  if (location.pathname === APP_ROUTES.HOME) return '/';
  if (location.pathname.startsWith(APP_ROUTES.PRODUCT)) return '/product';
  if (location.pathname.startsWith(APP_ROUTES.MAP)) return '/map';

  return '/404';
}
