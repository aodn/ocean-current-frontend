import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ProductInfo } from '../types';
import ProductSummary from './ProductSummary';

const renderWithRouter = (ui: React.ReactElement, initialEntry = '/product/eac-mooring-array') => {
  return render(<MemoryRouter initialEntries={[initialEntry]}>{ui}</MemoryRouter>);
};

const baseProductInfo: ProductInfo = {
  id: 'testProduct',
  title: 'Test Product',
  summary: 'This is a test summary for the product.',
  description: () => <p>Description content</p>,
};

const productInfoWithAbout: ProductInfo = {
  ...baseProductInfo,
  aboutButtonText: 'About this dataset',
  aboutTitle: 'Test Product (2012-2022)',
  aboutDescription: () => <p>About content</p>,
};

describe('ProductSummary', () => {
  it('renders nothing when summary is null', () => {
    renderWithRouter(<ProductSummary productInfo={{ ...baseProductInfo, summary: null }} />);
    expect(screen.queryByText('Read more')).not.toBeInTheDocument();
  });

  it('renders nothing when summary is empty', () => {
    renderWithRouter(<ProductSummary productInfo={{ ...baseProductInfo, summary: '' }} />);
    expect(screen.queryByText('Read more')).not.toBeInTheDocument();
  });

  it('renders summary text and Read more link', () => {
    renderWithRouter(<ProductSummary productInfo={baseProductInfo} />);
    expect(screen.getByText('This is a test summary for the product.')).toBeInTheDocument();
    expect(screen.getByText('Read more')).toBeInTheDocument();
  });

  it('opens the Read More popup when clicked', () => {
    renderWithRouter(<ProductSummary productInfo={baseProductInfo} />);
    fireEvent.click(screen.getByText('Read more'));
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Description content')).toBeInTheDocument();
  });

  it('does not render about button when aboutButtonText is not provided', () => {
    renderWithRouter(<ProductSummary productInfo={baseProductInfo} />);
    expect(screen.queryByText('About this dataset')).not.toBeInTheDocument();
  });

  it('renders about button when aboutButtonText and aboutDescription are provided', () => {
    renderWithRouter(<ProductSummary productInfo={productInfoWithAbout} />);
    expect(screen.getByText('About this dataset')).toBeInTheDocument();
  });

  it('renders about button as a link that opens in a new tab', () => {
    renderWithRouter(<ProductSummary productInfo={productInfoWithAbout} />);
    const link = screen.getByText('About this dataset').closest('a');
    expect(link).toHaveAttribute('href', '/about/eac-mooring-array');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('renders about link with subProduct when on a sub-product route', () => {
    renderWithRouter(<ProductSummary productInfo={productInfoWithAbout} />, '/product/six-day-sst/sst');
    const link = screen.getByText('About this dataset').closest('a');
    expect(link).toHaveAttribute('href', '/about/six-day-sst/sst');
  });
});
