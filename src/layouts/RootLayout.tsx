import { Outlet } from 'react-router';
import { useScrollToTop } from '@/hooks';

const RootLayout = () => {
  useScrollToTop();

  return <Outlet />;
};

export default RootLayout;
