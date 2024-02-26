import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Footer from './Footer';

const RootLayout: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      {/* replace to header nav start */}
      <div className="w-full bg-imos-sea-blue">
        <nav className="max-w-8xl mx-auto py-4 px-4 sm:px-6 md:px-8">
          <ul className="flex w-full gap-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/map-view">Map Data</Link>
            </li>
            <li>
              <Link to="/news">News</Link>
            </li>
            <li>
              <Link to="/guided-tour">Guided Tour</Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* replace to header nav end  */}

      <div className="w-full grow bg-gray-200">
        <main className="max-w-8xl mx-auto h-full px-4 sm:px-6 md:px-8">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
