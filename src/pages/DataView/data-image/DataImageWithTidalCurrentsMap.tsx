import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { buildTidalCurrentsTagFileUrl } from '@/utils/data-image-builder-utils/dataImgBuilder';
import { ImageListResponse } from '@/types/imageList';
import { useResizeObserver } from '@/hooks';
import { sharedQueryConfig } from '@/configs/query';
import useProductStore, { setIsProductImageLoading } from '@/stores/product-store/productStore';
import { LinearProgress } from '@/components/Shared';
import { cn } from '@/utils/classname-util/cn';
import { useTidalCurrentPoint } from '../product-content/hooks/useTidalCurrentPoint';

type DataImageWithTidalCurrentsMapProps = {
  mainProduct: Product | null;
  src: string;
  productId: ProductID;
  date: Dayjs;
  region: string;
  tidalCurrentsImageData?: ImageListResponse[];
};

// Stable fallback: a new `[]` on every render (while the TAG query is pending, disabled or
// failed) changes `tagData`, re-runs the effect below and loops via setAreas.
const NO_TAGS: Record<string, string | number[]>[] = [];

const DataImageWithTidalCurrentsMap: React.FC<DataImageWithTidalCurrentsMapProps> = ({
  mainProduct,
  src,
  productId,
  date,
  region,
  tidalCurrentsImageData,
}) => {
  const [_, setSearchParams] = useSearchParams();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [imgErrorSrc, setImgErrorSrc] = useState<string | null>(null);
  const imgLoadError = imgErrorSrc === src;
  const [areas, setAreas] = useState<MapImageAreas[]>();
  const { isTidalCurrentsPointSelected } = useTidalCurrentPoint(productId);
  const isProductImageLoading = useProductStore((state) => state.isProductImageLoading);
  const renderedSrc = useRef('');
  const tagFileUrl = useMemo(
    () => buildTidalCurrentsTagFileUrl(region, productId, date, tidalCurrentsImageData),
    [region, productId, date, tidalCurrentsImageData],
  );

  const { data: apiTagData = NO_TAGS } = useQuery({
    queryKey: ['tidalCurrentsTags', tagFileUrl],
    queryFn: async () => {
      return await getTidalCurrentsTagsData(tagFileUrl);
    },
    // Wait for the image list so the TAG file comes from the same folder as the image.
    // 'Aust' uses the static regionArr areas instead.
    enabled:
      !!date &&
      !!productId &&
      !!region &&
      region !== 'Aust' &&
      !!tidalCurrentsImageData &&
      !isTidalCurrentsPointSelected,
    ...sharedQueryConfig,
  });

  const tagData = region === 'Aust' ? regionArr : apiTagData;

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

  // Ensure product image loading state is false, when date update but src remains the same. As the cached image will not trigger onLoad again.
  useEffect(() => {
    if (renderedSrc.current === src) {
      setIsProductImageLoading(false);
    }
  }, [src, date]);

  if (!src || imgLoadError) {
    return <ErrorImage productId={mainProduct!.key} date={dayjs(date)} />;
  }

  return (
    <div className="relative inline-block h-full w-full bg-white">
      {isProductImageLoading ? (
        <LinearProgress className="absolute top-0 right-0 left-0" />
      ) : (
        <div className="h-1 w-full" />
      )}
      <div className={cn('relative inline-block h-full w-full bg-white')}>
        <img
          ref={imgRef}
          src={src}
          alt={`${productId} data`}
          useMap="#tidal-currents-map"
          className="max-h-[80vh] object-contain select-none"
          onLoad={() => {
            if (!isTidalCurrentsPointSelected) handleImageLoad(tagData);
            renderedSrc.current = src;
            setIsProductImageLoading(false);
          }}
          onError={() => {
            setImgErrorSrc(src);
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
