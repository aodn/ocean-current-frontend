import React, { useCallback, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router';
import ErrorImage from '@/components/Shared/ErrorImage/ErrorImage';
import { currentMetersRegionAreasMap } from '@/data/current-meter/region-list';
import { scaleImageMapAreas } from '@/utils/general-utils/general';
import { setRegion, setDeploymentPlot } from '@/stores/current-meters-store/currentMeters';
import { CurrentMetersDepth, CurrentMetersProperty, CurrentMetersRegion } from '@/constants/currentMeters';
import { CurrentMetersDeploymentPlotNames } from '@/types/currentMeters';
import { Product } from '@/types/product';
import { currentMetersMapDataPointsFlat } from '@/data/current-meter/mapDataPoints';
import { currentMeterSYearOptionsData } from '@/data/current-meter/sidebarOptions';
import { MapImageAreas } from '@/types/dataImage';
import { getRegionTitleByRegionCode } from '@/utils/region-utils/region';
import { useResizeObserver } from '@/hooks';
import useProductStore, { setIsProductImageLoading } from '@/stores/product-store/productStore';
import { LinearProgress } from '@/components/Shared';
import { cn } from '@/utils/classname-util/cn';
import omitEmptyParams from '@/hooks/useQueryParams/omitEmptyParams';

type DataImageWithCurrentMetersMapProps = {
  mainProduct: Product | null;
  src: string;
  regionCode: CurrentMetersRegion;
  date: string;
};

const DataImageWithCurrentMetersMap: React.FC<DataImageWithCurrentMetersMapProps> = ({
  mainProduct,
  src,
  regionCode,
  date,
}) => {
  const regionArr = currentMetersRegionAreasMap[regionCode];
  const [_, setSearchParams] = useSearchParams();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [imgErrorSrc, setImgErrorSrc] = useState<string | null>(null);
  const imgLoadError = imgErrorSrc === src;
  const [areas, setAreas] = useState<MapImageAreas[]>(regionArr);
  const isProductImageLoading = useProductStore((state) => state.isProductImageLoading);

  const handleImageLoad = useCallback(() => {
    setIsProductImageLoading(false);
    if (!imgRef.current) return;

    const { naturalWidth: originalWidth, naturalHeight: originalHeight, width, height } = imgRef.current;

    const convertedCoords = scaleImageMapAreas(originalWidth, originalHeight, width, height, regionArr as []);
    setAreas(convertedCoords);
  }, [regionArr]);

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
    return <ErrorImage productId={mainProduct!.key} date={dayjs(date)} />;
  }

  const handleAreaClick = (area: MapImageAreas) => {
    const { type, code, name } = area;
    const getRegion =
      currentMetersMapDataPointsFlat.find((point) => point.name === name)?.region ?? CurrentMetersRegion.Aust;

    if (type === 'region' && code) {
      setRegion(code);
      setSearchParams(
        omitEmptyParams({
          property: CurrentMetersProperty.vrms,
          depth: CurrentMetersDepth.ONE,
          region: code,
          date: date,
        }),
      );
    }

    if (type === 'plot' || type === 'text') {
      setDeploymentPlot(name as CurrentMetersDeploymentPlotNames);
      setSearchParams(
        omitEmptyParams({
          property: CurrentMetersProperty.vrms,
          depth: CurrentMetersDepth.ONE,
          region: getRegion,
          date: currentMeterSYearOptionsData[0].id, // all time
          deploymentPlot: name,
        }),
      );
    }
  };

  const regionTitle = getRegionTitleByRegionCode(regionCode);

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
          alt={`Current Meters ${regionTitle} map`}
          useMap="#current-meters-map"
          className="max-h-[80vh] object-contain select-none"
          onError={() => {
            setIsProductImageLoading(false);
            setImgErrorSrc(src);
          }}
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

export default DataImageWithCurrentMetersMap;
