import { render, screen } from '@testing-library/react';
import DateTitleContent from '../components/CardLayout/DateTitleContent';
import { testNews } from '../data/test';

describe('DateTitleContent', () => {
  it('should render the news information', () => {
    render(<DateTitleContent news={testNews} />);
    expect(screen.getByText(/A Bonney Bloom/)).toBeInTheDocument();
    expect(screen.getByText(/Gabriela S. Pilo/)).toBeInTheDocument();
    expect(
      screen.getByText('Late last year we took note of the persistent upwelling along the Bonney Coast.'),
    ).toBeInTheDocument();
    expect(screen.getByText(/2 February, 2024/)).toBeInTheDocument();
  });
});
