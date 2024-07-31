import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TruncateText from './TruncateText';

describe('TruncateText Component', () => {
  it('should render the text', () => {
    render(<TruncateText text="Hello, World!" />);
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });

  it('should apply custom number of lines', () => {
    render(<TruncateText text="Custom lines test" lines={3} />);
    const truncatedElement = screen.getByText('Custom lines test');

    expect(truncatedElement).toHaveStyle({
      WebkitLineClamp: '3',
      lineClamp: '3',
    });
  });

  it('should handle empty text', () => {
    render(<TruncateText text="" />);
    const truncatedElement = screen.getByTestId('truncate-text');

    expect(truncatedElement).toBeEmptyDOMElement();
  });

  it('should handle very long text', () => {
    const longText = 'A'.repeat(1000);
    render(<TruncateText text={longText} />);
    const truncatedElement = screen.getByText(longText);

    expect(truncatedElement).toBeInTheDocument();
    expect(truncatedElement).toHaveStyle({
      WebkitLineClamp: '2',
    });
  });
});
