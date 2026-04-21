import { Navigate, type RouteObject } from 'react-router';
import { Home, MapView, DataView, ErrorPage, AboutView } from '@/pages';
import MainLayout from '@/layouts/MainLayout';
import MapLayout from '@/layouts/MapLayout';
import DataVisualisationLayout from '@/layouts/DataVisualisationLayout';
import AboutLayout from '@/layouts/AboutLayout';
import { HiddenArchivedNews } from '@/pages/HiddenArchivedNews/HiddenArchivedNews';
import { createProductRedirects } from './utils';
import { APP_ROUTES } from './appRoutes';

export { APP_ROUTES };
export type { AppRoute } from './appRoutes';

const routes: RouteObject[] = [
  {
    path: APP_ROUTES.HOME,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: APP_ROUTES.PRODUCT,
        element: <DataVisualisationLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="four-hour-sst/sst" replace />,
          },
          ...createProductRedirects(),
          {
            path: ':product/:subProduct',
            element: <DataView />,
          },
          {
            path: ':product',
            element: <DataView />,
          },
        ],
      },
      {
        path: APP_ROUTES.MAP,
        element: <MapLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="four-hour-sst/sst" replace />,
          },
          ...createProductRedirects(),
          {
            path: ':product/:subProduct',
            element: <MapView />,
          },
          {
            path: ':product',
            element: <MapView />,
          },
        ],
      },
      {
        path: APP_ROUTES.ABOUT,
        element: <AboutLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={APP_ROUTES.NOT_FOUND} replace />,
          },
          {
            path: ':product/:subProduct',
            element: <AboutView />,
          },
          {
            path: ':product',
            element: <AboutView />,
          },
        ],
      },
      {
        path: APP_ROUTES.NEWS,
        element: <HiddenArchivedNews />,
      },
    ],
  },

  {
    path: APP_ROUTES.NOT_FOUND,
    element: <ErrorPage />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
];

export default routes;
