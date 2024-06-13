import React, { useState } from 'react';
import { createGIF, CreateGIFOptions, CreateGIFObject } from 'gifshot';
import dayjs from 'dayjs';
import { buildProductImageUrl, getTargetRegionScopPath } from '@/utils/dataImgBuilder';
import useProductStore from '@/stores/product-store/productStore';
import { getRegionByRegionTitle } from '@/utils/region';
import { RegionScope } from '@/constants/region';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import { Button, Loading } from '@/components/Shared';
import { VideoCreationProps } from './types/videoCreation.types';

const VideoCreation: React.FC<VideoCreationProps> = ({ allDates }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const useProductRegionTitle = useProductStore((state) => state.productParams.regionTitle);
  const { mainProduct, subProduct } = useProductConvert();

  const region = getRegionByRegionTitle(useProductRegionTitle);
  const targetPathRegion = getTargetRegionScopPath(region?.scope || RegionScope.Au);
  const regionPath = region?.region;

  const subProductImgPath = subProduct?.imgPath;

  const generateImageArray = (): string[] => {
    const arr: string[] = [];
    allDates.forEach((date) => {
      const formattedDate = dayjs(date).format('YYYYMMDD');
      arr.push(
        buildProductImageUrl(mainProduct!.key, subProductImgPath, regionPath!, targetPathRegion, formattedDate, true),
      );
    });
    return arr;
  };

  const fileName = () => {
    const formattedDateStart = dayjs(allDates[0]).format('YYYYMMDD');
    const formattedDateEnd = dayjs(allDates[allDates.length - 1]).format('YYYYMMDD');

    return `${mainProduct!.key}_${subProductImgPath}_${regionPath!}_${formattedDateStart}_${formattedDateEnd}.gif`;
  };

  const handleClick = () => {
    setIsLoading(true);
    const images = generateImageArray();

    getImageDimensions(images).then(({ width, height }) => {
      const options: CreateGIFOptions = {
        images: images,
        // TODO: change + 500
        gifWidth: width + 500,
        gifHeight: height + 500,
        numWorkers: 5,
        frameDuration: 3,
        sampleInterval: 100,
      };

      createGIF(options, (obj: CreateGIFObject) => {
        if (!obj.error) {
          const link = document.createElement('a');
          link.download = fileName();
          link.href = obj.image;
          link.click();
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      });
    });
  };

  const getImageDimensions = (imageUrls: string[]): Promise<{ width: number; height: number }> => {
    const loadImage = (url: string) => {
      return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
      });
    };

    return Promise.all(imageUrls.map(loadImage)).then((images) => {
      const widths = images.map((img) => img.width);
      const heights = images.map((img) => img.height);
      const maxWidth = Math.max(...widths);
      const maxHeight = Math.max(...heights);
      return { width: maxWidth, height: maxHeight };
    });
  };

  return (
    <div>
      {isLoading ? (
        <Button type="primary" borderRadius="small" onClick={handleClick}>
          <Loading loadingSize="w-6 h-6" />
        </Button>
      ) : (
        <div className="flex">
          <Button type="primary" borderRadius="small" onClick={handleClick}>
            Download
          </Button>
        </div>
      )}
    </div>
  );
};

export default VideoCreation;
