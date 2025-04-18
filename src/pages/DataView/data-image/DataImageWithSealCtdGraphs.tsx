import React, { useEffect, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router-dom';
import ErrorImage from '@/components/Shared/ErrorImage/ErrorImage';
import { scaleImageMapAreas } from '@/utils/general-utils/general';
import { ProductID, Product } from '@/types/product';
import { MapImageAreas } from '@/types/dataImage';
import { buildSealCtdGraphImageUrl } from '@/utils/data-image-builder-utils/dataImgBuilder';
import { getSealCtdGraphTags, validateSealCtdImgUrl } from '@/services/sealCtd';
import { imageBaseUrl } from '@/configs/image';
import { Loading } from '@/components/Shared';
import { parseSealCtdGraphTagData } from '@/utils/seal-ctd-utils/sealStdTags';
import { DateFormat } from '@/types/date';
import { ProductPath } from '@/types/router';

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

// at the moment there's a max of 6 pages of graphs, we can remove these once API is implemented
const maxPages = 6;
const getAllImageUrls = (region: string, date: Dayjs, subProductKey: ProductID) => {
  const imgUrls = [];

  for (let i = 0; i < maxPages; i++) {
    const imgUrl = buildSealCtdGraphImageUrl(region, date, subProductKey, i);
    imgUrls.push(imgUrl);
  }
  return imgUrls;
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasImgLoaded, setHasImgLoaded] = useState<boolean>(false);

  // generate and validate image urls
  useEffect(() => {
    const getValidImageUrls = async () => {
      setHasImgLoaded(false);
      setIsLoading(true);
      const allImgUrls = getAllImageUrls(region, date, productId);
      const validImgUrls = await validateSealCtdImgUrl(allImgUrls);

      if (validImgUrls.length < 1) {
        setImgLoadError('No image available.');
      } else {
        setImgLoadError(null);
        setImgUrls(validImgUrls);
      }
      setIsLoading(false);
    };
    getValidImageUrls();
  }, [date, productId, region]);

  // fetch image tags if there are valid image urls
  useEffect(() => {
    if (imgUrls.length < 1) return;

    const fetchData = async () => {
      setHasImgLoaded(false);
      setIsLoading(true);
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
      setIsLoading(false);
    };

    fetchData();
  }, [imgUrls]);

  if (imgLoadError) {
    return <ErrorImage productId={mainProduct!.key} date={dayjs(date)} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const handleImageLoad = () => {
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
  };

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
      {imgData.map(({ url, areas }) => {
        const pageNum = url.split('_')[2].replace('.gif', '');
        return (
          <>
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
          </>
        );
      })}
    </div>
  );
};

export default DataImageWithSealCtdGraphs;
