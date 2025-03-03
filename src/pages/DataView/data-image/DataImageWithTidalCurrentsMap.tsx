import React, { useEffect, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useSearchParams } from 'react-router-dom';
import ErrorImage from '@/components/Shared/ErrorImage/ErrorImage';
import { scaleImageMapAreas } from '@/utils/general-utils/general';
import { Product } from '@/types/product';
import regionArr from '@/data/tidalCurrents';
import { MapImageAreas } from '@/types/dataImage';

type DataImageWithTidalCurrentsMapProps = {
  mainProduct: Product | null;
  src: string;
  productId: string;
  date: Dayjs;
};

const DataImageWithTidalCurrentsMap: React.FC<DataImageWithTidalCurrentsMapProps> = ({
  mainProduct,
  src,
  productId,
  date,
}) => {
  const [_, setSearchParams] = useSearchParams();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [imgLoadError, setImgLoadError] = useState<string | null>(null);
  const [areas, setAreas] = useState<MapImageAreas[]>(regionArr);

  useEffect(() => {
    if (!src) setImgLoadError('Missing Image');
  }, [src]);

  if (imgLoadError) {
    return <ErrorImage product={mainProduct!} date={dayjs(date)} />;
  }

  const handleAreaClick = (area: MapImageAreas) => {
    const { name } = area;

    setSearchParams({
      region: name,
      date: date.format('YYYYMMDDHHmm'),
    });
  };

  const handleImageLoad = () => {
    if (imgRef.current) {
      const { naturalWidth: originalWidth, naturalHeight: originalHeight, width, height } = imgRef.current;

      const convertedCoords = scaleImageMapAreas(originalWidth, originalHeight, width, height, regionArr as []);
      setAreas(convertedCoords);
    }
  };

  return (
    <div className="relative inline-block w-full">
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
            alt={`Go to Tidal Currents ${area.alt} region`}
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
