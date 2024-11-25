import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
};

export default useScrollToTop;
