import React from 'react';

interface AuthorProps {
  author: string;
}
const Author: React.FC<AuthorProps> = ({ author }) => {
  return <p className="italic text-[#818181]">{author}</p>;
};

export default Author;
