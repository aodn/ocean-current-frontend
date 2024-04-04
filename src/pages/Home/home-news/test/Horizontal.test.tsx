import { render, screen } from '@testing-library/react';
import Horizontal from '../components/CardLayout/Horizontal';
import { testNews } from '../data/test';

describe('HorizontalLayout', () => {
  it('should render the news information', () => {
    render(<Horizontal news={testNews} />);
    expect(screen.getByText(/A Bonney Bloom/)).toBeInTheDocument();
    expect(
      screen.getByText('Late last year we took note of the persistent upwelling along the Bonney Coast.'),
    ).toBeInTheDocument();
    expect(screen.getByAltText('news profile')).toHaveAttribute(
      'src',
      'https://oceancurrent.aodn.org.au/news/20240202/Bonney1.png',
    );
  });

  it('should not render the author and date', () => {
    render(<Horizontal news={testNews} />);
    expect(screen.queryByText(/Gabriela S. Pilo/)).not.toBeInTheDocument();
    expect(screen.queryByText(/2 February, 2024/)).not.toBeInTheDocument();
  });
});
