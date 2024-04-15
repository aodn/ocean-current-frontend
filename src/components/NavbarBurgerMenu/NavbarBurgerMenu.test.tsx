import { describe, it, expect } from 'vitest';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import NavbarBurgerMenu from './NavbarBurgerMenu';
import { linksData } from '../Navbar/data/LinksData';

describe('NavbarBurgerMenu', () => {
  it('renders the component', async () => {
    // Arrange
    render(<NavbarBurgerMenu />);

    // Assert
    const logo = screen.getByAltText('IMOS logo navbar');
    expect(logo).toBeInTheDocument();
    const svgToggle = screen.getByTestId('svg-toggle');
    expect(svgToggle).toBeInTheDocument();
  });

  it('toggles menu visibility when SVG is clicked', async () => {
    // Arrange
    render(<NavbarBurgerMenu />);
    const toggleButton = screen.getByTestId('svg-toggle');
    const menu = screen.getByTestId('burger-menu');

    // Assert initial state
    expect(menu).toHaveClass('hidden');

    // Act
    fireEvent.click(toggleButton);

    // Assert
    expect(menu).not.toHaveClass('hidden');

    // Act
    fireEvent.click(toggleButton);

    // Assert
    expect(menu).toHaveClass('hidden');
  });

  it('displays all the links when menu is open', async () => {
    // Arrange
    render(<NavbarBurgerMenu />);
    const svgToggle = screen.getByTestId('svg-toggle');

    // Act
    fireEvent.click(svgToggle);

    // Assert
    await waitFor(() => {
      linksData.forEach((link) => {
        const displayedLink = screen.getByText(link.title);
        expect(displayedLink).toBeVisible();
        link.leftLinks?.forEach((subLink) => {
          const displayedSubLink = screen.getByText(subLink.title);
          expect(displayedSubLink).toBeVisible();
        });
        link.rightLinks?.forEach((subLink) => {
          const displayedSubLink = screen.getByText(subLink.title);
          expect(displayedSubLink).toBeVisible();
        });
      });
    });
  });
});
