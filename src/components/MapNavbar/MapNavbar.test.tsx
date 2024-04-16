import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MapNavbar from './MapNavbar';
import australiaIcon from '@/assets/icons/australia-icon.png';
import localRegionIcon from '@/assets/icons/local-region-icon.png';
import stateRegionIcon from '@/assets/icons/state-region-icon.png';
import categoryIcon from '@/assets/icons/category-icon.png';

describe('MapNavbar', () => {
  it('should render category, local, state, and all Australia regions with corresponding icons', () => {
    // Arrange
    render(<MapNavbar />);

    // Assert
    expect(screen.getByRole('img', { name: /category logo/i })).toHaveAttribute('src', categoryIcon);
    expect(screen.getByRole('img', { name: /local region logo/i })).toHaveAttribute('src', localRegionIcon);
    expect(screen.getByRole('img', { name: /state region logo/i })).toHaveAttribute('src', stateRegionIcon);
    expect(screen.getByRole('img', { name: /australia region logo/i })).toHaveAttribute('src', australiaIcon);

    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Local Region')).toBeInTheDocument();
    expect(screen.getByText('State Region')).toBeInTheDocument();
    expect(screen.getByText('All Australia')).toBeInTheDocument();
  });
});
