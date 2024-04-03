import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductCarrouselCard from '../ProductCarrouselCard';

describe('ProductCarrouselCard', () => {
  it('debería renderizar la información del producto', () => {
    render(
      <ProductCarrouselCard
        title="Test Product"
        description="This is a test product."
        selected={false}
        imageUrl="test.jpg"
        id="test-product"
      />,
    );
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('This is a test product.')).toBeInTheDocument();
    expect(screen.getByAltText('test-product map')).toHaveAttribute('src', 'test.jpg');
  });

  it('debería aplicar el estilo de borde seleccionado cuando selected es true', () => {
    render(
      <ProductCarrouselCard
        title="Test Product"
        description="This is a test product."
        selected={true}
        imageUrl="test.jpg"
        id="test-product"
      />,
    );
    const cardElement = screen.getByTestId('product-card-test-product');
    expect(cardElement).toHaveClass('border-4 border-blue-500');
  });
});
