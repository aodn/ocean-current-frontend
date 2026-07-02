import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dayjs } from 'dayjs';
import { useSearchParams } from 'react-router';
import ErrorImage from '@/components/Shared/ErrorImage/ErrorImage';
import { FISHSOOP_FINDER_MAP_AREAS, getFishSoopRegionByCode, FishSoopFinderArea } from '@/constants/fishSoop';
import { calculateImageScales } from '@/utils/general-utils/general';
import { useResizeObserver } from '@/hooks';
import useProductStore, { setIsProductImageLoading } from '@/stores/product-store/productStore';
import { LinearProgress } from '@/components/Shared';
import { DateFormat } from '@/types/date';
import omitEmptyParams from '@/hooks/useQueryParams/omitEmptyParams';

type DataImageWithFishSoopMapProps = {
  src: string;
  date: Dayjs;
};

const DataImageWithFishSoopMap: React.FC<DataImageWithFishSoopMapProps> = ({ src, date }) => {
  const [_, setSearchParams] = useSearchParams();
  const imgRef = useRef<HTMLImageElement | null>(null);
  // Track which src caused the error so stale errors from the previous src don't flash.
  const [imgErrorSrc, setImgErrorSrc] = useState<string | null>(null);
  const imgLoadError = imgErrorSrc === src;
  const [areas, setAreas] = useState<FishSoopFinderArea[]>(FISHSOOP_FINDER_MAP_AREAS);
  const isProductImageLoading = useProductStore((state) => state.isProductImageLoading);

  const handleImageLoad = useCallback(() => {
    if (!imgRef.current) return;

    const { naturalWidth, naturalHeight, width, height } = imgRef.current;
    if (naturalWidth === 0 || naturalHeight === 0) return;

    const { scaleX, scaleY } = calculateImageScales(naturalWidth, naturalHeight, width, height);

    setAreas(
      FISHSOOP_FINDER_MAP_AREAS.map((area) => {
        const [x1, y1, x2, y2] = area.coords;
        return { ...area, coords: [x1 * scaleX, y1 * scaleY, x2 * scaleX, y2 * scaleY] };
      }),
    );
    setIsProductImageLoading(false);
  }, []);

  useResizeObserver('window', handleImageLoad);

  useEffect(() => {
    const imageElement = imgRef.current;
    if (imageElement) {
      if (imageElement.complete) {
        handleImageLoad();
      } else {
        imageElement.addEventListener('load', handleImageLoad);
      }
    }

    return () => {
      if (imageElement) {
        imageElement.removeEventListener('load', handleImageLoad);
      }
    };
  }, [src, date, handleImageLoad]);

  if (!src || imgLoadError) {
    return <ErrorImage productId="fishSOOP-profiles" date={date} />;
  }

  const handleAreaClick = (area: FishSoopFinderArea) => {
    setSearchParams(omitEmptyParams({ region: area.code, date: date.format(DateFormat.DAY) }));
  };

  return (
    <div className="relative inline-block h-full w-full bg-white">
      {isProductImageLoading ? (
        <LinearProgress className="absolute top-0 right-0 left-0" />
      ) : (
        <div className="h-1 w-full" />
      )}
      <div className="relative inline-block h-full w-full">
        <img
          ref={imgRef}
          src={src}
          alt={`FishSOOP region finder map at ${date.format(DateFormat.DAY)}`}
          useMap="#fish-soop-finder-map"
          className="max-h-[80vh] object-contain select-none"
          onError={() => {
            setIsProductImageLoading(false);
            setImgErrorSrc(src);
          }}
        />
        <map name="fish-soop-finder-map">
          {areas.map((area) => {
            const title = getFishSoopRegionByCode(area.code)?.title ?? area.code;
            return (
              <area
                key={area.code}
                className="cursor-pointer"
                shape="rect"
                coords={area.coords.join(',')}
                alt={`Region ${title}`}
                title={title}
                onClick={() => handleAreaClick(area)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAreaClick(area);
                  }
                }}
                tabIndex={0}
                role="link"
              />
            );
          })}
        </map>
      </div>
    </div>
  );
};

export default DataImageWithFishSoopMap;
