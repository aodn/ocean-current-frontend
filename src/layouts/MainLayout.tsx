import React from 'react';
import { Outlet } from 'react-router';
import { Footer, Navbar, BurgerMenu } from '@/components';

const MainLayout: React.FC = () => {
  return (
    <div className="flex w-full flex-col bg-imos-light-blue font-open-sans md:px-0">
      <div className="sticky top-0 z-50 w-full bg-white">
        <div className="mx-auto w-full">
          <div className="md:hidden">
            <BurgerMenu />
          </div>
          <div className="hidden md:block">
            <Navbar />
          </div>
        </div>
      </div>
      <div className="flex grow justify-center md:px-0">
        <div className="mx-auto mb-2 w-full max-w-8xl p-4 md:mb-9">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
