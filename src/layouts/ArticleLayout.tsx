import React from 'react';
import { Outlet } from 'react-router';

const ArticleLayout: React.FC = () => {
  return (
    <div className="max-w-8xl mx-auto mt-4 mb-4 w-full px-4 md:mb-9">
      <Outlet />
    </div>
  );
};

export default ArticleLayout;
