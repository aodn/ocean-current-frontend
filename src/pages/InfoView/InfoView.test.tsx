import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import InfoView from './InfoView';

const renderWithRoute = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/info/:slug" element={<InfoView />} />
      </Routes>
    </MemoryRouter>,
  );

describe('InfoView', () => {
  it('renders content for a valid slug', () => {
    renderWithRoute('/info/glossary');

    expect(
      screen.getByText('Some explanation of oceanographic terminology, techniques and principles'),
    ).toBeInTheDocument();
  });

  it('renders content for the references slug', () => {
    renderWithRoute('/info/references');

    expect(screen.getByText('References')).toBeInTheDocument();
  });

  it('renders the error state for an unknown slug', () => {
    renderWithRoute('/info/nonexistent');

    expect(screen.getByText('Content Not Available')).toBeInTheDocument();
  });
});
