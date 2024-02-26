import type { RouteObject } from 'react-router-dom';
import { Home, MapView, News, NotFound } from '@/pages';
import RootLayout from '@/layouts/RootLayout';
import GuidedTour from '@/pages/GuidedTour';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
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
