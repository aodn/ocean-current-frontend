import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import dayjs from 'dayjs';
import * as productUtils from '@/utils/product-utils/product';
import { ProductID } from '@/types/product';
import ErrorImage from './ErrorImage';

// Mock the product utils
vi.mock('@/utils/product-utils/product', () => ({
  getProductPathWithSubProduct: vi.fn(() => '/mocked-path'),
}));

describe('ErrorImage Component', () => {
  const mockDate = dayjs();
  const mockProduct: ProductID = 'fourHourSst-sst';

  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <ErrorImage date={mockDate} productId={mockProduct} />
      </BrowserRouter>,
    );

    expect(screen.getByText(/is not available for this product and\/or region/)).toBeInTheDocument();
  });

  it('renders the NotFoundIcon', () => {
    const { container } = render(
      <BrowserRouter>
        <ErrorImage date={mockDate} productId={mockProduct} />
      </BrowserRouter>,
    );

    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', '/src/assets/icons/not-found-icon.svg');
  });

  it('renders the error message', () => {
    render(
      <BrowserRouter>
        <ErrorImage date={mockDate} productId={mockProduct} />
      </BrowserRouter>,
    );

    expect(screen.getByText('Try another date or region, or check back later.')).toBeInTheDocument();
  });

  it('renders a button with correct link', () => {
    render(
      <BrowserRouter>
        <ErrorImage date={mockDate} productId={mockProduct} />
      </BrowserRouter>,
    );

    const link = screen.getByRole('link', { name: 'Back to map' });
    expect(link).toHaveAttribute('href', '/map//mocked-path');
  });

  it('calls getProductPathWithSubProduct with correct argument', () => {
    render(
      <BrowserRouter>
        <ErrorImage date={mockDate} productId={mockProduct} />
      </BrowserRouter>,
    );

    expect(productUtils.getProductPathWithSubProduct).toHaveBeenCalledWith('fourHourSst-sst');
  });
});
