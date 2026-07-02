import React, { useCallback, useEffect, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router';
import { calculateImageScales } from '@/utils/general-utils/general';
import { BuoyTagMapArea } from '@/types/buoy';
import ErrorImage from '@/components/Shared/ErrorImage/ErrorImage';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import useBuoyTags from '@/services/hooks/useBuoyTags';
import { useDateList, useResizeObserver } from '@/hooks';
import useProductStore, { setIsProductImageLoading } from '@/stores/product-store/productStore';
import { LinearProgress } from '@/components/Shared';
import { cn } from '@/utils/classname-util/cn';
import { ProductID } from '@/types/product';

const buildBuoyTimeseriesImagePath = (buoyLocation: string, date: Dayjs): string => {
  const formattedDate = date.format('YYYYMMDDHH');
  const formattedTitle = encodeURIComponent(buoyLocation.replaceAll(' ', '_'));
  return `/product/surface-waves/buoy-timeseries?region=${formattedTitle}&date=${formattedDate}`;
};

interface DataImageWithBuoyMapProps {
  src: string;
  productId: string;
  date: Dayjs;
}

const DataImageWithBuoyMap: React.FC<DataImageWithBuoyMapProps> = ({ src, productId, date }) => {
  const dateFormatted = dayjs(date).format('YYYYMMDD');
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [coords, setCoords] = useState<BuoyTagMapArea[]>([]);
  const [imgErrorSrc, setImgErrorSrc] = useState<string | null>(null);
  const imgLoadError = imgErrorSrc === src;
  const { mainProduct } = useProductConvert();
  const { data } = useBuoyTags(date);
  const navigate = useNavigate();
  const isProductImageLoading = useProductStore((state) => state.isProductImageLoading);
  const isDateResolving = useProductStore((state) => state.isDateResolving);
  // Mirrors the loading gate used by DataImageWithArgoMap: while the date list is still
  // loading, `date` may still be a stale/default value (e.g. we landed here without a `date`
  // param), so a resulting image 404 shouldn't yet be treated as a genuine "not available" error.
  const { isLoading: isProductDateListLoading } = useDateList({ productId: productId as ProductID, mode: 'list' });

  const alt = `${productId} data at ${dateFormatted}`;

  const handleLoad = useCallback(() => {
    setIsProductImageLoading(false);
    if (!imgRef.current || !data) return;

    const { naturalWidth, naturalHeight, width, height } = imgRef.current;
    const { scaleX, scaleY } = calculateImageScales(naturalWidth, naturalHeight, width, height);

    const buoyCoords: BuoyTagMapArea[] = data.tags.map((item) => {
      const scaledX = item.x * scaleX;
      const scaledY = item.y * scaleY;
      const scaledSize = item.sz * Math.min(scaleX, scaleY);

      const href = item.url.startsWith('TS ')
        ? buildBuoyTimeseriesImagePath(item.title, date)
        : item.url.replace('TS ', '');

      return {
        shape: 'circle',
        coords: [scaledX, scaledY, scaledSize],
        href,
        title: item.title,
        alt: `${item.title} buoy`,
      };
    });

    setCoords(buoyCoords);
  }, [data, date]);

  useResizeObserver('window', handleLoad);

  useEffect(() => {
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
  }, [data, dateFormatted, src, date, handleLoad]);

  const handleCircleClick = (e: React.MouseEvent<HTMLAreaElement>, area: BuoyTagMapArea) => {
    e.preventDefault();
    e.stopPropagation();
    const isExternalUrl = area.href.startsWith('http') || area.href.startsWith('https');
    if (isExternalUrl) {
      window.open(area.href, '_blank', 'noopener,noreferrer');
    } else {
      navigate(area.href);
    }
  };

  if (imgLoadError) {
    if (isDateResolving || isProductDateListLoading) {
      return <LinearProgress className="absolute top-0 right-0 left-0" />;
    }
    return <ErrorImage productId={mainProduct!.key} date={date} />;
  }

  return (
    <div className="relative inline-block h-full w-full bg-white">
      {isProductImageLoading ? (
        <LinearProgress className="absolute top-0 right-0 left-0" />
      ) : (
        <div className="h-1 w-full" />
      )}
      <div className={cn('relative inline-block h-full w-full')}>
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          useMap="#buoy-tag-map"
          className="max-h-[80vh] object-contain select-none"
          onError={() => {
            setIsProductImageLoading(false);
            setImgErrorSrc(src);
          }}
        />
        <map name="buoy-tag-map">
          {coords.map((area) => (
            <area
              key={`${area.title}-${area.href}`}
              shape={area.shape}
              coords={area.coords.join(',')}
              alt={area.alt || `${area.title} buoy`}
              onClick={(e) => handleCircleClick(e, area)}
              href={area.href}
              className="cursor-pointer"
            />
          ))}
        </map>
      </div>
    </div>
  );
};

export default DataImageWithBuoyMap;
