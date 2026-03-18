import { Link } from 'react-router';

interface CarouselStaticImageProps {
  src: string;
  alt: string;
  href: string;
}

const CarouselStaticImage: React.FC<CarouselStaticImageProps> = ({ src, alt, href }) => (
  <Link to={href} className="absolute inset-0">
    <img
      src={src}
      alt={alt}
      className="h-full w-full rounded-t-xl border-x border-t border-solid border-imos-calypso-blue border-opacity-60 object-contain"
    />
  </Link>
);

export default CarouselStaticImage;
