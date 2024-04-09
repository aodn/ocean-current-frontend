interface Link {
  name: string;
  url: string;
}

export interface Icon {
  alt: string;
  src: string;
  url: string;
}

export interface FooterLinks {
  title: string;
  links: Link[];
  icons?: Icon[];
}
