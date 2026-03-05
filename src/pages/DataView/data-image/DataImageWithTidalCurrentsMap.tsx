import React, { useCallback, useEffect, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import ErrorImage from '@/components/Shared/ErrorImage/ErrorImage';
import { scaleImageMapAreas } from '@/utils/general-utils/general';
import { AnyProductID, Product } from '@/types/product';
import regionArr from '@/data/tidalCurrents';
import { MapImageAreas } from '@/types/dataImage';
import { DateFormat } from '@/types/date';
import { getTidalCurrentsTagsData } from '@/services/tidalCurrents';
import { useResizeObserver } from '@/hooks';
import { useTidalCurrentPoint } from '../product-content/hooks/useTidalCurrentPoint';

type DataImageWithTidalCurrentsMapProps = {
  mainProduct: Product | null;
  src: string;
  productId: string;
  date: Dayjs;
  region: string;
};

const DataImageWithTidalCurrentsMap: React.FC<DataImageWithTidalCurrentsMapProps> = ({
  mainProduct,
  src,
  productId,
  date,
  region,
}) => {
  const [_, setSearchParams] = useSearchParams();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [imgLoadError, setImgLoadError] = useState<string | null>(null);
  const [areas, setAreas] = useState<MapImageAreas[]>();
  const { isTidalCurrentsPointSelected } = useTidalCurrentPoint(productId as AnyProductID);

  const { data: tagData = [] } = useQuery({
    queryKey: [date, productId, region],
    queryFn: async () => {
      if (region === 'Aust') return regionArr;
      return await getTidalCurrentsTagsData(date, productId, region);
    },
    enabled: !!date && !!productId && !!region && !isTidalCurrentsPointSelected,
  });

  useEffect(() => {
    setImgLoadError(null);
  }, [src]);

  const handleImageLoad = async (tagData: MapImageAreas[] | Record<string, string | number[]>[]) => {
    if (!imgRef.current) return;
    const { naturalWidth: originalWidth, naturalHeight: originalHeight, width, height } = imgRef.current;
    if (!originalWidth || !originalHeight || !width || !height) return;
    const convertedCoords = scaleImageMapAreas(originalWidth, originalHeight, width, height, tagData as []);
    setAreas(convertedCoords);
  };

  useResizeObserver(
    'window',
    useCallback(() => {
      if (isTidalCurrentsPointSelected) return;
      handleImageLoad(tagData);
    }, [isTidalCurrentsPointSelected, tagData]),
  );

  useEffect(() => {
    const imgElement = imgRef.current;
    if (imgElement?.complete && imgElement.naturalWidth > 0 && !isTidalCurrentsPointSelected) {
      handleImageLoad(tagData);
    }
  }, [isTidalCurrentsPointSelected, tagData]);

  const handleAreaClick = (area: MapImageAreas) => {
    const { type, href } = area;

    if (type === 'region') {
      setSearchParams({
        region: area.name,
        date: date.format(DateFormat.MINUTE),
      });
    }

    if (type === 'point') {
      const cleanedHref = href.split('/')[3].replace('.html', '');
      const pointName = cleanedHref.substring(0, cleanedHref.lastIndexOf('_')); // remove the date

      setSearchParams({
        region,
        date: date.format(DateFormat.MONTH),
        point: pointName,
      });
    }
  };

  if (!src || imgLoadError) {
    return <ErrorImage productId={mainProduct!.key} date={dayjs(date)} />;
  }

  return (
    <div className="relative inline-block h-full w-full bg-white">
      <img
        ref={imgRef}
        src={src}
        alt={`${productId} data`}
        useMap="#tidal-currents-map"
        className="max-h-[80vh] select-none object-contain"
        onLoad={() => !isTidalCurrentsPointSelected && handleImageLoad(tagData)}
        onError={() => {
          setImgLoadError('Image not available');
        }}
      />
      <map name="tidal-currents-map">
        {areas?.map((area, index) => (
          <area
            key={index}
            className="cursor-pointer"
            shape={area.shape}
            coords={area.coords.join(',')}
            alt={area.alt}
            onClick={() => handleAreaClick(area)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleAreaClick(area);
              }
            }}
            tabIndex={0}
            title={area.name}
            role="link"
          />
        ))}
      </map>
    </div>
  );
};

export default DataImageWithTidalCurrentsMap;
