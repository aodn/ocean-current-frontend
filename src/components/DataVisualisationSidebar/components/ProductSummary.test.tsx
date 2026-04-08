import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductInfo } from '../types';
import ProductSummary from './ProductSummary';

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
    const { container } = render(<ProductSummary productInfo={{ ...baseProductInfo, summary: null }} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when summary is empty', () => {
    const { container } = render(<ProductSummary productInfo={{ ...baseProductInfo, summary: '' }} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders summary text and Read more link', () => {
    render(<ProductSummary productInfo={baseProductInfo} />);
    expect(screen.getByText('This is a test summary for the product.')).toBeInTheDocument();
    expect(screen.getByText('Read more')).toBeInTheDocument();
  });

  it('opens the Read More popup when clicked', () => {
    render(<ProductSummary productInfo={baseProductInfo} />);
    fireEvent.click(screen.getByText('Read more'));
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Description content')).toBeInTheDocument();
  });

  it('does not render about button when aboutButtonText is not provided', () => {
    render(<ProductSummary productInfo={baseProductInfo} />);
    expect(screen.queryByText('About this dataset')).not.toBeInTheDocument();
  });

  it('renders about button when aboutButtonText and aboutDescription are provided', () => {
    render(<ProductSummary productInfo={productInfoWithAbout} />);
    expect(screen.getByText('About this dataset')).toBeInTheDocument();
  });

  it('opens the wide popup with aboutTitle when about button is clicked', () => {
    render(<ProductSummary productInfo={productInfoWithAbout} />);
    fireEvent.click(screen.getByText('About this dataset'));
    expect(screen.getByText('Test Product (2012-2022)')).toBeInTheDocument();
    expect(screen.getByText('About content')).toBeInTheDocument();
  });

  it('uses the base title as fallback when aboutTitle is not provided', () => {
    const info: ProductInfo = {
      ...baseProductInfo,
      aboutButtonText: 'About this dataset',
      aboutDescription: () => <p>About content</p>,
    };
    render(<ProductSummary productInfo={info} />);
    fireEvent.click(screen.getByText('About this dataset'));
    // The wide popup should use the base title as fallback
    const titles = screen.getAllByText('Test Product');
    expect(titles.length).toBeGreaterThanOrEqual(1);
  });

  it('locks body scroll when wide popup is open', () => {
    render(<ProductSummary productInfo={productInfoWithAbout} />);
    fireEvent.click(screen.getByText('About this dataset'));
    expect(document.body.style.overflow).toBe('hidden');
  });
});
