import { FC } from 'react';
import { IconProps } from '@/components/Shared/Icons';

export interface BasicLink {
  title: string;
  url: string;
  id?: never;
  links?: never;
}

export interface DetailedLink {
  id: string;
  title: string;
  Icon: FC<IconProps>;
  description: string;
  url: string;
}

export interface SectionLinks {
  title: string;
  links?: DetailedLink[];
  url?: never;
}

export type LinkItem = BasicLink | SectionLinks;
