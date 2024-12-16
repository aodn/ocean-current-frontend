import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Navbar, BurgerMenu } from '@/components';

const MainLayout: React.FC = () => {
  return (
    <div className="md:px-0 flex flex-col bg-[#E8F0F6] font-open-sans">
      <div className="sticky top-0 z-50 w-full bg-white">
        <div className="mx-auto w-full">
          <div className="md:hidden">
            <BurgerMenu />
          </div>
          <div className="md:block hidden">
            <Navbar />
          </div>
        </div>
      </div>
      <div className="md:px-0 flex grow justify-center px-2">
        <div className="w-full">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
