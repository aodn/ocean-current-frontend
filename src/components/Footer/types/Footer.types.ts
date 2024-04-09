interface FooterLink {
  name: string;
  url: string;
}

export interface FooterIcon {
  alt: string;
  src: string;
  url: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
  icons?: FooterIcon[];
}
