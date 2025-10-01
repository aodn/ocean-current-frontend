import React, { useCallback, useEffect, useRef, useState } from 'react';
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

const hasFilesWithNames = (value: unknown): value is { files: { name: string }[] } => {
  if (typeof value !== 'object' || value === null) return false;
  const files = (value as { files?: unknown }).files;
  return Array.isArray(files) && files.every((f) => f && typeof (f as { name?: unknown }).name === 'string');
};

const getImageUrlsFromDateList = (files: { name: string }[], region: string, productId: ProductID, year: string) => {
  const prefix = productId === 'sealCtd-timeseriesTemperature' ? 'T_' : 'S_';
  const formattedRegion = region === 'GAB-Seal' ? 'GAB' : region;
  const yearPrefixRegex = prefix === 'T_' ? /^T_(\d{4})/ : /^S_(\d{4})/;

  return files
    .filter((file) => {
      if (!file.name.startsWith(prefix) || !file.name.endsWith('.gif')) {
        return false;
      }

      // Match patterns like T_2014_p0.gif, S_2023_2024_p0.gif, etc.
      // The year should match the first year in the filename
      const yearMatch = file.name.match(yearPrefixRegex);
      return yearMatch && yearMatch[1] === year;
    })
    .map((file) => `/AATAMS/${formattedRegion}/timeseries/${file.name}`);
};

const DataImageWithSealCtdGraphs: React.FC<DataImageWithSealCtdGraphsProps> = ({
  mainProduct,
  productId,
  date,
  region,
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const navigate = useNavigate();
  const [imgLoadError, setImgLoadError] = useState<string | null>(null);
  const [imgData, setImgData] = useState<SealGraphData[]>([]);
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const [hasImgLoaded, setHasImgLoaded] = useState<boolean>(false);

  const imageListQuery = useQuery({
    queryKey: ['dateList', productId, region],
    queryFn: () => fetchImageListByProductIdAndRegion(productId, region!),
    enabled: Boolean(region),
    ...sharedQueryConfig,
  });

  const handleImageLoad = useCallback(() => {
    if (imgRef.current) {
      const { naturalWidth: originalWidth, naturalHeight: originalHeight, width, height } = imgRef.current;
      const tempArr = imgData.map((img) => {
        const convertedCoords = scaleImageMapAreas(originalWidth, originalHeight, width, height, img.areas as []);
        return {
          ...img,
          areas: convertedCoords,
        };
      });

      setImgData(tempArr);
      setHasImgLoaded(true);
    }
  }, [imgData]);

  useResizeObserver('window', handleImageLoad);

  useEffect(() => {
    if (!imageListQuery.data) {
      setImgUrls([]);
      return;
    }

    const raw = imageListQuery.data;
    const first = Array.isArray(raw) ? raw[0] : undefined;
    const files = first && hasFilesWithNames(first) ? first.files : [];
    const currentYear = date.format('YYYY');
    const imageUrls = getImageUrlsFromDateList(files, region, productId, currentYear);

    if (imageUrls.length < 1) {
      setImgLoadError('No image available.');
    } else {
      setImgLoadError(null);
      setImgUrls(imageUrls);
    }
  }, [imageListQuery.data, region, productId, date]);

  useEffect(() => {
    if (imgUrls.length < 1) return;

    const fetchData = async () => {
      setHasImgLoaded(false);
      const tempArr = await Promise.all(
        imgUrls.map(async (url) => {
          const imgTags = await getSealCtdGraphTags(url);
          return {
            url,
            areas: imgTags && imgTags.length > 0 ? parseSealCtdGraphTagData(imgTags) : [],
          };
        }),
      );

      setImgData(tempArr);
    };

    fetchData();
  }, [imgUrls]);

  if (imgLoadError) {
    return <ErrorImage productId={mainProduct!.key} date={dayjs(date)} />;
  }

  if (imageListQuery.isLoading) {
    return <Loading />;
  }

  if (imageListQuery.error) {
    return <ErrorImage productId={mainProduct!.key} date={dayjs(date)} />;
  }

  const handleImageClick = (sealId: string) => {
    const query = new URLSearchParams({
      sealId,
      region,
      date: date.format(DateFormat.DAY),
    }).toString();

    navigate(`/product/${ProductPath.SEAL_CTD_TAGS}/timeseries?${query}`);
  };

  const altText = productId === 'sealCtd-timeseriesSalinity' ? 'Salinity Timeseries' : 'Temperature Timeseries';

  return (
    <div className="relative inline-block w-full">
      {imgData.map(({ url, areas }, index) => {
        // Extract page number from the filename (e.g., "T_2023_p0.gif" -> "0")
        const filename = url.split('/').pop() || '';
        const pageMatch = filename.match(/_p(\d+)\.gif$/);
        const pageNum = pageMatch ? pageMatch[1] : index.toString();

        return (
          <div key={`${filename}-${pageNum}`}>
            <img
              id={pageNum}
              ref={imgRef}
              src={`${imageBaseUrl}${url}`}
              alt={`${altText} graph ${pageNum}`}
              useMap={`#seal-ctd-graph-${pageNum}`}
              className="max-h-[80vh] select-none object-contain"
              onError={() => {
                setImgLoadError('Image not available');
              }}
              onLoad={handleImageLoad}
            />

            {hasImgLoaded && (
              <map name={`seal-ctd-graph-${pageNum}`}>
                {areas &&
                  areas.map((area) => (
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
