/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { getArgoProfileCyclesByWmoId } from '@/services/argo';
import { findMostRecentDateBefore } from '@/utils/date-utils/date';
import { ArgoTagMapArea } from '@/types/argo';
import ErrorImage from '@/components/Shared/ErrorImage/ErrorImage';
import useDateStore from '@/stores/date-store/dateStore';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import { InteractiveImageWithMapProps } from './types/imageWithMap.types';

const ImageWithCurrentMeterMap: React.FC<InteractiveImageWithMapProps> = ({ src, alt }) => {
  interface CurrentMeterCoord {
    shape: string;
    // coords: [number, number, number, number];
    coords: number[];
    href: string;
    title: string;
    alt: string;
  }

  const regionArr = [
    {
      shape: 'rect',
      coords: [495, 174, 504, 184],
      href: '../NWSROW/index.html',
      alt: 'NWSROW',
      title: 'NWSROW',
    },
    {
      shape: 'rect',
      coords: [852, 498, 909, 509],
      href: '../NWSROW/index.html',
      alt: 'NWSROW',
      title: 'NWSROW',
    },
  ];

  const imgRef = useRef<HTMLImageElement | null>(null);
  const [coords, setCoords] = useState<CurrentMeterCoord[]>(regionArr);
  const [imgLoadError, setImgLoadError] = useState<string | null>(null);
  const useDate = useDateStore((state) => state.date);
  const { mainProduct } = useProductConvert();

  useEffect(() => {
    setImgLoadError(null);
  }, [src]);

  // useEffect(() => {
  //   const handleLoad = () => {
  //     if (imgRef.current) {
  //       const originalWidth = imgRef.current.naturalWidth;
  //       const originalHeight = imgRef.current.naturalHeight;
  //       const width = imgRef.current.width;
  //       const height = imgRef.current.height;

  //       const { scaleX, scaleY } = calculateImageScales(originalWidth, originalHeight, width, height);

  //       const convertedCoords = convertCoordsBasedOnImageScale(originalCoords, scaleX, scaleY, originalHeight);

  //       setCoords(convertedCoords);
  //     }
  //   };
  //   const imageElement = imgRef.current;
  //   if (imageElement) {
  //     imageElement.complete ? handleLoad() : imageElement.addEventListener('load', handleLoad);
  //   }

  //   return () => {
  //     if (imageElement) {
  //       imageElement.removeEventListener('load', handleLoad);
  //     }
  //   };
  // }, [src, originalCoords]);

  // console.log('ImageWithMap CurrentMeter rendered');

  const handleCircleClick = async () => {
    // console.log('clicked');
    // const { data } = await getArgoProfileCyclesByWmoId(area.wmoId.toString());
    // const dates = data.map((item) => item.date);
    // const mostRecentDate = findMostRecentDateBefore(dates, dateString);
    // const mostRecentItem = data.find((item) => item.date === mostRecentDate);
    // if (!mostRecentItem) {
    //   return;
    // }
    // const newPath = `/product/argo?wmoid=${area.wmoId}&cycle=${mostRecentItem.cycle}&depth=0&date=${mostRecentDate}`;
    // window.open(newPath, '_blank', 'noopener,noreferrer');
  };

  if (imgLoadError) {
    return <ErrorImage product={mainProduct!} date={useDate} />;
  }

  return (
    <div className="relative inline-block w-full">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        useMap="#argo-tag-map"
        className="max-h-[80vh] select-none object-contain"
        onError={() => {
          setImgLoadError('Image not available');
        }}
      />
      <map name="argo-tag-map">
        {coords.map((area, index) => (
          <area
            key={index}
            className="cursor-pointer"
            shape={area.shape}
            coords={area.coords.join(',')}
            alt={area.alt || `Area ${index + 1}`}
            onClick={handleCircleClick}
            aria-hidden="true"
          />
        ))}
      </map>
    </div>
  );
};

export default ImageWithCurrentMeterMap;
