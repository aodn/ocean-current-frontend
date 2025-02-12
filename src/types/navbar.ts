export interface BasicLink {
  title: string;
  url: string;
  id?: never;
  links?: never;
}

export interface DetailedLink {
  id: string;
  title: string;
  greyIcon: string;
  blueIcon: string;
  description: string;
  url: string;
}

export interface SectionLinks {
  title: string;
  links?: DetailedLink[];
  url?: never;
}

export type LinkItem = BasicLink | SectionLinks;
