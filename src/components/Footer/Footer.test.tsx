import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { footerData } from './data/FooterData';

describe('Footer Component', () => {
  it('renders without crashing', () => {
    // Arrange
    render(<Footer />);

    // Assert
    expect(screen.getByText('IMOS OceanCurrent')).toBeInTheDocument();
  });

  it('renders all section titles from footerData', () => {
    // Arrange
    render(<Footer />);

    // Act & Assert
    footerData.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('renders icons when provided', () => {
    // Arrange
    render(<Footer />);
    const icons = footerData.flatMap((section) => section.icons || []);

    // Act & Assert
    icons.forEach(({ alt }) => {
      expect(screen.getByAltText(alt)).toBeInTheDocument();
    });
  });

  it('renders copyright notice', () => {
    // Arrange
    render(<Footer />);

    // Assert
    expect(screen.getByText(/Copyright © 2020. All rights reserved./)).toBeInTheDocument();
  });
});
