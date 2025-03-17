import { Navigate, type RouteObject } from 'react-router-dom';
import { Home, MapView, DataView, NotFound } from '@/pages';
import MainLayout from '@/layouts/MainLayout';
import MapLayout from '@/layouts/MapLayout';
import DataVisualisationLayout from '@/layouts/DataVisualisationLayout';

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
          {
            path: 'four-hour-sst',
            element: <Navigate to="sst" replace />,
          },
          {
            path: '6-day-sst',
            element: <Navigate to="sst" replace />,
          },
          {
            path: 'ocean-colour',
            element: <Navigate to="chl-a" replace />,
          },
          {
            path: 'adjusted-sea-level-anomaly',
            element: <Navigate to="sla" replace />,
          },
          {
            path: 'monthly-means',
            element: <Navigate to="anomalies" replace />,
          },
          {
            path: 'climatology',
            element: <Navigate to="sst" replace />,
          },
          {
            path: 'tidal-currents',
            element: <Navigate to="speed" replace />,
          },
          {
            path: 'current-meters',
            element: <Navigate to="moored-instrument-array" replace />,
          },
          {
            path: 'seal-ctd',
            element: <Navigate to="tracks" replace />,
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
            path: 'four-hour-sst',
            element: <Navigate to="sst" replace />,
          },
          {
            path: '6-day-sst',
            element: <Navigate to="sst" replace />,
          },
          {
            path: 'ocean-colour',
            element: <Navigate to="chl-a" replace />,
          },
          {
            path: 'adjusted-sea-level-anomaly',
            element: <Navigate to="sla" replace />,
          },
          {
            path: 'monthly-means',
            element: <Navigate to="anomalies" replace />,
          },
          {
            path: 'climatology',
            element: <Navigate to="sst" replace />,
          },
          {
            path: 'tidal-currents',
            element: <Navigate to="speed" replace />,
          },
          {
            path: 'current-meters',
            element: <Navigate to="moored-instrument-array" replace />,
          },
          {
            path: 'seal-ctd',
            element: <Navigate to="tracks" replace />,
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
