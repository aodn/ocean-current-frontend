import React from 'react';
import { Outlet } from 'react-router';

// Centered article-width wrapper for long-form text pages (product about pages
// under /about, info pages such as glossary and references under /info).
const ArticleLayout: React.FC = () => {
  return (
    <div className="max-w-8xl mx-auto mt-4 mb-4 w-full px-4 md:mb-9">
      <Outlet />
    </div>
  );
};

export default ArticleLayout;
