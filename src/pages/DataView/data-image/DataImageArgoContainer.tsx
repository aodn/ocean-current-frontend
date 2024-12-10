import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useImageArgoTags } from '@/services/hooks';
import { convertProductWithArgoCoordsOffset, getArgoTagFilePathByProductId } from '@/utils/argo-utils/argoTag';
import { RegionScope } from '@/constants/region';
// import { AreaShape } from '@/types/dataImage';
import { getArgoProfileCyclesByWmoId } from '@/services/argo';
import { findMostRecentDateBefore } from '@/utils/date-utils/date';
import { ArgoTagMapArea } from '@/types/argo';
import InteractiveImageWithMap from './InteractiveImageWithMap';
import { DataImageArgoContainerProps } from './types/dataImage.types';

const DataImageArgoContainer: React.FC<DataImageArgoContainerProps> = ({
  src,
  productId,
  date,
  regionCode,
  regionScope,
}) => {
  const argoTagFilePathValue = getArgoTagFilePathByProductId(productId);
  const [originalHeight, setOriginalHeight] = React.useState<number | null>(null);

  const argoTagFilePath = regionScope === RegionScope.Local ? argoTagFilePathValue?.local : argoTagFilePathValue?.state;

  if (!argoTagFilePathValue || !argoTagFilePath) {
    throw new Error(`Argo tag file path not found for product id: ${productId}`);
  }

  const { data } = useImageArgoTags(date, argoTagFilePath, regionCode);

  const dateFormatted = dayjs(date).format('YYYYMMDD');

  const [offsetAreas, setOffsetAreas] = useState<ArgoTagMapArea[]>([]);

  // console.log('useeffec', data, originalHeight);

  useEffect(() => {
    if (!data || data.length === 0 || !originalHeight) {
      return;
    }
    const originalAreas = data?.map((item) => ({
      shape: 'circle' as const,
      coords: [item.coordX, item.coordY, 10],
      href: `/product/argo?wmoid=${item.wmoId}&cycle=${item.cycle}&depth=0&date=${dateFormatted}`,
      wmoId: item.wmoId,
      cycle: item.cycle,
    }));

    const offsetAreas = originalAreas.map((area) => {
      const coords = convertProductWithArgoCoordsOffset(area.coords, originalHeight);
      return {
        ...area,
        coords,
      };
    }) as ArgoTagMapArea[];

    // setOffsetAreas((prevData) => (prevData === null ? offsetAreas : prevData));

    setOffsetAreas(offsetAreas);
    // setOffsetAreas((prevAreas) => {
    //   if (JSON.stringify(prevAreas) !== JSON.stringify(offsetAreas)) {
    //     return offsetAreas;
    //   }
    //   return prevAreas;
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data), dateFormatted, originalHeight]);
  // console.log('update offsetAreas', offsetAreas);
  const imgAlt = `${productId} data in ${regionCode} at ${dateFormatted}`;

  const handleAreaClick = async (area: ArgoTagMapArea) => {
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

  const handleImageLoad = (originalHeight: number) => {
    setOriginalHeight(originalHeight);
  };

  // console.log('data', data);
  // console.log('offsetAreas', offsetAreas);

  // const imgRef = useRef<ImageRefHandle | null>(null);

  // useEffect(() => {
  //   if (imgRef.current) {
  //     console.log('imgRef.current', imgRef.current.naturalHeight);
  //   }
  // }, [imgRef]);

  // useEffect(() => {
  //   const handleLoad = () => {
  //     console.log('loaded!!!!!!!!!!!!!!!!!');

  //     if (imgRef.current) {
  //       const originalWidth = imgRef.current.naturalWidth;
  //       const originalHeight = imgRef.current.naturalHeight;
  //       const width = imgRef.current.width;
  //       const height = imgRef.current.height;
  //       // if (handleImageLoad) {
  //       //   handleImageLoad(originalHeight);
  //       // }

  //       // if (!data || data.length === 0 || !originalHeight) {
  //       //   return;
  //       // }
  //       if (!data || data.length === 0) {
  //         return;
  //       }
  //       const originalAreas = data?.map((item) => ({
  //         shape: 'circle' as const,
  //         coords: [item.coordX, item.coordY, 10],
  //         href: `/product/argo?wmoid=${item.wmoId}&cycle=${item.cycle}&depth=0&date=${dateFormatted}`,
  //         wmoId: item.wmoId,
  //         cycle: item.cycle,
  //       }));

  //       // const offsetAreas = originalAreas.map((area) => {
  //       //   const coords = convertProductWithArgoCoordsOffset(area.coords, originalHeight);
  //       //   return {
  //       //     ...area,
  //       //     coords,
  //       //   };
  //       // });
  //       const offsetAreas = originalAreas.map((area) => {
  //         const coords = convertProductWithArgoCoordsOffset(area.coords, originalHeight);
  //         return {
  //           ...area,
  //           coords,
  //         };
  //       });

  //       const { scaleX, scaleY } = calculateImageScales(originalWidth, originalHeight, width, height);

  //       const convertedCoords = convertCoordsBasedOnImageScale(offsetAreas, scaleX, scaleY) as ArgoTagMapArea[];

  //       console.log('originalAreas', originalAreas);
  //       console.log('convertedCoords', convertedCoords);

  //       setOffsetAreas(convertedCoords);
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
  // }, [src, JSON.stringify(data), dateFormatted]);

  return (
    <InteractiveImageWithMap
      originalAreas={offsetAreas}
      src={src}
      alt={imgAlt}
      onAreaClick={handleAreaClick}
      onImageLoad={handleImageLoad}
      // ref={imgRef}
    />
  );
};

export default DataImageArgoContainer;
