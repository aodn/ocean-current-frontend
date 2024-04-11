import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import { describe, it, expect, vi } from 'vitest';

const ProblematicComponent = () => {
  throw new Error('I crashed!');
};

describe('ErrorBoundary', () => {
  it('capture the error and show the fallback message', () => {
    const errorSpy = vi.spyOn(console, 'error');
    errorSpy.mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/I crashed!/i)).toBeInTheDocument();

    errorSpy.mockRestore();
  });

  it('show child component if everything is ok', () => {
    const ChildComponent = () => <div>Everything is ok</div>;
    render(
      <ErrorBoundary>
        <ChildComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText(/Everything is ok/i)).toBeInTheDocument();
  });
});
