import React from 'react';

interface TitleProps {
  title: string;
  className?: string;
}
const Title: React.FC<TitleProps> = ({ title, className }) => {
  return <h3 className={`text-xl text-[#747474] ${className}`}>{title}</h3>;
};

export default Title;
