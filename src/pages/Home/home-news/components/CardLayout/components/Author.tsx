import React from 'react';

interface AuthorProps {
  author: string;
}
const Author: React.FC<AuthorProps> = ({ author }) => {
  return (
    <p data-testid="news-author-card" className="italic text-imos-grey">
      {author}
    </p>
  );
};

export default Author;
