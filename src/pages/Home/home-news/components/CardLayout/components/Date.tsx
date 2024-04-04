import React from 'react';

interface DateProps {
  date: string;
}
const Date: React.FC<DateProps> = ({ date }) => {
  return <p className="text-[#909090]">{date}</p>;
};

export default Date;
