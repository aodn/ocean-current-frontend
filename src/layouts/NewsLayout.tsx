import React from 'react';
import { Outlet } from 'react-router';

const NewsLayout: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl overflow-x-hidden px-4 py-12 sm:px-6 lg:px-8">
      <Outlet />
    </div>
  );
};

export default NewsLayout;
