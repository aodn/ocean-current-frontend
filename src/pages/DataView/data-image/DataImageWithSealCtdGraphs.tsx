import React, { useEffect, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import ErrorImage from '@/components/Shared/ErrorImage/ErrorImage';
import { scaleImageMapAreas } from '@/utils/general-utils/general';
import { Product } from '@/types/product';
import { MapImageAreas } from '@/types/dataImage';
import { buildSealCtdImageUrl } from '@/utils/data-image-builder-utils/dataImgBuilder';
import { validateSealCtdImgUrl } from '@/services/sealCtd';
import { imageBaseUrl } from '@/configs/image';
import { Loading } from '@/components/Shared';

type DataImageWithSealCtdGraphsProps = {
  mainProduct: Product | null;
  productId: string;
  date: Dayjs;
  region: string;
};

// at the moment there's a max of 6 pages of graphs, we can remove these once API is implemented
const maxPages = 6;
const getAllImageUrls = (region: string, date: Dayjs, subProductKey: string) => {
  const imgUrls = [];

  for (let i = 0; i < maxPages; i++) {
    const imgUrl = buildSealCtdImageUrl(region, date, subProductKey, i);
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
  const [imgLoadError, setImgLoadError] = useState<string | null>(null);
  const [areas, setAreas] = useState<MapImageAreas[]>();
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getValidImageUrls = async () => {
      const allImgUrls = getAllImageUrls(region, date, productId);
      const validImgUrls = await validateSealCtdImgUrl(allImgUrls);
      setImgUrls(validImgUrls);
      setIsLoading(false);
      if (validImgUrls.length <= 0) {
        setImgLoadError('No image available.');
      } else {
        setImgLoadError(null);
      }
    };
    getValidImageUrls();
  }, [date, productId, region]);

  if (imgLoadError) {
    return <ErrorImage productId={mainProduct!.key} date={dayjs(date)} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const handleImageLoad = () => {
    if (imgRef.current) {
      const { naturalWidth: originalWidth, naturalHeight: originalHeight, width, height } = imgRef.current;

      const convertedCoords = scaleImageMapAreas(originalWidth, originalHeight, width, height, []);
      setAreas(convertedCoords);
    }
  };

  const altText = productId === 'sealCtd-timeseriesSalinity' ? 'Salinity Timeseries' : 'Temperature Timeseries';

  return (
    <div className="relative inline-block w-full">
      {imgUrls.map((url) => (
        <>
          <img
            id={url}
            ref={imgRef}
            src={`${imageBaseUrl}${url}`}
            alt={`${altText} data`}
            useMap={`#seal-ctd-graph-${url}`}
            className="max-h-[80vh] select-none object-contain"
            onError={() => {
              setImgLoadError('Image not available');
            }}
            onLoad={handleImageLoad}
          />
          <map name={`seal-ctd-graphs-${url}`}>
            {areas &&
              areas.map((area, index) => (
                <area
                  key={index}
                  className="cursor-pointer"
                  shape={area.shape}
                  coords={area.coords.join(',')}
                  alt={area.alt}
                  onClick={() => {}}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                    }
                  }}
                  tabIndex={0}
                  title={area.name}
                  role="link"
                />
              ))}
          </map>
        </>
      ))}
    </div>
  );
};

export default DataImageWithSealCtdGraphs;
