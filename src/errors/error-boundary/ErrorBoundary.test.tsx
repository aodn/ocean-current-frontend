import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { errorConfig } from '../ErrorConfig';
import ErrorBoundary from './ErrorBoundary';

const ProblematicComponent = ({ errorMessage }: { errorMessage: string }) => {
  throw new Error(errorMessage);
};

describe('ErrorBoundary', () => {
  it('captures the error and shows the correct fallback message for UnsupportedProduct', () => {
    const errorSpy = vi.spyOn(console, 'error');
    errorSpy.mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblematicComponent errorMessage="Product type not supported" />
      </ErrorBoundary>,
    );

    expect(screen.getByText(errorConfig.UnsupportedProduct.title)).toBeInTheDocument();
    expect(screen.getByText(errorConfig.UnsupportedProduct.description)).toBeInTheDocument();
    expect(screen.getByText('Product type not supported')).toBeInTheDocument();

    errorSpy.mockRestore();
  });

  it('captures the error and shows the correct fallback message for UnsupportedSubProduct', () => {
    const errorSpy = vi.spyOn(console, 'error');
    errorSpy.mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblematicComponent errorMessage="Sub product type not supported" />
      </ErrorBoundary>,
    );

    expect(screen.getByText(errorConfig.UnsupportedSubProduct.title)).toBeInTheDocument();
    expect(screen.getByText(errorConfig.UnsupportedSubProduct.description)).toBeInTheDocument();
    expect(screen.getByText('Sub product type not supported')).toBeInTheDocument();

    errorSpy.mockRestore();
  });

  it('shows the default fallback message for an unspecified error type', () => {
    const errorSpy = vi.spyOn(console, 'error');
    errorSpy.mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblematicComponent errorMessage="An unexpected error occurred" />
      </ErrorBoundary>,
    );

    expect(screen.getByText('An Error Occurred')).toBeInTheDocument();
    expect(screen.getByText('An unexpected error occurred. Please try again later.')).toBeInTheDocument();
    expect(screen.getByText('An unexpected error occurred')).toBeInTheDocument();

    errorSpy.mockRestore();
  });

  it('shows child component if everything is ok', () => {
    const ChildComponent = () => <div>Everything is ok</div>;
    render(
      <ErrorBoundary>
        <ChildComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText(/Everything is ok/i)).toBeInTheDocument();
  });
});
