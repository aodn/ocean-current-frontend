import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@/configs/dayjs';
import ProductNavbar from './ProductNavbar';

describe('ProductNavbar', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render successfully', () => {
    const date = new Date('13 June 2024');
    vi.setSystemTime(date);

    render(
      <MemoryRouter>
        <ProductNavbar />
      </MemoryRouter>,
    );

    expect(screen.getByText('13 Jun 2024')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /right arrow icon/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /left arrow icon/i })).toBeInTheDocument();
  });
});
