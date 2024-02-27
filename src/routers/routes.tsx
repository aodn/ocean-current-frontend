import type { RouteObject } from 'react-router-dom';
import { Home, MapView, News, NotFound, GuidedTour } from '@/pages';
import MainLayout from '@/layouts/MainLayout';

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
        path: '/map-view',
        element: <MapView />,
        children: [
          {
            path: ':product',
            element: <MapView />,
            children: [
              {
                path: ':subProduct',
                element: <MapView />,
              },
            ],
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
