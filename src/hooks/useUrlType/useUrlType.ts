import { useLocation } from 'react-router';
import { UrlType } from '@/types/router';

const useUrlType = (): UrlType => {
  const location = useLocation();
  const firstSegment = location.pathname.split('/').filter(Boolean)[0];
  return firstSegment === 'map' ? 'map' : 'product';
};

export default useUrlType;
