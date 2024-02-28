import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from '@/components';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-lexed ">
      <div className="bg-white">
        <div className="max-w-6xl mx-auto ">
          <Navbar></Navbar>
        </div>
      </div>
      <div className="flex grow">
        <div className="w-full max-w-6xl mx-auto">
          <Outlet />
        </div>
      </div>
      <div className="bg-footer-gradient">
        <div className="max-w-6xl mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
