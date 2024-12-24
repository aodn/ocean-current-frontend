import { useState, useEffect } from 'react';
import { DeviceType, mobileBreakpoint, tabletBreakpoint } from '@/styles/screens';

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState(DeviceType.DESKTOP);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= tabletBreakpoint) {
        setDeviceType(DeviceType.DESKTOP);
      } else if (window.innerWidth >= mobileBreakpoint) {
        setDeviceType(DeviceType.TABLET);
      } else {
        setDeviceType(DeviceType.MOBILE);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile: deviceType === DeviceType.MOBILE,
    isTablet: deviceType === DeviceType.TABLET,
    isDesktop: deviceType === DeviceType.DESKTOP,
  };
};

export default useDeviceType;
