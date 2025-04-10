import React, { useEffect, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { calculateImageScales } from '@/utils/general-utils/general';
import { ArgoTagMapArea } from '@/types/argo';
import { convertCoordsBasedOnImageScale } from '@/utils/argo-utils/argoTag';
import ErrorImage from '@/components/Shared/ErrorImage/ErrorImage';
import { MapImageAreas } from '@/types/dataImage';
import { ProductID } from '@/types/product';
import { getSealCtdMapTags } from '@/services/sealCtd';
import { parseArgoAndSealLocationsTagData } from '@/utils/seal-ctd-utils/sealStdTags';
import { DateFormat } from '@/types/date';

type DataImageWithArgoAndSealCTDMapProps = {
  src: string;
  productId: string;
  regionTitle: string;
  date: Dayjs;
};

const DataImageWithArgoAndSealCTDMap: React.FC<DataImageWithArgoAndSealCTDMapProps> = ({
  src,
  productId,
  regionTitle,
  date,
}) => {
  const formattedDate = dayjs(date).format(DateFormat.DAY);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [argoData, setArgoData] = useState<ArgoTagMapArea[]>([]);
  const [sealData, setSealData] = useState<MapImageAreas[]>([]);
  const [argoCoords, setArgoCoords] = useState<ArgoTagMapArea[]>([]);
  const [sealCoords, setSealCoords] = useState<MapImageAreas[]>([]);
  const [imgLoadError, setImgLoadError] = useState<string | null>(null);

  useEffect(() => {
    setImgLoadError(null);
  }, [src]);

  useEffect(() => {
    const fetchTagsData = async () => {
      const mapTags = await getSealCtdMapTags(regionTitle, date);
      if (mapTags) {
        const { argoTags, sealTags } = parseArgoAndSealLocationsTagData(mapTags);
        setArgoData(argoTags);
        setSealData(sealTags);
      }
    };

    fetchTagsData();
  }, [date, regionTitle]);

  useEffect(() => {
    const handleImageLoad = () => {
      setArgoCoords([]);
      setSealCoords([]);

      if (imgRef.current && (argoData.length > 0 || sealData.length > 0)) {
        const { naturalWidth, naturalHeight, width, height } = imgRef.current;
        const { scaleX, scaleY } = calculateImageScales(naturalWidth, naturalHeight, width, height);

        if (argoData.length > 0) {
          const originalArgoCoords = argoData.map((item) => ({
            ...item,
            href: `/product/argo?wmoid=${item.wmoId}&cycle=${item.cycle}&depth=0-2000m&date=${formattedDate}`,
          }));
          const convertedArgoCoords = convertCoordsBasedOnImageScale(originalArgoCoords, scaleX, scaleY, naturalHeight);
          setArgoCoords(convertedArgoCoords as ArgoTagMapArea[]);
        }

        if (sealData.length > 0) {
          const originalSealCoords = sealData.map((item) => ({
            ...item,
            href: `/product/seal-ctd-tags/10days?sealId=${item.name}&region=${regionTitle}&date=${formattedDate}`,
          }));
          const convertedSealCoords = convertCoordsBasedOnImageScale(originalSealCoords, scaleX, scaleY, naturalHeight);

          setSealCoords(convertedSealCoords as MapImageAreas[]);
        }
      }
    };

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
  }, [argoData, formattedDate, regionTitle, sealData]);

  const handleCircleClick = async (area: ArgoTagMapArea | MapImageAreas) => {
    window.open(area.href, '_blank', 'noopener,noreferrer');
  };

  if (imgLoadError) {
    return <ErrorImage productId={productId.split('-')[0] as ProductID} date={date} />;
  }

  return (
    <div className="relative inline-block h-full w-full bg-white">
      <img
        ref={imgRef}
        src={src}
        alt={`Argo and Seal locations in ${regionTitle}`}
        useMap="#argo-and-seal-tag-map"
        className="max-h-[80vh] w-full select-none object-contain"
        onError={() => {
          setImgLoadError('Image not available');
        }}
      />
      <map name="argo-and-seal-tag-map">
        {argoCoords.map((area, index) => (
          <area
            key={index}
            shape={area.shape}
            coords={area.coords.join(',')}
            alt={`Argo wmoId ${area.wmoId}`}
            onClick={() => handleCircleClick(area)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCircleClick(area);
              }
            }}
            tabIndex={0}
            title={`Argo wmoId ${area.wmoId}`}
            role="link"
            className="cursor-pointer"
          />
        ))}
        {sealCoords.map((area, index) => (
          <area
            key={index}
            shape={area.shape}
            coords={area.coords.join(',')}
            alt={`Seal tag ${area.name}`}
            onClick={() => handleCircleClick(area)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCircleClick(area);
              }
            }}
            tabIndex={0}
            title={`Seal tag ${area.name}`}
            role="link"
            className="cursor-pointer"
          />
        ))}
      </map>
    </div>
  );
};

export default DataImageWithArgoAndSealCTDMap;
