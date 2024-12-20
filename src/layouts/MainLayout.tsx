import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Navbar, BurgerMenu } from '@/components';

const MainLayout: React.FC = () => {
  return (
    <div className="flex w-full flex-col font-open-sans md:px-0">
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
        <div className="w-full">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
