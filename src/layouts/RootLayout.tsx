import { Outlet } from 'react-router-dom';
import useScrollToTop from '@/hooks/useScrollToTop/useScrollToTop';

const RootLayout = () => {
  useScrollToTop();

  return <Outlet />;
};

export default RootLayout;
