import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import NavbarBurgerMenu from './NavbarBurgerMenu';
import { linksData } from '../../data/linksData';

describe('NavbarBurgerMenu', () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <NavbarBurgerMenu />
      </MemoryRouter>,
    );

  it('renders the component', async () => {
    // Arrange
    renderComponent();

    // Assert
    const logo = screen.getByAltText('IMOS logo navbar');
    expect(logo).toBeInTheDocument();
    const svgToggle = screen.getByTestId('svg-toggle');
    expect(svgToggle).toBeInTheDocument();
  });

  it('toggles menu visibility when SVG is clicked', async () => {
    // Arrange
    renderComponent();
    const toggleButton = screen.getByTestId('svg-toggle');
    const menu = screen.getByTestId('burger-menu');

    // Assert initial state
    expect(menu.classList.contains('hidden')).toBe(true);

    // Act
    userEvent.click(toggleButton);

    await waitFor(() => expect(menu.classList.contains('hidden')).toBe(false));

    // Act
    userEvent.click(toggleButton);

    await waitFor(() => expect(menu.classList.contains('hidden')).toBe(true));
  });

  it('displays all the links when menu is open', async () => {
    // Arrange
    renderComponent();
    const svgToggle = screen.getByTestId('svg-toggle');

    // Act
    userEvent.click(svgToggle);

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
