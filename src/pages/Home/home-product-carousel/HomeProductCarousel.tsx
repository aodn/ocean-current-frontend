import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowIcon } from '@/components/Shared/Icons';
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

  const arrowDisabledStyle = 'cursor-not-allowed opacity-20';

  return (
    <div className="flex w-full items-center gap-x-4">
      <button
        onClick={handlePrev}
        className={`-mt-16 rotate-90 bg-transparent ${currentIndex === 0 ? arrowDisabledStyle : ''}`}
      >
        <ArrowIcon color="imos-sea-blue" size="xl" strokeWidth={1.2} />
      </button>

      <div className="relative w-full overflow-hidden">
        <div
          data-testid="carousel-container"
          className="flex gap-2 transition-transform duration-300 ease-in-out md:gap-4"
          style={{ transform: `translateX(${translateX}px)`, width: `${totalWidth}px` }}
        >
          {productCarouselData.map(({ id, url, Icon, title }) => (
            <div key={id} className="mt-2 w-24 flex-shrink-0 md:w-32">
              <Link
                to={url}
                className="flex h-24 flex-col items-center justify-center rounded-xl bg-imos-light-blue p-4 transition duration-300 ease-in-out hover:border-[3px] hover:border-imos-deep-blue hover:bg-white md:h-32"
              >
                <Icon className="h-full w-full" color="imos-deep-blue" />
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
        className={`-mt-16 -rotate-90 bg-transparent ${currentIndex === productCarouselData.length - itemsPerRow ? arrowDisabledStyle : ''}`}
      >
        <ArrowIcon color="imos-sea-blue" size="xl" strokeWidth={1.2} />
      </button>
    </div>
  );
};

export default HomeProductCarousel;
