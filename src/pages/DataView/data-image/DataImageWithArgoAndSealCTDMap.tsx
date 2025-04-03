import React, { useEffect, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { getArgoProfileCyclesByWmoId } from '@/services/argo';
import { findMostRecentDateBefore } from '@/utils/date-utils/date';
import { calculateImageScales } from '@/utils/general-utils/general';
import { ArgoTagMapArea } from '@/types/argo';
import { convertCoordsBasedOnImageScale, getArgoTagFilePathByProductId } from '@/utils/argo-utils/argoTag';
import ErrorImage from '@/components/Shared/ErrorImage/ErrorImage';
import { useImageArgoTags } from '@/services/hooks';
import { MapImageAreas } from '@/types/dataImage';
import { ProductID } from '@/types/product';

type DataImageWithArgoAndSealCTDMapProps = {
  src: string;
  productId: string;
  regionTitle: string;
  date: Dayjs;
};

const DataImageWithArgoAndSealCTDMap: React.FC<DataImageWithArgoAndSealCTDMapProps> = ({
  src,
  productId,
  regionTitle,
  date,
}) => {
  const argoTagFilePathValue = getArgoTagFilePathByProductId(productId);
  const argoTagFilePath = argoTagFilePathValue?.state;

  if (!argoTagFilePathValue || !argoTagFilePath) {
    throw new Error(`Argo tag file path not found for product id: ${productId}`);
  }

  const dateFormatted = dayjs(date).format('YYYYMMDD');
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [argoCoords, setArgoCoords] = useState<ArgoTagMapArea[]>([]);
  const [sealCoords] = useState<MapImageAreas[]>([]);
  const [imgLoadError, setImgLoadError] = useState<string | null>(null);

  const { data } = useImageArgoTags(date, argoTagFilePath, regionTitle);

  useEffect(() => {
    setImgLoadError(null);
  }, [src]);

  useEffect(() => {
    const handleLoad = () => {
      if (imgRef.current) {
        const { naturalWidth, naturalHeight, width, height } = imgRef.current;
        const { scaleX, scaleY } = calculateImageScales(naturalWidth, naturalHeight, width, height);
        const originalCoords = data.map((item) => ({
          shape: 'circle',
          coords: [item.coordX, item.coordY, 10],
          href: `/product/argo?wmoid=${item.wmoId}&cycle=${item.cycle}&depth=0&date=${dateFormatted}`,
          wmoId: item.wmoId,
          cycle: item.cycle,
        }));
        const convertedCoords = convertCoordsBasedOnImageScale(originalCoords, scaleX, scaleY, naturalHeight);
        setArgoCoords(convertedCoords);
      }
    };

    const imageElement = imgRef.current;
    if (imageElement) {
      if (imageElement.complete) {
        handleLoad();
      } else {
        imageElement.addEventListener('load', handleLoad);
      }
    }

    return () => {
      if (imageElement) {
        imageElement.removeEventListener('load', handleLoad);
      }
    };
  }, [data, dateFormatted, src]);

  const handleCircleClick = async (area: ArgoTagMapArea) => {
    const { data } = await getArgoProfileCyclesByWmoId(area.wmoId.toString());
    const dates = data.map((item) => item.date);
    const mostRecentDate = findMostRecentDateBefore(dates, dateFormatted);
    const mostRecentItem = data.find((item) => item.date === mostRecentDate);

    if (!mostRecentItem) {
      return;
    }

    const newPath = `/product/argo?wmoid=${area.wmoId}&cycle=${mostRecentItem.cycle}&depth=0&date=${mostRecentDate}`;

    window.open(newPath, '_blank', 'noopener,noreferrer');
  };

  if (imgLoadError) {
    return <ErrorImage productId={productId.split('-')[0] as ProductID} date={date} />;
  }

  return (
    <div className="relative inline-block h-full w-full bg-white">
      <img
        ref={imgRef}
        src={src}
        alt={`Argo and Seal locations in ${regionTitle}`}
        useMap="#argo-and-seal-tag-map"
        className="max-h-[80vh] w-full select-none object-contain"
        onError={() => {
          setImgLoadError('Image not available');
        }}
      />
      <map name="argo-and-seal-tag-map">
        {argoCoords.map((area, index) => (
          <area
            key={index}
            shape={area.shape}
            coords={area.coords.join(',')}
            alt={`Argo wmoId ${area.wmoId}`}
            onClick={() => handleCircleClick(area)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCircleClick(area);
              }
            }}
            tabIndex={0}
            title={`Argo wmoId ${area.wmoId}`}
            role="link"
            className="cursor-pointer"
          />
        ))}
        {sealCoords.map((area, index) => (
          <area
            key={index}
            shape={area.shape}
            coords={area.coords.join(',')}
            alt={`Seal tag ${area.name}`}
            onClick={() => {}}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
              }
            }}
            tabIndex={0}
            title={`Seal tag ${area.name}`}
            role="link"
            className="cursor-pointer"
          />
        ))}
      </map>
    </div>
  );
};

export default DataImageWithArgoAndSealCTDMap;
