import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import facebookIcon from '@/assets/icons/facebook-icon.svg';
import instagramIcon from '@/assets/icons/instagram-icon.svg';
import linkedinIcon from '@/assets/icons/linkedin-icon.svg';
import blueskyIcon from '@/assets/icons/bluesky-icon.svg';
import { FooterIcon, FooterLink } from './footer.types.ts';
import Footer from './Footer.tsx';

// mock data
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
    alt: 'IMOS Bluesky',
    src: blueskyIcon,
    url: 'https://bsky.app/profile/imos-aus.bsky.social',
  },
  {
    alt: 'IMOS LinkedIn',
    src: linkedinIcon,
    url: 'https://www.linkedin.com/company/imos_aus',
  },
];

describe('Footer Component', () => {
  it('should render logo and title', () => {
    render(<Footer />);

    const logo = screen.getByAltText('IMOS logo');
    expect(logo).toBeVisible();

    const mainHeading = screen.getByText('OceanCurrent');
    expect(mainHeading).toBeVisible();

    const subheading = screen.getByText('Up-to-date ocean information around Australia');
    expect(subheading).toBeVisible();
  });

  it('should render footer links correctly', () => {
    render(<Footer />);

    footerLinks.forEach(({ text, url }) => {
      const link = screen.getByText(text);
      expect(link).toBeVisible();
      expect(link).toHaveAttribute('href', url);
    });
  });

  it('should render social media icons with links', () => {
    render(<Footer />);

    // Check that each social media icon is rendered and links correctly
    footerSocials.forEach(({ alt, src, url }) => {
      const icon = screen.getByAltText(alt);
      expect(icon).toBeVisible();
      expect(icon).toHaveAttribute('src', src);

      const iconLink = icon.closest('a');
      expect(iconLink).toHaveAttribute('href', url);
    });
  });

  it('should render footer acknowledgement text', () => {
    render(<Footer />);

    const acknowledgeText = screen.getByText(
      'IMOS acknowledges the Traditional Custodians and Elders of the land and sea on which we work and observe and recognise their unique connection to land and sea. We pay our respects to Aboriginal and Torres Strait Islander peoples past and present.',
    );
    expect(acknowledgeText).toBeVisible();
  });

  it('should render copyright text', () => {
    const getYear = dayjs().format('YYYY');
    render(<Footer />);

    const copyrightText = screen.getByText(`© IMOS ${getYear}`);
    expect(copyrightText).toBeVisible();
  });

  it('should render footer with correct class names', () => {
    const { container } = render(<Footer />);

    // Check if the footer has the expected class name for layout and design
    expect(container.firstChild).toHaveClass('flex justify-center bg-white px-5 leading-8 sm:px-10');
  });
});
