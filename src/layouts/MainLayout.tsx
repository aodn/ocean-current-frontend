import React from 'react';

import { Outlet, Link } from 'react-router-dom';
import { Footer } from '@/components';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <header className="mb-auto flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm py-4 bg-transparent">
        <nav className="w-full px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8" aria-label="Global">
          <div className="w-full flex items-center justify-between">
            <Link className="flex-none text-xl font-semibold text-white" to="/">
              Home
            </Link>
            <Link className="flex-none text-xl font-semibold text-white" to="/map-view">
              Map Data
            </Link>
            <Link className="flex-none text-xl font-semibold text-white" to="/news">
              News
            </Link>
            <Link className="flex-none text-xl font-semibold text-white" to="/guided-tour">
              Guided Tour
            </Link>
          </div>
        </nav>
      </header>
      <div className="w-full grow bg-gray-200">
        <main className="mx-auto h-full">
          <Outlet />
          <button>h12</button>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
