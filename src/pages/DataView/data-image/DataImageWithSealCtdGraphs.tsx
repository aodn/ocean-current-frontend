import React, { useEffect, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import ErrorImage from '@/components/Shared/ErrorImage/ErrorImage';
import { scaleImageMapAreas } from '@/utils/general-utils/general';
import { ProductID, Product } from '@/types/product';
import { MapImageAreas } from '@/types/dataImage';
import { buildSealCtdImageUrl } from '@/utils/data-image-builder-utils/dataImgBuilder';
import { getSealCtdGraphTags, validateSealCtdImgUrl } from '@/services/sealCtd';
import { imageBaseUrl } from '@/configs/image';
import { Loading, Popup } from '@/components/Shared';
import { parseSealCtdTagData } from '@/utils/seal-ctd-utils/sealStdTags';
import DataImageWithSealCtdTagDataModal from './DataImageWithSealCtdTagDataModal';

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
  const [imgData, setImgData] = useState<SealGraphData[]>([]);
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasImgLoaded, setHasImgLoaded] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSealTag, setSelectedSealTag] = useState<string>('');

  // generate and validate image urls
  useEffect(() => {
    setHasImgLoaded(false);

    const getValidImageUrls = async () => {
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
      setIsLoading(true);
      const tempArr = await Promise.all(
        imgUrls.map(async (url) => {
          const imgTags = await getSealCtdGraphTags(url);
          return {
            url,
            areas: imgTags && imgTags.length > 0 ? parseSealCtdTagData(imgTags) : [],
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

  const openPopUp = (sealTag: string) => {
    setSelectedSealTag(sealTag);
    setIsPopupOpen(true);
  };
  const closePopUp = () => {
    setSelectedSealTag('');
    setIsPopupOpen(false);
  };

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
                      onClick={() => openPopUp(area.name)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          openPopUp(area.name);
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

      <Popup title={selectedSealTag} isOpen={isPopupOpen} onClose={closePopUp}>
        <DataImageWithSealCtdTagDataModal mainProduct={mainProduct} date={date} sealTagId={selectedSealTag} />
      </Popup>
    </div>
  );
};

export default DataImageWithSealCtdGraphs;
