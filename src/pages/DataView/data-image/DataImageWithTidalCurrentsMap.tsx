import React, { useCallback, useEffect, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import ErrorImage from '@/components/Shared/ErrorImage/ErrorImage';
import { scaleImageMapAreas } from '@/utils/general-utils/general';
import { Product, ProductID } from '@/types/product';
import regionArr from '@/data/tidalCurrents';
import { MapImageAreas } from '@/types/dataImage';
import { DateFormat } from '@/types/date';
import { getTidalCurrentsTagsData } from '@/services/tidalCurrents';
import { useResizeObserver } from '@/hooks';
import { sharedQueryConfig } from '@/configs/query';
import useProductStore, { setIsProductImageLoading } from '@/stores/product-store/productStore';
import { Loading } from '@/components/Shared';
import { cn } from '@/utils/classname-util/cn';
import { useTidalCurrentPoint } from '../product-content/hooks/useTidalCurrentPoint';

type DataImageWithTidalCurrentsMapProps = {
  mainProduct: Product | null;
  src: string;
  productId: ProductID;
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
  const { isTidalCurrentsPointSelected } = useTidalCurrentPoint(productId);
  const { isProductImageLoading } = useProductStore((state) => ({
    isProductImageLoading: state.isProductImageLoading,
  }));

  const { data: apiTagData = [] } = useQuery({
    queryKey: ['tidalCurrentsTags', date.format(DateFormat.MINUTE), productId, region],
    queryFn: async () => {
      return await getTidalCurrentsTagsData(date, productId, region);
    },
    enabled: !!date && !!productId && !!region && !isTidalCurrentsPointSelected,
    ...sharedQueryConfig,
  });

  const tagData = region === 'Aust' ? regionArr : apiTagData;

  useEffect(() => {
    setImgLoadError(null);
  }, [src]);

  const handleImageLoad = useCallback(async (tagData: MapImageAreas[] | Record<string, string | number[]>[]) => {
    if (!imgRef.current) return;
    const { naturalWidth: originalWidth, naturalHeight: originalHeight, width, height } = imgRef.current;
    if (!originalWidth || !originalHeight || !width || !height) return;
    const convertedCoords = scaleImageMapAreas(originalWidth, originalHeight, width, height, tagData as []);
    setAreas(convertedCoords);
  }, []);

  useResizeObserver(
    'window',
    useCallback(() => {
      if (isTidalCurrentsPointSelected) return;
      handleImageLoad(tagData);
    }, [isTidalCurrentsPointSelected, tagData, handleImageLoad]),
  );

  useEffect(() => {
    const imgElement = imgRef.current;
    if (imgElement?.complete && imgElement.naturalWidth > 0 && !isTidalCurrentsPointSelected) {
      handleImageLoad(tagData);
    }
  }, [isTidalCurrentsPointSelected, tagData, handleImageLoad]);

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
      {isProductImageLoading && <Loading className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />}
      <div
        className={cn('bg-white" relative inline-block h-full w-full', {
          'invisible opacity-0': isProductImageLoading,
        })}
      >
        <img
          ref={imgRef}
          src={src}
          alt={`${productId} data`}
          useMap="#tidal-currents-map"
          className="max-h-[80vh] select-none object-contain"
          onLoad={() => {
            if (!isTidalCurrentsPointSelected) handleImageLoad(tagData);
            setIsProductImageLoading(false);
          }}
          onError={() => {
            setImgLoadError('Image not available');
            setIsProductImageLoading(false);
          }}
        />
        <map name="tidal-currents-map">
          {!isTidalCurrentsPointSelected &&
            areas?.map((area, index) => (
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
    </div>
  );
};

export default DataImageWithTidalCurrentsMap;
