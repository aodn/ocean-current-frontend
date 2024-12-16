import facebookIcon from '@/assets/icons/facebook-icon.svg';
import instagramIcon from '@/assets/icons/instagram-icon.svg';
import linkedinIcon from '@/assets/icons/linkedin-icon.svg';
import { FooterIcon, FooterLink } from '../types/footer.types';

export const footerLinks: FooterLink[] = [
  {
    text: 'Terms of Use',
    url: 'https://imos.org.au/terms-of-use',
  },
  {
    text: 'Conditions of Use',
    url: 'https://imos.org.au/conditions-of-use',
  },
  {
    text: 'Acknowledging Us',
    url: 'https://imos.org.au/resources/acknowledging-us',
  },
];

export const footerAcknowledgeText: string =
  'IMOS acknowledges the Traditional Custodians and Elders of the land and sea on which we work and observe and recognise their unique connection to land and sea. We pay our respects to Aboriginal and Torres Strait Islander peoples past and present.';

export const footerSocials: FooterIcon[] = [
  {
    alt: 'IMOS Facebook',
    src: facebookIcon,
    url: 'https://www.facebook.com/IntegratedMarineObservingSystem',
  },
  {
    alt: 'IMOS Instagram',
    src: instagramIcon,
    url: 'https://www.instagram.com/imos_australia/',
  },
  {
    alt: 'IMOS X',
    src: facebookIcon,
    url: 'https://x.com/IMOS_AUS',
  },
  {
    alt: 'IMOS Bluesky',
    src: facebookIcon,
    url: 'https://bsky.app/profile/imos-aus.bsky.social',
  },
  {
    alt: 'IMOS LinkedIn',
    src: linkedinIcon,
    url: 'https://www.linkedin.com/company/imos_aus',
  },
];

export const copyrightInfo: string = '© IMOS 2024';
