import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import HomeProductCarousel from './HomeProductCarousel';
import { productCarouselData } from './data';

vi.mock('./data', () => ({
  productCarouselData: [
    { id: 1, url: '/product1', imageUrl: 'image1.jpg', description: 'Product 1', title: 'Product 1' },
    { id: 2, url: '/product2', imageUrl: 'image2.jpg', description: 'Product 2', title: 'Product 2' },
    { id: 3, url: '/product3', imageUrl: 'image3.jpg', description: 'Product 3', title: 'Product 3' },
    { id: 4, url: '/product4', imageUrl: 'image4.jpg', description: 'Product 4', title: 'Product 4' },
    { id: 5, url: '/product5', imageUrl: 'image5.jpg', description: 'Product 5', title: 'Product 5' },
  ],
}));

describe('HomeProductCarousel', () => {
  const renderComponent = () =>
    render(
      <Router>
        <HomeProductCarousel />
      </Router>,
    );

  it('renders all products', () => {
    renderComponent();

    productCarouselData.forEach((product) => {
      expect(screen.getByAltText(product.description)).toBeInTheDocument();
      expect(screen.getByText(product.title)).toBeInTheDocument();
    });
  });

  it('disables the previous button initially', () => {
    renderComponent();
    const prevButton = screen.getAllByRole('button')[0];
    expect(prevButton).toHaveClass('cursor-not-allowed');
  });

  it('disables the next button when at the end of the carousel', () => {
    renderComponent();

    const nextButton = screen.getAllByRole('button')[1];

    // Simulate clicks to reach the last possible index
    const itemsPerRow = window.innerWidth >= 1280 ? 7 : window.innerWidth >= 768 ? 4 : 1;
    const maxIndex = productCarouselData.length - itemsPerRow;

    for (let i = 0; i < maxIndex; i++) {
      fireEvent.click(nextButton);
    }

    expect(nextButton).toHaveClass('cursor-not-allowed');
  });

  it('navigates the carousel when next and previous buttons are clicked', async () => {
    renderComponent();

    const nextButton = screen.getAllByRole('button')[1];
    const prevButton = screen.getAllByRole('button')[0];

    const carouselContainer = screen.getByTestId('carousel-container');

    await userEvent.click(nextButton);

    expect(carouselContainer).toHaveStyle('transform: translateX(-144px)');

    await userEvent.click(prevButton);

    expect(carouselContainer).toHaveStyle('transform: translateX(0px)');
  });

  it('adjusts the number of items per row on window resize', () => {
    renderComponent();

    global.innerWidth = 1024;
    fireEvent(window, new Event('resize'));

    const totalVisibleItems = window.innerWidth >= 1280 ? 7 : window.innerWidth >= 768 ? 4 : 1;
    expect(totalVisibleItems).toBe(4);
  });
});
