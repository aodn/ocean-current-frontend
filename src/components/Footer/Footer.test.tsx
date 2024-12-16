import { render, screen } from '@testing-library/react';
import { GeneralText } from '@/constants/textConstant';
import Footer from './Footer';
import { aodnInfo, copyrightInfo, footerAcknowledgeText, footerLinks, footerSocials, ocSubheading } from './consts.ts';

describe('Footer Component', () => {
  test('should render logo and title', () => {
    render(<Footer />);

    // Check for the logo
    const logo = screen.getByAltText('IMOS logo');
    expect(logo).toBeVisible();

    // Check for the main heading
    const mainHeading = screen.getByText(GeneralText.OC_PASCAL_CASE);
    expect(mainHeading).toBeVisible();

    // Check for subheading
    const subheading = screen.getByText(ocSubheading);
    expect(subheading).toBeVisible();
  });

  test('should render AODN text', () => {
    render(<Footer />);

    const aodnText = screen.getByText(aodnInfo);
    expect(aodnText).toBeVisible();
  });

  test('should render footer links correctly', () => {
    render(<Footer />);

    footerLinks.forEach(({ text, url }) => {
      const link = screen.getByText(text);
      expect(link).toBeVisible();
      expect(link).toHaveAttribute('href', url);
    });
  });

  test('should render social media icons with links', () => {
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

  test('should render footer acknowledgement text', () => {
    render(<Footer />);

    const acknowledgeText = screen.getByText(footerAcknowledgeText);
    expect(acknowledgeText).toBeVisible();
  });

  test('should render copyright text', () => {
    render(<Footer />);

    const copyrightText = screen.getByText(copyrightInfo);
    expect(copyrightText).toBeVisible();
  });

  test('should render footer with correct class names', () => {
    const { container } = render(<Footer />);

    // Check if the footer has the expected class name for layout and design
    expect(container.firstChild).toHaveClass('flex justify-center bg-white px-5 leading-8 sm:px-10');
  });
});
