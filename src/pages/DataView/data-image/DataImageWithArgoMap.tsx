import React, { useCallback, useEffect, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { fetchArgoProfileCyclesByWmoId } from '@/services/argo';
import { findMostRecentDateBefore, getDateFormatByProductIdAndRegionScope } from '@/utils/date-utils/date';
import { calculateImageScales } from '@/utils/general-utils/general';
import { ArgoTagMapArea, SoopTagMapArea } from '@/types/argo';
import { convertCoordsBasedOnImageScale } from '@/utils/argo-utils/argoTag';
import ErrorImage from '@/components/Shared/ErrorImage/ErrorImage';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import { RegionScope } from '@/constants/region';
import { useImageArgoTags } from '@/services/hooks';
import { ProductID } from '@/types/product';
import { DateFormat } from '@/types/date';
import { useResizeObserver } from '@/hooks';

/** Radius (in pixels) used for both the clickable ship area and the hover-detection zone. */
const SHIP_MARKER_RADIUS = 10;

type DataImageWithArgoMapProps = {
  src: string;
  productId: ProductID;
  regionCode: string;
  regionScope: RegionScope;
  date: Dayjs;
  argoTagFilePath: string;
};

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
  const [coords, setCoords] = useState<ArgoTagMapArea[]>([]);
  const [shipCoords, setShipCoords] = useState<SoopTagMapArea[]>([]);
  const [hoveredShipName, setHoveredShipName] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [imgLoadError, setImgLoadError] = useState<string | null>(null);
  const { mainProduct } = useProductConvert();
  // Non-Tidal SLA product images use HOUR format but its tag file uses DAY format
  const tagDateFormat = productId === 'adjustedSeaLevelAnomaly-nonTidalSla' ? DateFormat.DAY : dateFormat;
  const { data, soopData } = useImageArgoTags({
    date,
    tagPath: argoTagFilePath,
    regionCode,
    dateFormat: tagDateFormat,
  });
  const alt = `${productId} data in ${regionCode} at ${dateFormatted}`;

  const handleLoad = useCallback(() => {
    if (!imgRef.current) return;

    const { naturalWidth, naturalHeight, width, height } = imgRef.current;
    const { scaleX, scaleY } = calculateImageScales(naturalWidth, naturalHeight, width, height);
    const originalCoords = data.map((item) => ({
      shape: 'circle',
      coords: [item.coordX, item.coordY, SHIP_MARKER_RADIUS],
      href: `/product/argo?wmoid=${item.wmoId}&cycle=${item.cycle}&depth=0-2000m&date=${dateFormatted}`,
      wmoId: item.wmoId,
      cycle: item.cycle,
    }));
    const convertedCoords = convertCoordsBasedOnImageScale(originalCoords, scaleX, scaleY, naturalHeight);
    setCoords(convertedCoords as ArgoTagMapArea[]);

    const originalShipCoords = soopData.map((item) => ({
      shape: 'circle',
      coords: [item.coordX, item.coordY, SHIP_MARKER_RADIUS],
      name: item.name,
    }));
    const convertedShipCoords = convertCoordsBasedOnImageScale(originalShipCoords, scaleX, scaleY, naturalHeight);
    setShipCoords(convertedShipCoords as SoopTagMapArea[]);
  }, [data, soopData, dateFormatted]);

  useResizeObserver('window', handleLoad);

  useEffect(() => {
    setImgLoadError(null);
  }, [src]);

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
  }, [data, soopData, dateFormatted, handleLoad, src]);

  const handleCircleClick = async (area: ArgoTagMapArea) => {
    const data = await fetchArgoProfileCyclesByWmoId(area.wmoId.toString());
    const dates = data.map((item) => item.date);
    const mostRecentDate = findMostRecentDateBefore(dates, dateFormatted);
    const mostRecentItem = data.find((item) => item.date === mostRecentDate);

    if (!mostRecentItem) {
      return;
    }

    const newPath = `/product/argo?wmoid=${area.wmoId}&cycle=${mostRecentItem.cycle}&depth=0-2000m&date=${mostRecentDate}`;

    window.open(newPath, '_blank', 'noopener,noreferrer');
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!imgRef.current || shipCoords.length === 0) return;

      const imgRect = imgRef.current.getBoundingClientRect();
      const containerRect = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX - imgRect.left;
      const mouseY = e.clientY - imgRect.top;

      if (mouseX < 0 || mouseY < 0 || mouseX > imgRect.width || mouseY > imgRect.height) {
        setHoveredShipName(null);
        return;
      }

      const hoverRadius = SHIP_MARKER_RADIUS;
      for (const ship of shipCoords) {
        const [shipX, shipY] = ship.coords;
        const distance = Math.sqrt(Math.pow(mouseX - shipX, 2) + Math.pow(mouseY - shipY, 2));
        if (distance <= hoverRadius) {
          setHoveredShipName(ship.name);
          setTooltipPos({
            x: e.clientX - containerRect.left + 12,
            y: e.clientY - containerRect.top - 8,
          });
          return;
        }
      }

      setHoveredShipName(null);
    },
    [shipCoords],
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredShipName(null);
  }, []);

  if (imgLoadError) {
    return <ErrorImage productId={mainProduct!.key} date={date} />;
  }

  return (
    <div
      className="relative inline-block h-full w-full bg-white"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        useMap="#argo-tag-map"
        className="max-h-[80vh] select-none object-contain"
        onError={() => {
          setImgLoadError('Image not available');
        }}
      />
      <map name="argo-tag-map">
        {coords.map((area, index) => (
          <area
            key={index}
            shape={area.shape}
            coords={area.coords.join(',')}
            alt={area.alt || `Area ${index + 1}`}
            onClick={() => handleCircleClick(area)}
            aria-hidden="true"
            className="cursor-pointer"
          />
        ))}
      </map>
      {hoveredShipName && (
        <div
          data-testid="ship-tooltip"
          className="pointer-events-none absolute z-10 rounded border border-gray-300 bg-gray-100 px-2 py-1 text-sm text-gray-800 shadow"
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
        >
          {hoveredShipName}
        </div>
      )}
    </div>
  );
};

export default DataImageWithArgoMap;
