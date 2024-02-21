import { render, screen } from '@testing-library/react';

import App from './App';
import { describe, it, expect } from 'vitest';

describe('App', () => {
  it('renders app ', async () => {
    render(<App />);
    expect(screen.getByText(/Hello world!/)).toBeInTheDocument();
  });
});
