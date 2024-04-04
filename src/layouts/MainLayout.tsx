import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from '@/components';

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col font-lexend ">
      <div className="bg-white">
        <div className="mx-auto w-full max-w-7xl ">
          <Navbar />
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
