import React from 'react';
import { Outlet } from 'react-router';

const AboutLayout: React.FC = () => {
  return (
    <div className="mx-auto mb-4 mt-4 w-full max-w-8xl px-4 md:mb-9">
      <Outlet />
    </div>
  );
};

export default AboutLayout;
