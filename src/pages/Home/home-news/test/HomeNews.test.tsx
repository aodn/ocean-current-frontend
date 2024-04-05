import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DateTitleContent from '../components/CardLayout/DateTitleContent';
import Horizontal from '../components/CardLayout/Horizontal';

const newsMock = {
  title: 'Test News Title',
  id: 1,
  author: 'John Doe',
  content: 'This is a test content for the news.',
  date: '2023-04-01T12:00:00Z',
  imageUrl: 'https://example.com/image.jpg',
};

describe('Card Layout Components', () => {
  describe('DateTitleContent Component', () => {
    it('renders correctly with given news data', () => {
      // Arrange
      render(<DateTitleContent news={newsMock} />);

      // Act and Assert
      expect(screen.getByTestId('news-title-card')).toHaveTextContent('Test News Title');
      expect(screen.getByTestId('news-date-card')).toHaveTextContent(/2023-04-01/);
      expect(screen.getByTestId('news-author-card')).toHaveTextContent('John Doe');
      expect(screen.getByTestId('news-content-card')).toHaveTextContent('This is a test content for the news.');
    });
  });

  describe('Horizontal Component', () => {
    it('renders correctly with given news data', () => {
      // Arrange
      render(<Horizontal news={newsMock} />);

      // Act and Assert
      expect(screen.getByTestId('news-title-card')).toHaveTextContent('Test News Title');
      expect(screen.getByTestId('news-content-card')).toHaveTextContent('This is a test content for the news.');
      expect(screen.getByTestId('news-img-card')).toHaveAttribute('src', 'https://example.com/image.jpg');
      expect(screen.getByTestId('news-img-card')).toHaveAttribute('alt', 'Test News Title news img');
    });
  });
});
