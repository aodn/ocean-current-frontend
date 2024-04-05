import React from 'react';

interface TitleProps {
  title: string;
}
const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <h3 data-testid="news-title-card" className="text-xl text-imos-black">
      {title}
    </h3>
  );
};

export default Title;
