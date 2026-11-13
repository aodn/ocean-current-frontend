import React from 'react';
import { cn } from '@/utils/classname-util/cn';

interface NewTabLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  'aria-label'?: string;
}

const NewTabLink: React.FC<NewTabLinkProps> = ({ href, className, children, 'aria-label': ariaLabel }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer noopener"
    aria-label={ariaLabel}
    className={cn('text-imos-sea-blue', className)}
  >
    {children}
  </a>
);

export default NewTabLink;
