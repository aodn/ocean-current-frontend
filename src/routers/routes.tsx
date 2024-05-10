import { Navigate, type RouteObject } from 'react-router-dom';
import { Home, MapView, DataView, News, NotFound, GuidedTour } from '@/pages';
import MainLayout from '@/layouts/MainLayout';
import MapLayout from '@/layouts/MapLayout';

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
        element: <MapLayout type="product" />,
        children: [
          {
            index: true,
            element: <Navigate to="four-hour-sst/sst" replace />,
          },
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
        element: <MapLayout type="map" />,
        children: [
          {
            index: true,
            element: <Navigate to="four-hour-sst/sst" replace />,
          },
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
        path: '/news',
        element: <News />,
      },
      {
        path: '/guided-tour',
        element: <GuidedTour />,
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
