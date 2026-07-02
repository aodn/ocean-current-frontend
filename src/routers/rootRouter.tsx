import { createBrowserRouter } from 'react-router';
import RootLayout from '@/layouts/RootLayout';
import { ErrorPage } from '@/pages';
import routes from './routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: routes,
  },
]);

export default router;
