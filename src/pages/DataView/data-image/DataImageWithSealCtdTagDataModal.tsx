import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import ErrorImage from '@/components/Shared/ErrorImage/ErrorImage';
import { Product } from '@/types/product';
import { Loading } from '@/components/Shared';

type DataImageWithSealCtdGraphsProps = {
  mainProduct: Product | null;
  sealTagId: string;
  date: Dayjs;
};

const DataImageWithSealCtdTagDataModal: React.FC<DataImageWithSealCtdGraphsProps> = ({
  mainProduct,
  sealTagId,
  date,
}) => {
  const [imgLoadError] = useState<string | null>(null);
  const [isLoading] = useState<boolean>(false);

  if (imgLoadError) {
    return <ErrorImage productId={mainProduct!.key} date={dayjs(date)} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  //   const handleImageLoad = () => {
  //     if (imgRef.current) {
  //       const { naturalWidth: originalWidth, naturalHeight: originalHeight, width, height } = imgRef.current;
  //       const tempArr = imgData.map((img) => {
  //         const convertedCoords = scaleImageMapAreas(originalWidth, originalHeight, width, height, img.areas as []);
  //         return {
  //           ...img,
  //           areas: convertedCoords,
  //         };
  //       });

  //       setImgData(tempArr);
  //       setHasImgLoaded(true);
  //     }
  //   };

  //   const altText = productId === 'sealCtd-timeseriesSalinity' ? 'Salinity Timeseries' : 'Temperature Timeseries';

  return (
    <div className="relative inline-block w-full">
      <div className="h-full bg-white">
        {/* <img
          //   onClick={handlePopup}
          className="max-h-[80vh] w-full select-none object-contain"
          src={`${imageBaseUrl}${url}`}
          alt={altText}
          onError={() => {
            setImgLoadError('Image not available');
          }}
          onLoad={handleImageLoad}
        /> */}
        {sealTagId}
      </div>
    </div>
  );
};

export default DataImageWithSealCtdTagDataModal;
