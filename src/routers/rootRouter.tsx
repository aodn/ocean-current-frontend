import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import routes from './routes';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      children: routes,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  },
);

export default router;
