import { useLocation } from 'react-router';
import { UrlType } from '@/types/router';

const useUrlType = (): UrlType => {
  const location = useLocation();
  const firstSegment = location.pathname.split('/').filter(Boolean)[0];
  if (firstSegment === 'map') return 'map';
  if (firstSegment === 'about') return 'about';
  return 'product';
};

export default useUrlType;
