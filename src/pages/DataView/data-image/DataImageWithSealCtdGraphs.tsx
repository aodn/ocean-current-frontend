import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import ErrorImage from '@/components/Shared/ErrorImage/ErrorImage';
import { scaleImageMapAreas } from '@/utils/general-utils/general';
import { ProductID, Product } from '@/types/product';
import { MapImageAreas } from '@/types/dataImage';
import { getSealCtdGraphTags } from '@/services/sealCtd';
import { imageBaseUrl } from '@/configs/image';
import { Loading } from '@/components/Shared';
import { parseSealCtdGraphTagData } from '@/utils/seal-ctd-utils/sealStdTags';
import { DateFormat } from '@/types/date';
import { ProductPath } from '@/types/router';
import { fetchImageListByProductIdAndRegion } from '@/services/imageList';
import { sharedQueryConfig } from '@/configs/query';
import { useResizeObserver } from '@/hooks';

type DataImageWithSealCtdGraphsProps = {
  mainProduct: Product | null;
  productId: ProductID;
  date: Dayjs;
  region: string;
};

type SealGraphData = {
  url: string;
  areas: MapImageAreas[];
};

// Type guard for validating file structure
const hasFilesWithNames = (value: unknown): value is { files: { name: string }[] } => {
  if (typeof value !== 'object' || value === null) return false;
  const files = (value as { files?: unknown }).files;
  return Array.isArray(files) && files.every((f) => f && typeof (f as { name?: unknown }).name === 'string');
};

// Helper function to filter and map image URLs based on product and year
const getImageUrlsFromDateList = (files: { name: string }[], region: string, productId: ProductID, year: string) => {
  const prefix = productId === 'sealCtd-timeseriesTemperature' ? 'T_' : 'S_';
  const formattedRegion = region === 'GAB-Seal' ? 'GAB' : region;
  const yearPrefixRegex = prefix === 'T_' ? /^T_(\d{4})/ : /^S_(\d{4})/;

  return files
    .filter((file) => {
      if (!file.name.startsWith(prefix) || !file.name.endsWith('.gif')) {
        return false;
      }

      const yearMatch = file.name.match(yearPrefixRegex);
      return yearMatch && yearMatch[1] === year;
    })
    .map((file) => `/AATAMS/${formattedRegion}/timeseries/${file.name}`);
};

// Extract page number from filename (e.g., "T_2023_p0.gif" -> "0")
const extractPageNumber = (url: string, fallback: number): string => {
  const filename = url.split('/').pop() || '';
  const pageMatch = filename.match(/_p(\d+)\.gif$/);
  return pageMatch ? pageMatch[1] : fallback.toString();
};

const DataImageWithSealCtdGraphs: React.FC<DataImageWithSealCtdGraphsProps> = ({
  mainProduct,
  productId,
  date,
  region,
}) => {
  const firstImgRef = useRef<HTMLImageElement | null>(null);
  const navigate = useNavigate();
  const [scaledImageData, setScaledImageData] = useState<SealGraphData[]>([]);
  const [hasImagesLoaded, setHasImagesLoaded] = useState<boolean>(false);
  const [imageRenderError, setImageRenderError] = useState<string | null>(null);

  const currentYear = date.year().toString();

  // Fetch image list for the product and region
  const {
    data: imageListData,
    error: imageListError,
    isLoading: imageListLoading,
  } = useQuery({
    queryKey: ['dateList', productId, region, currentYear],
    queryFn: () => fetchImageListByProductIdAndRegion(productId, region!),
    enabled: Boolean(region),
    select: (raw) => {
      const first = Array.isArray(raw) ? raw[0] : undefined;
      const files = first && hasFilesWithNames(first) ? first.files : [];
      return getImageUrlsFromDateList(files, region, productId, currentYear);
    },
    ...sharedQueryConfig,
  });

  const imgUrls = imageListData ?? [];
  const imgLoadError = imageRenderError || imageListError || (imgUrls.length === 0 ? 'No image available.' : null);

  // Fetch image map areas (clickable regions) for each image
  const imageDataQuery = useQuery({
    queryKey: ['sealCtdGraphTags', imgUrls],
    queryFn: () => Promise.all(imgUrls.map((url) => getSealCtdGraphTags(url))),
    enabled: imgUrls.length > 0,
    select: (data) => {
      return data.map((imgTags, i) => ({
        url: imgUrls[i],
        areas: imgTags && imgTags.length > 0 ? parseSealCtdGraphTagData(imgTags) : [],
      }));
    },
    ...sharedQueryConfig,
  });

  // Scale image map coordinates based on actual image dimensions
  const scaleImageCoordinates = useCallback(() => {
    if (!firstImgRef.current || !imageDataQuery.data) return;

    const { naturalWidth: originalWidth, naturalHeight: originalHeight, width, height } = firstImgRef.current;

    const scaled = imageDataQuery.data.map((img) => ({
      ...img,
      areas: scaleImageMapAreas(originalWidth, originalHeight, width, height, img.areas as []),
    }));

    setScaledImageData(scaled);
    setHasImagesLoaded(true);
  }, [imageDataQuery.data]);

  // Reset scaled data and image render error when date changes
  useEffect(() => {
    setScaledImageData([]);
    setHasImagesLoaded(false);
    setImageRenderError(null);
  }, [date]);

  const handleImageLoad = useCallback(() => {
    if (!firstImgRef.current) return;
    scaleImageCoordinates();
  }, [scaleImageCoordinates]);

  useEffect(() => {
    const firstImageElement = firstImgRef.current;
    if (firstImageElement) {
      if (firstImageElement.complete) {
        handleImageLoad();
      } else {
        firstImageElement.addEventListener('load', handleImageLoad);
      }
    }
  }, [date, handleImageLoad]);

  // Recalculate coordinates on window resize
  useResizeObserver('window', scaleImageCoordinates);

  // Navigate to seal CTD tags page when clicking on a seal region
  const handleImageClick = useCallback(
    (sealId: string) => {
      const query = new URLSearchParams({
        sealId,
        region,
        date: date.format(DateFormat.DAY),
      }).toString();

      navigate(`/product/${ProductPath.SEAL_CTD_TAGS}/timeseries?${query}`);
    },
    [navigate, region, date],
  );

  // Memoize alt text based on product ID
  const altText = useMemo(
    () => (productId === 'sealCtd-timeseriesSalinity' ? 'Salinity Timeseries' : 'Temperature Timeseries'),
    [productId],
  );

  // Use scaled data if available, otherwise fall back to unscaled data
  const displayData = scaledImageData.length > 0 ? scaledImageData : (imageDataQuery.data ?? []);

  // Error and loading states
  if (imgLoadError) {
    return <ErrorImage productId={mainProduct!.key} date={dayjs(date)} />;
  }

  if (imageListLoading) {
    return <Loading />;
  }

  return (
    <div className="relative inline-block w-full">
      {displayData.map(({ url, areas }, index) => {
        const pageNum = extractPageNumber(url, index);
        const isFirstImage = index === 0;

        return (
          <div key={`${url}-${pageNum}`}>
            <img
              id={pageNum}
              ref={isFirstImage ? firstImgRef : null}
              src={`${imageBaseUrl}${url}`}
              alt={`${altText} graph ${pageNum}`}
              useMap={`#seal-ctd-graph-${pageNum}`}
              className="max-h-[80vh] select-none object-contain"
              onError={() => setImageRenderError('Image not available')}
              onLoad={isFirstImage ? scaleImageCoordinates : undefined}
            />

            {hasImagesLoaded && (
              <map name={`seal-ctd-graph-${pageNum}`}>
                {areas.map((area) => (
                  <area
                    key={area.name}
                    className="cursor-pointer"
                    shape={area.shape}
                    coords={area.coords.join(',')}
                    alt={`${altText} for ${area.alt}`}
                    onClick={() => handleImageClick(area.name)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleImageClick(area.name);
                      }
                    }}
                    tabIndex={0}
                    title={area.name}
                    role="link"
                  />
                ))}
              </map>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DataImageWithSealCtdGraphs;
