import { Navigate, type RouteObject } from 'react-router';
import { Home, MapView, DataView, NotFound } from '@/pages';
import MainLayout from '@/layouts/MainLayout';
import MapLayout from '@/layouts/MapLayout';
import DataVisualisationLayout from '@/layouts/DataVisualisationLayout';
import { createProductRedirects } from './utils';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/product',
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
        path: '/map',
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
    ],
  },

  {
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
