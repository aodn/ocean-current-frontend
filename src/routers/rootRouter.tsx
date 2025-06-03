import { createBrowserRouter } from 'react-router';
import RootLayout from '@/layouts/RootLayout';
import routes from './routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: routes,
  },
]);

export default router;
