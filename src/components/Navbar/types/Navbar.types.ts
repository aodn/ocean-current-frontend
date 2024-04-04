export interface BasicLink {
  title: string;
  url: string;
  id?: never;
  leftLinks?: never;
  rightLinks?: never;
}

export interface DetailedLink {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  url: string;
}

export interface SectionLinks {
  title: string;
  leftLinks?: DetailedLink[];
  rightLinks?: DetailedLink[];
  url?: never;
}

export type LinkItem = BasicLink | SectionLinks;
