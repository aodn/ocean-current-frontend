import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import australiaIcon from '@/assets/icons/australia-icon.png';
import localRegionIcon from '@/assets/icons/local-region-icon.png';
import stateRegionIcon from '@/assets/icons/state-region-icon.png';
import categoryIcon from '@/assets/icons/category-icon.png';
import useMainProductKey from '@/stores/product-store/hooks/useMainProductKey';
import useProductCheck from '@/stores/product-store/hooks/useProductCheck';
import MapNavbar from './MapNavbar';
import RegionSelection from './components/RegionSelection';
import RegionButton from './components/RegionButton';

vi.mock('@/stores/product-store/hooks/useMainProductKey');
vi.mock('@/stores/product-store/hooks/useProductCheck');

describe('MapNavbar', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render loading when mainProductKey is not available', () => {
    // Arrange
    vi.mocked(useMainProductKey).mockReturnValue(null);
    vi.mocked(useProductCheck).mockReturnValue({ isRegionRequired: true, isArgo: false });
    render(
      <MemoryRouter>
        <MapNavbar />
      </MemoryRouter>,
    );

    // Assert
    expect(screen.getByText(/loading/)).toBeInTheDocument();
  });

  it('should render category, local, state, and all Australia regions with corresponding icons', () => {
    // Arrange
    vi.mocked(useMainProductKey).mockReturnValue('fourHourSst');
    vi.mocked(useProductCheck).mockReturnValue({ isRegionRequired: true, isArgo: false });
    render(
      <MemoryRouter>
        <MapNavbar />
      </MemoryRouter>,
    );

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

  it('should not render RegionSelection when isRegionRequired is false', () => {
    // Arrange
    vi.mocked(useMainProductKey).mockReturnValue('argo');
    vi.mocked(useProductCheck).mockReturnValue({ isRegionRequired: false, isArgo: true });
    render(
      <MemoryRouter>
        <MapNavbar />
      </MemoryRouter>,
    );

    // Assert
    expect(screen.queryByText('Local Region')).not.toBeInTheDocument();
    expect(screen.queryByText('State Region')).not.toBeInTheDocument();
    expect(screen.queryByText('All Australia')).not.toBeInTheDocument();
  });
});

describe('RegionSelection', () => {
  it('should render local, state, and all Australia regions with corresponding icons', () => {
    // Arrange
    render(<RegionSelection />);

    // Assert
    expect(screen.getByAltText(/local region logo/i)).toHaveAttribute('src', localRegionIcon);
    expect(screen.getByAltText(/state region/i)).toHaveAttribute('src', stateRegionIcon);
    expect(screen.getByAltText(/all australia/i)).toHaveAttribute('src', australiaIcon);

    expect(screen.getByText('Local Region')).toBeInTheDocument();
    expect(screen.getByText('State Region')).toBeInTheDocument();
    expect(screen.getByText('All Australia')).toBeInTheDocument();
  });

  it('should render Local Region as selected by default', () => {
    // Arrange
    render(<RegionSelection />);
    const localRegionButton = screen.getByText('Local Region');

    // Assert
    const container = localRegionButton.parentElement;
    expect(container).toHaveClass('border-imos-sea-blue');
  });

  it('should change the selected region when a region button is clicked', () => {
    // Arrange
    render(<RegionSelection />);
    const stateRegionButton = screen.getByText('Local Region');

    // Act
    fireEvent.click(stateRegionButton);

    // Assert
    const container = stateRegionButton.parentElement;
    expect(container).toHaveClass('border-imos-sea-blue');
  });

  it('should render transparent border when sibling button is clicked ', () => {
    // Arrange
    render(<RegionSelection />);
    const stateRegionButton = screen.getByText('State Region');
    const allAustraliaButton = screen.getByText('All Australia');

    // Act
    fireEvent.click(stateRegionButton);

    // Assert
    const stateRegionContainer = stateRegionButton.parentElement;
    const allAustraliaContainer = allAustraliaButton.parentElement;
    expect(stateRegionContainer).toHaveClass('border-imos-sea-blue');
    expect(allAustraliaContainer).not.toHaveClass('border-imos-sea-blue');
    expect(allAustraliaContainer).toHaveClass('border-transparent');
  });

  it('should call the onChange function when a region button is clicked', () => {
    // Arrange
    const onChange = vi.fn();
    render(<RegionSelection onChange={onChange} />);
    const stateRegionButton = screen.getByText('State Region');

    // Act
    fireEvent.click(stateRegionButton);

    // Assert
    expect(onChange).toHaveBeenCalled();
  });
});

describe('RegionButton', () => {
  it('should render the label and icon of the region', () => {
    // Arrange
    render(<RegionButton label="Local Region" icon={localRegionIcon} selected />);
    const localRegionButton = screen.getByText('Local Region');

    // Assert
    expect(localRegionButton).toBeInTheDocument();
    expect(localRegionButton.previousElementSibling).toHaveAttribute('src', localRegionIcon);
  });

  it('should render a transparent border when not selected', () => {
    // Arrange
    render(<RegionButton label="Local Region" icon={localRegionIcon} selected={false} />);
    const localRegionButton = screen.getByText('Local Region');

    // Assert
    expect(localRegionButton.parentElement).toHaveClass('border-transparent');
  });

  it('should render a blue border when selected', () => {
    // Arrange
    render(<RegionButton label="Local Region" icon={localRegionIcon} selected />);
    const localRegionButton = screen.getByText('Local Region');

    // Assert
    expect(localRegionButton.parentElement).toHaveClass('border-imos-sea-blue');
  });
});
