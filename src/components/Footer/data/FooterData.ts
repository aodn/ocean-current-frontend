import { FooterSection } from '../types/Footer.types';
import facebookIcon from '@/assets/icons/facebook-icon.svg';
import instagramIcon from '@/assets/icons/instagram-icon.svg';
import linkedinIcon from '@/assets/icons/linkedin-icon.svg';
import twitterIcon from '@/assets/icons/twitter-icon.svg';

export const footerData: FooterSection[] = [
  {
    title: 'Contact us',
    links: [
      {
        name: 'contact@aodn.org.au',
        url: 'mailto:contact@aodn.org.au',
      },
      {
        name: '+1-2345-6789',
        url: '',
      },
      {
        name: '20 Castray Esplanade, Battery Point TAS',
        url: '',
      },
    ],
  },
  {
    title: 'Data',
    links: [
      {
        name: 'Auctor volutpat.',
        url: '',
      },
      {
        name: 'Fermentum turpis.',
        url: '',
      },
      {
        name: 'Mi consequat.',
        url: '',
      },
      {
        name: 'Amet venenatis.',
        url: '',
      },
      {
        name: 'Convallis porttitor.',
        url: '',
      },
    ],
  },
  {
    title: 'Learn',
    links: [
      {
        name: 'Auctor volutpat.',
        url: '',
      },
      {
        name: 'Fermentum turpis.',
        url: '',
      },
      {
        name: 'Mi consequat.',
        url: '',
      },
      {
        name: 'Amet venenatis.',
        url: '',
      },
      {
        name: 'Convallis porttitor.',
        url: '',
      },
    ],
  },
  {
    title: 'About',
    links: [
      {
        name: 'Auctor volutpat.',
        url: '',
      },
      {
        name: 'Fermentum turpis.',
        url: '',
      },
    ],
    icons: [
      {
        alt: 'Facebook icon',
        src: facebookIcon,
        url: '',
      },
      {
        alt: 'Instagram icon',
        src: instagramIcon,
        url: '',
      },
      {
        alt: 'Linkedin icon',
        src: linkedinIcon,
        url: '',
      },
      {
        alt: 'Twitter icon',
        src: twitterIcon,
        url: '',
      },
    ],
  },
];
