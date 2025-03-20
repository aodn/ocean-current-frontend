import React, { useEffect, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useSearchParams } from 'react-router-dom';
import ErrorImage from '@/components/Shared/ErrorImage/ErrorImage';
import { scaleImageMapAreas } from '@/utils/general-utils/general';
import { Product } from '@/types/product';
import regionArr from '@/data/tidalCurrents';
import { MapImageAreas } from '@/types/dataImage';
import { DateFormat } from '@/types/date';
import { getTidalCurrentsTagsData } from '@/services/tidalCurrents';

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
  const [areas, setAreas] = useState<MapImageAreas[]>(regionArr);

  useEffect(() => {
    if (!src) {
      setImgLoadError('Missing Image');
    } else {
      setImgLoadError(null);
    }
  }, [src]);

  if (imgLoadError) {
    return <ErrorImage productId={mainProduct!.key} date={dayjs(date)} />;
  }

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

  const handleImageLoad = async () => {
    if (imgRef.current) {
      const { naturalWidth: originalWidth, naturalHeight: originalHeight, width, height } = imgRef.current;

      let convertedCoords;
      if (region === 'Australia') {
        convertedCoords = scaleImageMapAreas(originalWidth, originalHeight, width, height, regionArr as []);
      } else {
        const tagData = await getTidalCurrentsTagsData(date, productId, region);
        convertedCoords = scaleImageMapAreas(originalWidth, originalHeight, width, height, tagData as []);
      }
      setAreas(convertedCoords);
    }
  };

  return (
    <div className="relative inline-block h-full w-full bg-white">
      <img
        ref={imgRef}
        src={src}
        alt={`${productId} data`}
        useMap="#tidal-currents-map"
        className="max-h-[80vh] select-none object-contain"
        onError={() => {
          setImgLoadError('Image not available');
        }}
        onLoad={handleImageLoad}
      />
      <map name="tidal-currents-map">
        {areas.map((area, index) => (
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
