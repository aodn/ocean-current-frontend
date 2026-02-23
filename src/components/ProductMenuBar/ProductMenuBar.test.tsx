import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import '@/configs/dayjs';
import ProductMenuBar from './ProductMenuBar';

vi.mock('@/components/VideoCreation/VideoCreation', () => {
  const MockedVideoCreation = () => <div>Download</div>;
  return { default: MockedVideoCreation };
});

describe('ProductMenuBar', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderComponentWithRouter = () => {
    const setShowVideo = vi.fn();
    const setShowMap = vi.fn();
    return render(
      <MemoryRouter>
        <ProductMenuBar setShowVideo={setShowVideo} setShowMap={setShowMap} />
      </MemoryRouter>,
    );
  };

  it.skip('should render successfully with correct date', () => {
    renderComponentWithRouter();
    const dateElement = screen.getByText('13 Jun 24');
    expect(dateElement).toBeInTheDocument();
  });

  it.skip('should display navigation arrows', () => {
    renderComponentWithRouter();
    const rightArrow = screen.getByRole('button', {
      name: /right arrow icon/i,
    });
    const leftArrow = screen.getByRole('button', { name: /left arrow icon/i });
    expect(rightArrow).toBeInTheDocument();
    expect(leftArrow).toBeInTheDocument();
  });

  it.skip('should display video creation component', () => {
    renderComponentWithRouter();
    const downloadElement = screen.getByText('Download');
    expect(downloadElement).toBeInTheDocument();
  });
});
