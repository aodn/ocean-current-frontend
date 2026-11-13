import { lazy, Suspense } from 'react';
import { Navigate, type RouteObject } from 'react-router';
import { featureFlags } from '@/configs/featureFlags';
import { Home, MapView, DataView, ErrorPage, ComingSoonPage, AboutView, InfoView } from '@/pages';
import { MainLayout, MapLayout, DataVisualisationLayout, ArticleLayout } from '@/layouts';
import Loading from '@/components/Shared/Loading/Loading';
import { createProductRedirects, NewsPhpRedirect } from './utils';
import { APP_ROUTES } from './appRoutes';

const GliderMission = lazy(() => import('@/pages/GliderMission/GliderMission'));
const GlidersMap = lazy(() => import('@/pages/GlidersMap/GlidersMap'));

const NewsLayout = lazy(() => import('@/layouts/NewsLayout'));
const News = lazy(() => import('@/pages/News/News'));

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
            path: 'gliders',
            element: (
              <Suspense fallback={<Loading />}>
                {featureFlags.gliders ? <GliderMission /> : <Navigate to={APP_ROUTES.NOT_FOUND} replace />}
              </Suspense>
            ),
          },
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
            path: 'gliders',
            element: (
              <Suspense fallback={<Loading />}>
                {featureFlags.gliders ? <GlidersMap /> : <Navigate to={APP_ROUTES.NOT_FOUND} replace />}
              </Suspense>
            ),
          },
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
        element: <ArticleLayout />,
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
        path: APP_ROUTES.INFO,
        element: <ArticleLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={APP_ROUTES.NOT_FOUND} replace />,
          },
          {
            path: ':slug',
            element: <InfoView />,
          },
        ],
      },
      {
        path: APP_ROUTES.NEWS,
        element: (
          <Suspense fallback={<Loading fullPage />}>
            <NewsLayout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: <News />,
          },
        ],
      },
    ],
  },
  {
    path: '/news.php',
    element: <NewsPhpRedirect />,
  },
  {
    path: APP_ROUTES.NOT_FOUND,
    element: <ErrorPage />,
  },
  {
    path: APP_ROUTES.COMING_SOON,
    element: <ComingSoonPage />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
];

export default routes;
