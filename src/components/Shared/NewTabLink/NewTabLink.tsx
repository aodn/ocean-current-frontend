import React from 'react';
import { cn } from '@/utils/classname-util/cn';

interface NewTabLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const NewTabLink: React.FC<NewTabLinkProps> = ({ href, className, children }) => (
  <a href={href} target="_blank" rel="noreferrer noopener" className={cn('text-imos-sea-blue', className)}>
    {children}
  </a>
);

export default NewTabLink;
