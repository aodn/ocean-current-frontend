import { PropsWithChildren, AnchorHTMLAttributes } from 'react';
import { Link, LinkProps } from 'react-router';

interface LinkOrAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement>, LinkProps {
  to: string;
  className?: string;
  onClick?: () => void;
}

const isExternalUrl = (url: string): boolean => /^https?:\/\//i.test(url);

const LinkOrAnchor = ({ to, className, children, onClick, ...props }: PropsWithChildren<LinkOrAnchorProps>) => {
  if (isExternalUrl(to)) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className={className} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={className} onClick={onClick} {...props}>
      {children}
    </Link>
  );
};

export default LinkOrAnchor;
