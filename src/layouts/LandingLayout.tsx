import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Navbar, BurgerMenu } from '@/components';

const LandingLayout: React.FC = () => {
  return (
    <div className="flex flex-col px-6 font-lexend md:px-0">
      <div className="sticky top-0 z-50 w-full bg-white">
        <div className="mx-auto w-full ">
          <div className="md:hidden">
            <BurgerMenu />
          </div>
          <div className="hidden md:block">
            <Navbar />
          </div>
        </div>
      </div>
      <div className="flex grow justify-center">
        <div className="w-full">
          <Outlet />
        </div>
      </div>
      <div className="bg-[#3A6F8F] ">
        <div className="mx-auto w-full max-w-7xl">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default LandingLayout;
