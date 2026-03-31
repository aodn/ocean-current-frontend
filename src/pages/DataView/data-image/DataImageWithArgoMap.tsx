import React, { useCallback, useEffect, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { fetchArgoProfileCyclesByWmoId } from '@/services/argo';
import { findMostRecentDateBefore, getDateFormatByProductIdAndRegionScope } from '@/utils/date-utils/date';
import { calculateImageScales } from '@/utils/general-utils/general';
import { ImageTagMapArea } from '@/types/argo';
import { convertCoordsBasedOnImageScale } from '@/utils/argo-utils/argoTag';
import ErrorImage from '@/components/Shared/ErrorImage/ErrorImage';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import { RegionScope } from '@/constants/region';
import { useImageTags } from '@/services/hooks';
import { ProductID } from '@/types/product';
import { DateFormat } from '@/types/date';
import { useResizeObserver } from '@/hooks';
import useProductStore, { setIsProductImageLoading } from '@/stores/product-store/productStore';
import { Loading } from '@/components/Shared';
import { cn } from '@/utils/classname-util/cn';

type DataImageWithArgoMapProps = {
  src: string;
  productId: ProductID;
  regionCode: string;
  regionScope: RegionScope;
  date: Dayjs;
  argoTagFilePath: string;
};

type TooltipState = { text: string; x: number; y: number } | null;

const DataImageWithArgoMap: React.FC<DataImageWithArgoMapProps> = ({
  src,
  productId,
  regionCode,
  regionScope,
  date,
  argoTagFilePath,
}) => {
  const dateFormat = getDateFormatByProductIdAndRegionScope(productId, regionScope);
  const dateFormatted = dayjs(date).format(dateFormat);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [coords, setCoords] = useState<ImageTagMapArea[]>([]);
  const [imgLoadError, setImgLoadError] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>(null);
  const { mainProduct } = useProductConvert();
  const isProductImageLoading = useProductStore((state) => state.isProductImageLoading);
  // Non-Tidal SLA product images use HOUR format but its tag file uses DAY format
  const tagDateFormat = productId === 'adjustedSeaLevelAnomaly-nonTidalSla' ? DateFormat.DAY : dateFormat;
  const { data } = useImageTags({ date, tagPath: argoTagFilePath, regionCode, dateFormat: tagDateFormat });
  const alt = `${productId} data in ${regionCode} at ${dateFormatted}`;

  const handleLoad = useCallback(() => {
    setIsProductImageLoading(false);
    if (!imgRef.current) return;

    const { naturalWidth, naturalHeight, width, height } = imgRef.current;
    const { scaleX, scaleY } = calculateImageScales(naturalWidth, naturalHeight, width, height);
    const originalCoords = data
      .map((item) => {
        const { type, coordX, coordY } = item;
        if (type === 'SOOP') {
          return {
            type,
            shape: 'circle',
            coords: [coordX, coordY, 10],
            href: '',
            tooltip: item.shipName,
          };
        }
        if (type === 'FishSOOP') {
          //fishsoop image url expected to be https://oceancurrent.aodn.org.au/fishsoop/{region}/{year}/{date}.gif
          //temp fix, point to the page. expected to be https://oceancurrent.aodn.org.au/fishsoop_php/fsa.php?region={region}&date={date} like https://oceancurrent.aodn.org.au/fishsoop_php/fsa.php?region=TasE&date=20260302
          return {
            type,
            shape: 'circle',
            coords: [coordX, coordY, 10],
            href: `https://oceancurrent.aodn.org.au/fishsoop_php/fsa.php?region=${item.region}&date=${dayjs(item.date).format('YYYYMMDD')}`,
            //region and date should come from txt file through api, not regionCode.
            tooltip: type + item.region + item.date,
          };
        }
        if (type === 'Argo') {
          return {
            type,
            shape: 'circle',
            coords: [coordX, coordY, 10],
            href: `/product/argo?wmoid=${item.wmoId}&cycle=${item.cycle}&depth=0-2000m&date=${dateFormatted}`,
            wmoId: item.wmoId,
            cycle: item.cycle,
            tooltip: item.dataSource,
          };
        }
        if (type === 'ANNN') {
          return {
            type,
            shape: 'circle',
            coords: [coordX, coordY, 10],
            href: '',
            tooltip: type + item.shipName,
          };
        }
      })
      .filter((e) => !!e);
    setCoords(convertCoordsBasedOnImageScale(originalCoords, scaleX, scaleY, naturalHeight) as ImageTagMapArea[]);
  }, [data, dateFormatted]);

  useResizeObserver('window', handleLoad);

  useEffect(() => {
    setImgLoadError(null);
  }, [src]);

  useEffect(() => {
    let imgElement: HTMLImageElement | null = imgRef.current;
    // Ensure imgRef.current is not null and handle cached images that may not trigger onLoad
    const timoutId = setTimeout(() => {
      if (imgRef.current) {
        if (imgRef.current.complete) {
          handleLoad();
        } else {
          imgRef.current.addEventListener('load', handleLoad);
          imgElement = imgRef.current;
        }
      }
    }, 100);

    return () => {
      clearTimeout(timoutId);
      if (imgElement) {
        imgElement.removeEventListener('load', handleLoad);
      }
    };
  }, [data, dateFormatted, handleLoad, src]);

  const handleCircleClick = async (area: ImageTagMapArea) => {
    let newPath = '';
    if (area.type === 'Argo') {
      if (!area.wmoId) return;

      const data = await fetchArgoProfileCyclesByWmoId(area.wmoId.toString());
      const dates = data.map((item) => item.date);
      const mostRecentDate = findMostRecentDateBefore(dates, dateFormatted);
      const mostRecentItem = data.find((item) => item.date === mostRecentDate);

      if (!mostRecentItem) {
        return;
      }

      newPath = `/product/argo?wmoid=${area.wmoId}&cycle=${mostRecentItem.cycle}&depth=0-2000m&date=${mostRecentDate}`;
    }
    if (area.type === 'FishSOOP') {
      newPath = area.href;
    }

    if (newPath) window.open(newPath, '_blank', 'noopener,noreferrer');
  };

  if (imgLoadError) {
    return <ErrorImage productId={mainProduct!.key} date={date} />;
  }

  return (
    <div className="relative inline-block h-full w-full bg-white">
      {isProductImageLoading && <Loading className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />}
      <div className={cn('relative inline-block h-full w-full', { 'invisible opacity-0': isProductImageLoading })}>
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          useMap="#argo-tag-map"
          className="max-h-[80vh] select-none object-contain"
          onError={() => {
            setIsProductImageLoading(false);
            setImgLoadError('Image not available');
          }}
        />
        <map name="argo-tag-map">
          {coords.map((area, index) => (
            <area
              key={`${area.tooltip ?? ''}-${area.coords[0]}-${area.coords[1]}-${index}`}
              shape={area.shape}
              coords={area.coords.join(',')}
              alt={area.tooltip || `Area ${index + 1}`}
              data-tooltip={area.tooltip}
              onMouseEnter={(e) => area.tooltip && setTooltip({ text: area.tooltip, x: e.clientX, y: e.clientY })}
              onMouseMove={(e) => setTooltip((prev) => (prev ? { ...prev, x: e.clientX, y: e.clientY } : null))}
              onMouseLeave={() => setTooltip(null)}
              onClick={() => handleCircleClick(area)}
              aria-hidden="true"
              className="cursor-pointer"
            />
          ))}
        </map>
        {tooltip && (
          <div
            data-testid="image-map-tooltip"
            className="pointer-events-none fixed z-50 inline-flex min-h-6 flex-col items-center justify-center gap-2 rounded bg-zinc-50 px-2.5 py-1 text-sm font-normal leading-5 shadow-[0_0_4px_0_rgba(0,0,0,0.25)]"
            style={{ left: tooltip.x + 12, top: tooltip.y + 12 }}
          >
            {tooltip.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataImageWithArgoMap;
