import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@/configs/dayjs';
import TimeSelector from './TimeSelector';

describe('TimeSelector', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render successfully', () => {
    const date = new Date('12 June 2024');
    vi.setSystemTime(date);

    render(
      <MemoryRouter>
        <TimeSelector />
      </MemoryRouter>,
    );

    expect(screen.getByText('12 May 2024')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /right arrow icon/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /left arrow icon/i })).toBeInTheDocument();
  });
});
