import { useEffect } from 'react';
import { useLocation } from 'react-router';

const useScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;

    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } catch {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
};

export default useScrollToTop;
