import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomeProductCarouselCard from './components/HomeProductCarouselCard';

describe('HomeProductCarouselCard', () => {
  it('should render the product information', () => {
    // Arrange
    const title = 'Test Product';
    const description = 'This is a test product.';
    const id = 'test-product';

    // Act
    render(<HomeProductCarouselCard title={title} description={description} selected={false} id={id} />);

    // Assert
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('should apply the selected border style when selected is true', () => {
    // Arrange
    const title = 'Test Product';
    const description = 'This is a test product.';
    const id = 'test-product';

    // Act
    render(<HomeProductCarouselCard title={title} description={description} selected={true} id={id} />);

    // Assert
    const cardElement = screen.getByTestId(`product-card-${id}`);
    expect(cardElement).toHaveClass('border-l-8 border-imos-sea-blue border-2');
  });
});
