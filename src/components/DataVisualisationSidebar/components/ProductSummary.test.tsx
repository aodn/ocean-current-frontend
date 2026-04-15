import type { ReactElement } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ProductInfo } from '../types';
import ProductSummary from './ProductSummary';

const renderWithRouter = (ui: ReactElement, initialEntry = '/product/eac-mooring-array') => {
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
  beforeEach(() => {
    vi.spyOn(window, 'open').mockImplementation(() => null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

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

  it('clicking about button opens the about page in a new tab', () => {
    renderWithRouter(<ProductSummary productInfo={productInfoWithAbout} />);
    fireEvent.click(screen.getByText('About this dataset'));
    expect(window.open).toHaveBeenCalledWith('/about/eac-mooring-array', '_blank', 'noopener,noreferrer');
  });

  it('clicking about button opens the main product path even when on a sub-product', () => {
    renderWithRouter(<ProductSummary productInfo={productInfoWithAbout} />, '/product/six-day-sst/sst');
    fireEvent.click(screen.getByText('About this dataset'));
    expect(window.open).toHaveBeenCalledWith('/about/six-day-sst', '_blank', 'noopener,noreferrer');
  });
});
