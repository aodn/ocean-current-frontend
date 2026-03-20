import React from 'react';
import { Outlet } from 'react-router';
import { Footer, Navbar, NavbarMobile } from '@/components';

const MainLayout: React.FC = () => {
  return (
    <div className="flex w-full flex-col bg-imos-light-blue font-open-sans md:px-0">
      <NavbarMobile className="md:hidden" />
      <Navbar className="mx-auto hidden w-full md:block" />

      <main className="flex w-full grow justify-center md:px-0">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
