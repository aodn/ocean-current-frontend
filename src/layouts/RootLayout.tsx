import { Outlet } from 'react-router-dom';
import { useScrollToTop } from '@/hooks';

const RootLayout = () => {
  useScrollToTop();

  return <Outlet />;
};

export default RootLayout;
