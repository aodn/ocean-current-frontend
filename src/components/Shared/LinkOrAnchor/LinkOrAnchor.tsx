import { PropsWithChildren } from 'react';
import { Link } from 'react-router';

interface LinkOrAnchorProps {
  to: string;
  className?: string;
}

const isExternalUrl = (url: string): boolean => /^https?:\/\//i.test(url);

const LinkOrAnchor = ({ to, className, children }: PropsWithChildren<LinkOrAnchorProps>) => {
  if (isExternalUrl(to)) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
};

export default LinkOrAnchor;
