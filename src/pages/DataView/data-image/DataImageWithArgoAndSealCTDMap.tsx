import React, { useEffect, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { getArgoProfileCyclesByWmoId } from '@/services/argo';
import { findMostRecentDateBefore } from '@/utils/date-utils/date';
import { calculateImageScales } from '@/utils/general-utils/general';
import { ArgoTagMapArea } from '@/types/argo';
import { convertCoordsBasedOnImageScale, getArgoTagFilePathByProductId } from '@/utils/argo-utils/argoTag';
import ErrorImage from '@/components/Shared/ErrorImage/ErrorImage';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import { RegionScope } from '@/constants/region';
import { useImageArgoTags } from '@/services/hooks';

type DataImageWithArgoAndSealCTDMapProps = {
  src: string;
  productId: string;
  regionCode: string;
  regionScope?: RegionScope;
  date: Dayjs;
};

const DataImageWithArgoAndSealCTDMap: React.FC<DataImageWithArgoAndSealCTDMapProps> = ({
  src,
  productId,
  regionCode,
  regionScope,
  date,
}) => {
  const argoTagFilePathValue = getArgoTagFilePathByProductId(productId);
  const argoTagFilePath = regionScope === RegionScope.Local ? argoTagFilePathValue?.local : argoTagFilePathValue?.state;

  if (!argoTagFilePathValue || !argoTagFilePath) {
    throw new Error(`Argo tag file path not found for product id: ${productId}`);
  }

  const dateFormatted = dayjs(date).format('YYYYMMDD');
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [coords, setCoords] = useState<ArgoTagMapArea[]>([]);
  const [imgLoadError, setImgLoadError] = useState<string | null>(null);
  const { mainProduct } = useProductConvert();
  const { data } = useImageArgoTags(date, argoTagFilePath, regionCode);
  const alt = `${productId} data in ${regionCode} at ${dateFormatted}`;

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
        setCoords(convertedCoords);
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
    return <ErrorImage productId={mainProduct!.key} date={date} />;
  }

  return (
    <div className="relative inline-block h-full w-full bg-white">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        useMap="#argo-tag-map"
        className="max-h-[80vh] w-full select-none object-contain"
        onError={() => {
          setImgLoadError('Image not available');
        }}
      />
      <map name="argo-tag-map">
        {coords.map((area, index) => (
          <area
            key={index}
            shape={area.shape}
            coords={area.coords.join(',')}
            alt={area.alt || `Area ${index + 1}`}
            onClick={() => handleCircleClick(area)}
            aria-hidden="true"
            className="cursor-pointer"
          />
        ))}
      </map>
    </div>
  );
};

export default DataImageWithArgoAndSealCTDMap;
