import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import australiaIcon from '@/assets/icons/australia-icon.png';
import localRegionIcon from '@/assets/icons/local-region-icon.png';
import stateRegionIcon from '@/assets/icons/state-region-icon.png';
import categoryIcon from '@/assets/icons/category-icon.png';
import MapNavbar from './MapNavbar';
import RegionSelection from './components/RegionSelection';

describe('MapNavbar', () => {
  beforeEach(() => {
    // Arrange
    render(
      <MemoryRouter>
        <MapNavbar />
      </MemoryRouter>,
    );
  });

  it('should render category, local, state, and all Australia regions with corresponding icons', () => {
    // Assert
    expect(screen.getByAltText(/category logo/i)).toHaveAttribute('src', categoryIcon);
    expect(screen.getByAltText(/local region logo/i)).toHaveAttribute('src', localRegionIcon);
    expect(screen.getByAltText(/state region/i)).toHaveAttribute('src', stateRegionIcon);
    expect(screen.getByAltText(/all australia/i)).toHaveAttribute('src', australiaIcon);

    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Local Region')).toBeInTheDocument();
    expect(screen.getByText('State Region')).toBeInTheDocument();
    expect(screen.getByText('All Australia')).toBeInTheDocument();
  });
});

describe('RegionSelection', () => {
  it('should render Local Region as selected by default', () => {
    // Arrange
    render(<RegionSelection />);
    const localRegionButton = screen.getByText('Local Region');

    // Assert
    const container = localRegionButton.parentElement;
    expect(container).toHaveClass('border-imos-sea-blue');
  });
});
