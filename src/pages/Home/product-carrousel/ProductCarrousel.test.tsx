import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductCarrouselCard from './components/ProductCarrouselCard';

describe('ProductCarrouselCard', () => {
  it('should render the product information', () => {
    // Arrange
    const title = 'Test Product';
    const description = 'This is a test product.';
    const imageUrl = 'test.jpg';
    const id = 'test-product';

    // Act
    render(
      <ProductCarrouselCard title={title} description={description} selected={false} imageUrl={imageUrl} id={id} />,
    );

    // Assert
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByAltText(`${id} map`)).toHaveAttribute('src', imageUrl);
  });

  it('should apply the selected border style when selected is true', () => {
    // Arrange
    const title = 'Test Product';
    const description = 'This is a test product.';
    const imageUrl = 'test.jpg';
    const id = 'test-product';

    // Act
    render(
      <ProductCarrouselCard title={title} description={description} selected={true} imageUrl={imageUrl} id={id} />,
    );

    // Assert
    const cardElement = screen.getByTestId(`product-card-${id}`);
    expect(cardElement).toHaveClass('border-4 border-blue-500');
  });
});
