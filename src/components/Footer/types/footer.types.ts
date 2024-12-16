export interface FooterLink {
  text: string;
  url: string;
}

export interface FooterIcon {
  alt: string;
  src: string;
  url: string;
}

export interface FooterSection {
  links: FooterLink[];
  icons?: FooterIcon[];
}
