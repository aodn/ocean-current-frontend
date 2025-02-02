import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';
import ErrorImage from '@/components/Shared/ErrorImage/ErrorImage';
import { currentMetersRegionAreasMap } from '@/data/current-meter/region-list';
import { scaleImageMapAreas } from '@/utils/general-utils/general';
import { setRegion, setDeploymentPlot } from '@/stores/current-meters-store/currentMeters';
import { CurrentMetersDepth, CurrentMetersProperty, CurrentMetersRegion } from '@/constants/currentMeters';
import { CurrentMetersMapDataPointNames, CurrentMetersImageDataPoints } from '@/types/currentMeters';
import { Product } from '@/types/product';
import { currentMetersMapDataPointsFlat } from '@/data/current-meter/mapDataPoints';

interface DataImageWithCurrentMetersMapProps {
  mainProduct: Product | null;
  src: string;
  productId: string;
  regionCode: string;
  date: string;
}

const DataImageWithCurrentMetersMap: React.FC<DataImageWithCurrentMetersMapProps> = ({
  mainProduct,
  src,
  productId,
  regionCode,
  date,
}) => {
  const regionArr = currentMetersRegionAreasMap[regionCode as CurrentMetersRegion];
  const [_, setSearchParams] = useSearchParams();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [imgLoadError, setImgLoadError] = useState<string | null>(null);
  const [areas, setAreas] = useState<CurrentMetersImageDataPoints[]>(regionArr);

  const handleAreaClick = (area: CurrentMetersImageDataPoints) => {
    const { type, code, name } = area;
    const getRegion =
      currentMetersMapDataPointsFlat.find((point) => point.name === name)?.region ?? CurrentMetersRegion.Aust;

    if (type === 'region' && code) {
      setRegion(code);
      setSearchParams({
        property: CurrentMetersProperty.vrms,
        depth: CurrentMetersDepth.ONE,
        region: code,
        date: date,
        deploymentPlot: '',
      });
    }

    if (type === 'plot' || type === 'text') {
      setDeploymentPlot(name as CurrentMetersMapDataPointNames);
      setSearchParams({
        property: CurrentMetersProperty.vrms,
        depth: CurrentMetersDepth.ONE,
        region: getRegion,
        date: date,
        deploymentPlot: name,
      });
    }
  };

  const handleImageLoad = () => {
    if (imgRef.current) {
      const { naturalWidth: originalWidth, naturalHeight: originalHeight, width, height } = imgRef.current;

      const convertedCoords = scaleImageMapAreas(originalWidth, originalHeight, width, height, regionArr as []);
      setAreas(convertedCoords);
    }
  };

  useEffect(() => {
    if (!src) setImgLoadError('Missing Image');
  }, [src]);

  if (imgLoadError) {
    return <ErrorImage product={mainProduct!} date={dayjs(date)} />;
  }

  return (
    <div className="relative inline-block w-full">
      <img
        ref={imgRef}
        src={src}
        alt={`${productId} data`}
        useMap="#current-meters-map"
        className="max-h-[80vh] select-none object-contain"
        onError={() => {
          setImgLoadError('Image not available');
        }}
        onLoad={handleImageLoad}
      />
      <map name="current-meters-map">
        {areas &&
          areas.map((area, index) => (
            <area
              key={index}
              className="cursor-pointer"
              shape={area.shape}
              coords={area.coords.join(',')}
              alt={`${area.type === 'region' ? 'Region' : 'Plot'} ${area.name}`}
              onClick={() => handleAreaClick(area)}
              aria-hidden="true"
            />
          ))}
      </map>
    </div>
  );
};

export default DataImageWithCurrentMetersMap;
