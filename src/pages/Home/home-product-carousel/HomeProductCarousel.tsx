import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { ArrowIcon } from '@/components/Shared/Icons';
import { useDeviceTypes } from '@/hooks/useMediaQuery';
import { useElementMetrics } from '@/hooks/useElementMetrics';
import { linksData } from '@/data/linksData';
import { cn } from '@/utils/classname-util/cn';

const productCarouselData = linksData.flatMap((category) => {
  if (category.links && category.links.length > 0) return category.links;
  return [];
});

const HomeProductCarousel: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { isMobile, isTablet, isDesktop } = useDeviceTypes();

  const { itemRef, containerRef, metrics } = useElementMetrics({
    containerTestId: 'carousel-container',
    dependencies: [isMobile, isTablet, isDesktop],
  });

  // Reset scroll position when device type changes
  useEffect(() => {
    setScrollPosition(0);
  }, [isMobile, isTablet, isDesktop]);

  const { itemWidth, gapWidth, containerWidth } = metrics;

  // Memoize calculated values to avoid redundant calculations
  const carouselMetrics = useMemo(() => {
    const scrollStep = itemWidth + gapWidth;
    const totalWidth =
      itemWidth > 0 ? productCarouselData.length * itemWidth + (productCarouselData.length - 1) * gapWidth : 0;
    const maxScroll = Math.max(0, totalWidth - containerWidth);

    return { scrollStep, totalWidth, maxScroll };
  }, [itemWidth, gapWidth, containerWidth]);

  const handleNext = () => {
    if (itemWidth === 0) return;

    setScrollPosition((prev) => {
      const newPosition = prev + carouselMetrics.scrollStep;
      return Math.min(newPosition, carouselMetrics.maxScroll);
    });
  };

  const handlePrev = () => {
    if (itemWidth === 0) return;

    setScrollPosition((prev) => {
      const newPosition = prev - carouselMetrics.scrollStep;
      return Math.max(newPosition, 0);
    });
  };

  const isAtStart = scrollPosition <= 0;
  const isAtEnd = scrollPosition >= carouselMetrics.maxScroll;

  return (
    <div className="flex w-full items-center gap-x-4">
      <button
        onClick={handlePrev}
        disabled={isAtStart}
        className={cn('-mt-16 rotate-90 bg-transparent', isAtStart && 'cursor-not-allowed opacity-20')}
      >
        <ArrowIcon color="imos-sea-blue" size="xl" strokeWidth={1.2} />
      </button>

      <div ref={containerRef} className="relative w-full overflow-hidden">
        <div
          data-testid="carousel-container"
          className="flex gap-2 transition-transform duration-300 ease-in-out md:gap-4"
          style={{ transform: `translateX(-${scrollPosition}px)`, width: `${carouselMetrics.totalWidth}px` }}
        >
          {productCarouselData.map(({ id, url, Icon, title }, index) => (
            <div key={id} ref={index === 0 ? itemRef : null} className="mt-2 w-24 flex-shrink-0 md:w-32">
              <Link
                to={url}
                className={cn(
                  'flex h-24 flex-col items-center justify-center rounded-xl bg-imos-light-blue p-4',
                  'transition duration-300 ease-in-out',
                  'hover:border-[3px] hover:border-imos-deep-blue hover:bg-white',
                  'md:h-32',
                )}
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
        disabled={isAtEnd}
        className={cn('-mt-16 -rotate-90 bg-transparent', isAtEnd && 'cursor-not-allowed opacity-20')}
      >
        <ArrowIcon color="imos-sea-blue" size="xl" strokeWidth={1.2} />
      </button>
    </div>
  );
};

export default HomeProductCarousel;
