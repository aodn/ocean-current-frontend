import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import CarouselStaticImage from './CarouselStaticImage';

const renderComponent = (props: { src: string; alt: string; href: string }) =>
  render(
    <MemoryRouter>
      <CarouselStaticImage {...props} />
    </MemoryRouter>,
  );

describe('CarouselStaticImage', () => {
  it('matches snapshot', () => {
    const { container } = renderComponent({
      src: 'https://example.com/image.gif',
      alt: 'SealCTD',
      href: '/product/seal-ctd/tracks?region=POLAR&date=20250101',
    });
    expect(container).toMatchSnapshot();
  });

  it('renders an image with the correct src and alt', () => {
    renderComponent({
      src: 'https://example.com/image.gif',
      alt: 'SealCTD',
      href: '/product/seal-ctd/tracks?region=POLAR',
    });

    const img = screen.getByRole('img', { name: 'SealCTD' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/image.gif');
  });

  it('wraps the image in a link pointing to the given href', () => {
    renderComponent({
      src: 'https://example.com/image.gif',
      alt: 'SealCTD',
      href: '/product/seal-ctd/tracks?region=POLAR&date=20250101',
    });

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/product/seal-ctd/tracks?region=POLAR&date=20250101');
  });
});
