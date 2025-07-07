import React, { useEffect, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router';
import { calculateImageScales } from '@/utils/general-utils/general';
import { BuoyTagMapArea } from '@/types/buoy';
import ErrorImage from '@/components/Shared/ErrorImage/ErrorImage';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import useBuoyTags from '@/services/hooks/useBuoyTags';

const buildBuoyTimeseriesImagePath = (buoyLocation: string, date: Dayjs): string => {
  const formattedDate = date.format('YYYYMMDDHH');
  const formattedTitle = encodeURIComponent(buoyLocation.replace(' ', '_'));
  return `/product/surface-waves?buoy=${formattedTitle}&date=${formattedDate}`;
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
  const [imgLoadError, setImgLoadError] = useState<string | null>(null);
  const { mainProduct } = useProductConvert();
  const { data } = useBuoyTags(date);
  const navigate = useNavigate();

  const alt = `${productId} data at ${dateFormatted}`;

  useEffect(() => {
    setImgLoadError(null);
  }, [src]);

  useEffect(() => {
    const handleLoad = () => {
      if (imgRef.current && data) {
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
  }, [data, dateFormatted, src, date]);

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
    return <ErrorImage productId={mainProduct!.key} date={date} />;
  }

  return (
    <div className="relative inline-block h-full w-full bg-white">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        useMap="#buoy-tag-map"
        className="max-h-[80vh] select-none object-contain"
        onError={() => {
          setImgLoadError('Image not available');
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
  );
};

export default DataImageWithBuoyMap;
