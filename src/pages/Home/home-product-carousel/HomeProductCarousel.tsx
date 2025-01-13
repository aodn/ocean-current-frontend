import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowIcon from '@/assets/icons/Arrow';
import { color } from '@/styles/colors';
import { useDeviceType } from '@/hooks';
import { linksData } from '@/data/linksData';

const productCarouselData = linksData.flatMap((category) => {
  if (category.links && category.links.length > 0) return category.links;
  return [];
});

const HomeProductCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerRow, setItemsPerRow] = useState(3);
  const { isMobile, isTablet, isDesktop } = useDeviceType();

  useEffect(() => {
    if (isDesktop) {
      setItemsPerRow(7);
    } else if (isTablet) {
      setItemsPerRow(4);
    } else if (isMobile) {
      setItemsPerRow(1);
    }
  }, [isMobile, isTablet, isDesktop]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, productCarouselData.length - itemsPerRow));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const itemWidth = 128;
  const gapWidth = 16;

  const totalWidth = productCarouselData.length * itemWidth + (productCarouselData.length - 1) * gapWidth;

  const translateX = -(currentIndex * (itemWidth + gapWidth));

  const arrowStyle = 'm-3 md:m-5 w-8 h-full mt-10 md:mt-14 bg-white';
  const arrowDisabledStyle = 'cursor-not-allowed opacity-20';

  return (
    <>
      <button
        onClick={handlePrev}
        className={`${arrowStyle} rotate-90 ${currentIndex === 0 ? arrowDisabledStyle : ''}`}
      >
        <ArrowIcon stroke={color.horizonBlue} strokeWidth={1} />
      </button>

      <div className="relative w-full overflow-hidden">
        <div
          data-testid="carousel-container"
          className="flex gap-2 transition-transform duration-300 ease-in-out md:gap-4"
          style={{
            transform: `translateX(${translateX}px)`,
            width: `${totalWidth}px`,
          }}
        >
          {productCarouselData.map(({ id, url, blueIcon, description, title }) => (
            <div key={id} className="mt-2 w-24 flex-shrink-0 md:w-32">
              <Link
                to={url}
                className="flex h-24 flex-col items-center justify-center rounded-xl bg-imos-light-blue p-4 transition duration-300 ease-in-out hover:border-[3px] hover:border-imos-deep-blue hover:bg-white md:h-32"
              >
                <img src={blueIcon} alt={description} className="h-full w-full" />
              </Link>
              <div className="p-2 text-center font-poppins text-sm font-medium text-imos-text-grey md:text-base">
                {title}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        className={`${arrowStyle} -rotate-90 ${currentIndex === productCarouselData.length - itemsPerRow ? arrowDisabledStyle : ''}`}
      >
        <ArrowIcon stroke={color.horizonBlue} strokeWidth={1} />
      </button>
    </>
  );
};

export default HomeProductCarousel;
