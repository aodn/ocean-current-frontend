import React from 'react';

interface ArticleCardProps {
  title: string;
  children: React.ReactNode;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, children }) => {
  return (
    <div className="rounded-lg bg-white">
      <div className="bg-imos-cloud-tint/70 flex items-center justify-center rounded-t-lg px-12 py-4">
        <h1 className="font-poppins text-imos-deep-blue text-center text-xl font-medium">{title}</h1>
      </div>
      <div className="px-6 pt-6 pb-6 md:px-10">{children}</div>
    </div>
  );
};

export default ArticleCard;
