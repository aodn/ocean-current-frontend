import { Navigate, type RouteObject } from 'react-router-dom';
import { Home, MapView, DataView, News, NotFound, GuidedTour } from '@/pages';
import MainLayout from '@/layouts/LandingLayout';
import MapLayout from '@/layouts/MapLayout';
import ProductLayout from '@/layouts/ProductLayout';

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
        element: <ProductLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="four-hour-sst/sst" replace />,
          },
          {
            path: 'four-hour-sst',
            element: <Navigate to="sst" replace />,
          },
          {
            path: '6-day-sst',
            element: <Navigate to="sst" replace />,
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
        element: <MapLayout />,
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
