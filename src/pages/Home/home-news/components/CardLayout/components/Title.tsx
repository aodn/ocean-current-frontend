import React from 'react';

interface TitleProps {
  title: string;
}
const Title: React.FC<TitleProps> = ({ title }) => {
  return <h3 className={'text-xl text-[#747474]'}>{title}</h3>;
};

export default Title;
