import { lazy, Suspense } from 'react';
import { Navigate, type RouteObject } from 'react-router';
import { Home, MapView, DataView, ErrorPage, AboutView, InfoView } from '@/pages';
import { MainLayout, MapLayout, DataVisualisationLayout, ArticleLayout } from '@/layouts';
import Loading from '@/components/Shared/Loading/Loading';
import { createProductRedirects, NewsPhpRedirect } from './utils';
import { APP_ROUTES } from './appRoutes';

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
    path: '*',
    element: <ErrorPage />,
  },
];

export default routes;
