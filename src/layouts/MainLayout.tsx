import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Navbar, BurgerMenu } from '@/components';

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col px-6 font-lexend md:px-0">
      <div className="bg-white">
        <div className="mx-auto w-full max-w-7xl">
          <div className="md:hidden">
            <BurgerMenu />
          </div>
          <div className="hidden md:block">
            <Navbar />
          </div>
        </div>
      </div>
      <div className="flex grow">
        <div className="mx-auto w-full max-w-7xl">
          <Outlet />
        </div>
      </div>
      <div className="bg-white">
        <div className="mx-auto w-full max-w-7xl">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
