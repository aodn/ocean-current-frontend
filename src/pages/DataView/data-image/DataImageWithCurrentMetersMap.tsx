import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
// import { getArgoProfileCyclesByWmoId } from '@/services/argo';
// import { findMostRecentDateBefore } from '@/utils/date-utils/date';
// import { calculateImageScales } from '@/utils/general-utils/general';
// import { ArgoTagMapArea } from '@/types/argo';
// import { convertCoordsBasedOnImageScale } from '@/utils/argo-utils/argoTag';
import ErrorImage from '@/components/Shared/ErrorImage/ErrorImage';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
// import { useImageArgoTags } from '@/services/hooks';
// import { currentMetersRegionAreasMap } from '@/data/current-meter/region-list';
import { DataImageWithCurrentMetersMapProps } from './types/DataImageWithCurrentMetersMap.types';

const DataImageWithCurrentMetersMap: React.FC<DataImageWithCurrentMetersMapProps> = ({
  src,
  productId,
  regionCode,
  date,
}) => {
  const dateFormatted = dayjs(date).format('YYYYMMDD');
  const imgRef = useRef<HTMLImageElement | null>(null);
  // const [coords, setCoords] = useState<ArgoTagMapArea[]>([]);
  const [imgLoadError, setImgLoadError] = useState<string | null>(null);
  const { mainProduct } = useProductConvert();
  const alt = `${productId} data in ${regionCode} at ${dateFormatted}`;

  // const regionArr = currentMetersRegionAreasMap[regionCode];

  // const coords = regionArr.map((item) => ({
  //   shape: 'rect' as const,
  //   coords: item.coords,
  //   title: item.title,
  //   href: `/product/current-meters?plot=1&point=${item.name}`,
  // }));

  useEffect(() => {
    setImgLoadError(null);
  }, [src]);

  // const handleCircleClick = async (area: ArgoTagMapArea) => {
  //   const { data } = await getArgoProfileCyclesByWmoId(area.wmoId.toString());
  //   const dates = data.map((item) => item.date);
  //   const mostRecentDate = findMostRecentDateBefore(dates, dateFormatted);
  //   const mostRecentItem = data.find((item) => item.date === mostRecentDate);

  //   if (!mostRecentItem) {
  //     return;
  //   }

  //   const newPath = `/product/argo?wmoid=${area.wmoId}&cycle=${mostRecentItem.cycle}&depth=0&date=${mostRecentDate}`;

  //   window.open(newPath, '_blank', 'noopener,noreferrer');
  // };

  if (imgLoadError) {
    return <ErrorImage product={mainProduct!} date={date} />;
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
      {/* <map name="argo-tag-map">
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
      </map> */}
    </div>
  );
};

export default DataImageWithCurrentMetersMap;
