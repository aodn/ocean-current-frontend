import React, { useCallback, useState } from 'react';
import { Outlet } from 'react-router';
import { Footer, Navbar, NavbarBurgerMenu, NavbarMobile } from '@/components';
import { Overlay } from '@/components/Shared';

const MainLayout: React.FC = () => {
  const [isMobileMenuOpen, setMobieMenuOpen] = useState(false);
  const toggleMobileMenu = useCallback((): void => {
    setMobieMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback((): void => {
    setMobieMenuOpen(false);
  }, []);

  return (
    <div className="flex w-full flex-col bg-imos-light-blue font-open-sans md:px-0">
      <div>
        <NavbarMobile className="md:hidden" isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
        <Navbar className="mx-auto hidden w-full md:block" />
      </div>

      <Overlay isOpen={isMobileMenuOpen}>
        <NavbarBurgerMenu closeMobileMenu={closeMobileMenu} />
      </Overlay>

      <div className="flex w-full grow justify-center md:px-0">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
