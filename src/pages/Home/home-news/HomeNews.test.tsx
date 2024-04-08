import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DateTitleContent from './components/CardLayout/DateTitleContent';
import Horizontal from './components/CardLayout/Horizontal';
import HomeNews from './HomeNews';
import { News } from './types/HomeNews.types';

const mockNews: News[] = [
  {
    id: 1,
    title: 'Test News Title 1',
    author: 'John Doe',
    imageUrl: 'https://oceancurrent.aodn.org.au/news/20240202/Bonney1.png',
    content: 'Late last year we took note of the persistent upwelling along the Bonney Coast.',
    date: '2023-04-01T12:00:00Z',
  },
  {
    id: 2,
    title: 'Test News Title 2',
    author: 'John Doe',
    imageUrl: 'https://oceancurrent.aodn.org.au/news/20240202/Bonney1.png',
    content: 'Late last year we took note of the persistent upwelling along the Bonney Coast.',
    date: '2023-04-01T12:00:00Z',
  },
];

describe('Home news section', () => {
  describe('DateTitleContent Component', () => {
    it('renders component correctly with given news data', () => {
      // Arrange
      render(<DateTitleContent news={mockNews[0]} />);

      // Act and Assert
      expect(screen.getByTestId('news-title-card')).toHaveTextContent('Test News Title 1');
      expect(screen.getByTestId('news-date-card')).toHaveTextContent(/2023-04-01/);
      expect(screen.getByTestId('news-author-card')).toHaveTextContent('John Doe');
      expect(screen.getByTestId('news-content-card')).toHaveTextContent(
        'Late last year we took note of the persistent upwelling along the Bonney Coast.',
      );
    });
  });

  describe('Horizontal Component', () => {
    it('renders component correctly with given news data', () => {
      // Arrange
      render(<Horizontal news={mockNews[1]} />);

      // Act and Assert
      expect(screen.getByTestId('news-title-card')).toHaveTextContent('Test News Title 2');
      expect(screen.getByTestId('news-content-card')).toHaveTextContent(
        'Late last year we took note of the persistent upwelling along the Bonney Coast.',
      );
      expect(screen.getByTestId('news-img-card')).toHaveAttribute(
        'src',
        'https://oceancurrent.aodn.org.au/news/20240202/Bonney1.png',
      );
      expect(screen.getByTestId('news-img-card')).toHaveAttribute('alt', 'Test News Title 2 news img');
      expect(screen.getByTestId('news-button-card')).toHaveTextContent('Details');
    });
  });

  describe('HomeNews Component', () => {
    it('renders component the news section with news cards', () => {
      // Arrange
      render(<HomeNews />);

      // Act and Assert
      expect(screen.getByText('OceanCurrent News')).toBeInTheDocument();
      expect(screen.getByText('A Bonney Bloom')).toBeInTheDocument();
      expect(screen.getByText('Sydney to Hobart race conditions: exceptional currents')).toBeInTheDocument();
    });
  });
});
