import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowIcon from '@/assets/icons/Arrow';
import { color } from '@/styles/colors';
import { productCarouselData } from './data';

const HomeProductCarousel: React.FC = () => {
  const allProducts = productCarouselData.flatMap((section) => section.links || []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerRow, setItemsPerRow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setItemsPerRow(7);
      } else if (window.innerWidth >= 768) {
        setItemsPerRow(4);
      } else {
        setItemsPerRow(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, allProducts.length - itemsPerRow));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const itemWidth = 128;
  const gapWidth = 16;

  const totalWidth = allProducts.length * itemWidth + (allProducts.length - 1) * gapWidth;

  const translateX = -(currentIndex * (itemWidth + gapWidth));

  const arrowStyle = 'm-5 w-8 h-full mt-14 bg-white';
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
          className="flex gap-4 transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(${translateX}px)`,
            width: `${totalWidth}px`,
          }}
        >
          {allProducts.map(({ id, url, imageUrl, description, title }) => (
            <div key={id} className="w-32 flex-shrink-0">
              <Link
                to={url}
                className="flex h-32 flex-col items-center justify-center rounded-xl bg-imos-light-blue p-4 transition duration-300 ease-in-out"
              >
                <img src={imageUrl} alt={description} className="h-full w-full" />
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
        className={`${arrowStyle} -rotate-90 ${currentIndex === allProducts.length - itemsPerRow ? arrowDisabledStyle : ''}`}
      >
        <ArrowIcon stroke={color.horizonBlue} strokeWidth={1} />
      </button>
    </>
  );
};

export default HomeProductCarousel;
