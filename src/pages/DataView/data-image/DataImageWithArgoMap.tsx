import React, { useCallback, useEffect, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { getDateFormatByProductIdAndRegionScope } from '@/utils/date-utils/date';
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
import { LinearProgress } from '@/components/Shared';
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
  const isDateResolving = useProductStore((state) => state.isDateResolving);
  // Non-Tidal SLA product images use HOUR format but its tag file uses DAY format
  const tagDateFormat = productId === 'adjustedSeaLevelAnomaly-nonTidalSla' ? DateFormat.DAY : dateFormat;
  const { data } = useImageTags({ date, tagPath: argoTagFilePath, regionCode, dateFormat: tagDateFormat });

  const handleLoad = useCallback(() => {
    setIsProductImageLoading(false);
    if (!imgRef.current) return;

    const { naturalWidth, naturalHeight, width, height } = imgRef.current;
    const { scaleX, scaleY } = calculateImageScales(naturalWidth, naturalHeight, width, height);
    const originalCoords = data.reduce<ImageTagMapArea[]>((acc, item) => {
      const { type, coordX, coordY } = item;
      switch (type) {
        case 'SOOP':
          acc.push({ type, shape: 'circle', coords: [coordX, coordY, 10], href: '', tooltip: item.shipName });
          break;
        case 'FishSOOP':
          //fishsoop image url expected to be https://oceancurrent.aodn.org.au/fishsoop/{region}/{year}/{date}.gif
          //temp fix, point to the page. expected to be https://oceancurrent.aodn.org.au/fishsoop_php/fsa.php?region={region}&date={date} like https://oceancurrent.aodn.org.au/fishsoop_php/fsa.php?region=TasE&date=20260302
          acc.push({
            type,
            shape: 'circle',
            coords: [coordX, coordY, 10],
            //region and date should come from txt file through api, not regionCode.
            href: `https://oceancurrent.aodn.org.au/fishsoop_php/fsa.php?region=${encodeURIComponent(item.region)}&date=${encodeURIComponent(item.date)}`,
            tooltip: type + item.region + item.date,
          });
          break;
        case 'Argo':
          acc.push({
            type,
            shape: 'circle',
            coords: [coordX, coordY, 10],
            href: `/product/argo?wmoid=${item.wmoId}&cycle=${item.cycle}&depth=0-2000m&date=${dateFormatted}`,
            wmoId: item.wmoId,
            cycle: item.cycle,
            tooltip: item.dataSource,
          });
          break;
        case 'ANMN':
          acc.push({ type, shape: 'circle', coords: [coordX, coordY, 10], href: '', tooltip: type + item.shipName });
          break;
        default: {
          const _exhaustiveCheck: never = item;
          console.error('Unhandled ImageTag type:', _exhaustiveCheck);
        }
      }
      return acc;
    }, []);
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

  //TODO: in same product, when select reigion, still see error image becaue, find neraest date is run again and date moved.

  if (isDateResolving) {
    return <LinearProgress className="absolute left-0 right-0 top-0" />;
  }

  if (imgLoadError) {
    return <ErrorImage productId={mainProduct!.key} date={date} />;
  }

  return (
    <div className="relative inline-block h-full w-full bg-white">
      {isProductImageLoading ? (
        <LinearProgress className="absolute left-0 right-0 top-0" />
      ) : (
        <div className="h-1 w-full" />
      )}
      <div className={cn('relative inline-block h-full w-full')}>
        <img
          ref={imgRef}
          src={src}
          alt={`${productId} data in ${regionCode} at ${dateFormatted}`}
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
              href={area.href || undefined}
              target="_blank"
              rel="noopener noreferrer"
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
