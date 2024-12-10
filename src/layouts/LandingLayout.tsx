import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Navbar, BurgerMenu } from '@/components';

const LandingLayout: React.FC = () => {
  return (
    <div className="flex flex-col bg-[#E8F0F6] font-open-sans md:px-0">
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
      <div className="flex grow justify-center px-2 md:px-0">
        <div className="w-full">
          <Outlet />
        </div>
      </div>
      <div className="bg-[#465661] px-2 md:px-0">
        <div className="mx-auto w-full max-w-8xl">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default LandingLayout;
