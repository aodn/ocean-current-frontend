import { PropsWithChildren } from 'react';
import { Link } from 'react-router';

interface LinkOrAnchorProps {
  to: string;
  className?: string;
  onClick?: () => void;
}

const isExternalUrl = (url: string): boolean => /^https?:\/\//i.test(url);

const LinkOrAnchor = ({ to, className, children, ...props }: PropsWithChildren<LinkOrAnchorProps>) => {
  if (isExternalUrl(to)) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className={className} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={className} {...props}>
      {children}
    </Link>
  );
};

export default LinkOrAnchor;
