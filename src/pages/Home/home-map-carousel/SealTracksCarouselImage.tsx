import { buildLatestEntryImageUrl } from '@/utils/data-image-builder-utils/latestEntryImage';
import { useRegionLatestDates } from '@/services/hooks/useRegionLatestDates';
import { ProductPath } from '@/types/router';
import CarouselStaticImage from './CarouselStaticImage';

const PRODUCT_ID = 'sealCtd-sealTracks';
const SEAL_CTD_TRACKS_PATH = `/product/${ProductPath.SEAL_CTD}/tracks`;
const POLAR_REGION = 'POLAR';

interface SealTracksCarouselImageProps {
  alt: string;
}

const SealTracksCarouselImage: React.FC<SealTracksCarouselImageProps> = ({ alt }) => {
  const imageUrl = buildLatestEntryImageUrl(PRODUCT_ID);
  const { data: latestDates } = useRegionLatestDates(PRODUCT_ID);
  const polarDate = latestDates?.regionLatestDates.find((r) => r.region === POLAR_REGION)?.latestDate;
  const href = `${SEAL_CTD_TRACKS_PATH}?region=${POLAR_REGION}${polarDate ? `&date=${polarDate}` : ''}`;

  return <CarouselStaticImage src={imageUrl} alt={alt} href={href} />;
};

export default SealTracksCarouselImage;
