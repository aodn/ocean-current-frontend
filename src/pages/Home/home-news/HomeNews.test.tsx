import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewsCard from './components/NewsCard/NewsCard';
import { News } from './types/HomeNews.types';

const mockNews: News[] = [
  {
    id: 1,
    title: 'Test News Title 1',
    author: 'John Doe 1',
    imageUrl: 'https://oceancurrent.aodn.org.au/news/20240202/Bonney1.png',
    content: 'Late last year we took note of the persistent upwelling along the Bonney Coast 1',
    date: '2023-04-01T12:00:00Z 1',
  },
  {
    id: 2,
    title: 'Test News Title 2',
    author: 'John Doe 2',
    imageUrl: 'https://oceancurrent.aodn.org.au/news/20240202/Bonney2.png',
    content: 'Late last year we took note of the persistent upwelling along the Bonney Coast 2',
    date: '2023-04-01T12:00:00Z 2',
  },
];

describe('NewsCard Component', () => {
  it('renders DateTitleContentLayout by default', () => {
    // Arrange
    render(<NewsCard news={mockNews[0]} />);

    // Act and Assert
    expect(screen.getByTestId('news-title-card')).toHaveTextContent('Test News Title 1');
    expect(screen.getByTestId('news-date-card')).toHaveTextContent(/2023-04-01/);
    expect(screen.getByTestId('news-author-card')).toHaveTextContent('John Doe 1');
    expect(screen.getByTestId('news-content-card')).toHaveTextContent(
      'Late last year we took note of the persistent upwelling along the Bonney Coast 1',
    );
  });

  it('renders DateTitleContentLayout when layout prop is "date-title-content"', () => {
    // Arrange
    render(<NewsCard news={mockNews[0]} layout="date-title-content" />);

    // Act and Assert
    expect(screen.getByTestId('news-title-card')).toHaveTextContent('Test News Title 1');
    expect(screen.getByTestId('news-date-card')).toHaveTextContent(/2023-04-01/);
    expect(screen.getByTestId('news-author-card')).toHaveTextContent('John Doe');
    expect(screen.getByTestId('news-content-card')).toHaveTextContent(
      'Late last year we took note of the persistent upwelling along the Bonney Coast 1',
    );
  });

  it('renders HorizontalLayout when layout prop is "horizontal"', () => {
    // Arrange
    render(<NewsCard news={mockNews[1]} layout="horizontal" />);

    // Act and Assert
    expect(screen.queryByTestId('news-date-card')).not.toBeInTheDocument();
    expect(screen.getByTestId('news-title-card')).toHaveTextContent('Test News Title 2');
    expect(screen.getByTestId('news-content-card')).toHaveTextContent(
      'Late last year we took note of the persistent upwelling along the Bonney Coast 2',
    );
    expect(screen.getByTestId('news-img-card')).toHaveAttribute(
      'src',
      'https://oceancurrent.aodn.org.au/news/20240202/Bonney2.png',
    );
    expect(screen.getByTestId('news-img-card')).toHaveAttribute('alt', 'Test News Title 2 news');
    expect(screen.getByTestId('news-button-card')).toHaveTextContent('Details');
  });
});
