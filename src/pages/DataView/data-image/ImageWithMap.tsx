import React, { useEffect, useRef, useState } from 'react';
import { getArgoProfileCyclesByWmoId } from '@/services/argo';
import { findMostRecentDateBefore } from '@/utils/date-utils/date';
import { calculateImageScales } from '@/utils/general-utils/general';
import { ArgoTagMapArea } from '@/types/argo';
import { convertCoordsBasedOnImageScale } from '@/utils/argo-utils/argoTag';
import { ImageWithMapProps } from './types/imageWithMap.types';

const ImageWithMap: React.FC<ImageWithMapProps> = ({ src, alt, originalCoords, dateString }) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [coords, setCoords] = useState<ArgoTagMapArea[]>([]);
  const [imgLoadError, setImgLoadError] = useState<string | null>(null);

  useEffect(() => {
    setImgLoadError(null);
  }, [src]);

  useEffect(() => {
    const handleLoad = () => {
      if (imgRef.current) {
        const originalWidth = imgRef.current.naturalWidth;
        const originalHeight = imgRef.current.naturalHeight;
        const width = imgRef.current.width;
        const height = imgRef.current.height;

        const { scaleX, scaleY } = calculateImageScales(originalWidth, originalHeight, width, height);

        const convertedCoords = convertCoordsBasedOnImageScale(originalCoords, scaleX, scaleY, originalHeight);

        setCoords(convertedCoords);
      }
    };
    const imageElement = imgRef.current;
    if (imageElement) {
      imageElement.complete ? handleLoad() : imageElement.addEventListener('load', handleLoad);
    }

    return () => {
      if (imageElement) {
        imageElement.removeEventListener('load', handleLoad);
      }
    };
  }, [src, originalCoords]);

  const handleCircleClick = async (area: ArgoTagMapArea) => {
    const { data } = await getArgoProfileCyclesByWmoId(area.wmoId.toString());

    const dates = data.map((item) => item.date);
    const mostRecentDate = findMostRecentDateBefore(dates, dateString);

    const mostRecentItem = data.find((item) => item.date === mostRecentDate);
    if (!mostRecentItem) {
      return;
    }

    const newPath = `/product/argo?wmoid=${area.wmoId}&cycle=${mostRecentItem.cycle}&depth=0&date=${mostRecentDate}`;

    window.open(newPath, '_blank', 'noopener,noreferrer');
  };

  if (imgLoadError) {
    // TODO: Add error handling component
    return <div>Error: {imgLoadError}</div>;
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
            onClick={() => handleCircleClick(area)}
            aria-hidden="true"
          />
        ))}
      </map>
    </div>
  );
};

export default ImageWithMap;
