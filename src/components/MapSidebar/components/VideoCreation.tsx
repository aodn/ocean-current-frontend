import React, { useState } from 'react';
import { createGIF, CreateGIFOptions, CreateGIFObject } from 'gifshot';
import { buildProductImageUrl, getTargetRegionScopPath } from '@/utils/dataImgBuilder';
import useProductStore from '@/stores/product-store/productStore';
import { getRegionByRegionTitle } from '@/utils/region';
import { RegionScope } from '@/constants/region';
import useProductConvert from '@/stores/product-store/hooks/useProductConvert';
import { Button } from '@/components/Shared';

const VideoCreation: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const useProductRegionTitle = useProductStore((state) => state.productParams.regionTitle);
  const { mainProduct, subProduct } = useProductConvert();

  const region = getRegionByRegionTitle(useProductRegionTitle);
  const targetPathRegion = getTargetRegionScopPath(region?.scope || RegionScope.Au);
  const regionPath = region?.region;

  const subProductImgPath = subProduct?.imgPath;

  const generateImageArray = (): string[] => {
    const arr: string[] = [];
    for (let i = 1; i < 10; i++) {
      arr.push(
        buildProductImageUrl(mainProduct!.key, subProductImgPath, regionPath!, targetPathRegion, `2024040${i}`, true),
      );
    }
    return arr;
  };

  const handleClick = () => {
    const images = generateImageArray();
    const options: CreateGIFOptions = {
      images: images,
      gifWidth: 1000,
      gifHeight: 900,
      numWorkers: 5,
      frameDuration: 3,
      sampleInterval: 100,
      progressCallback: (e) => setProgress(e * 100),
    };

    createGIF(options, (obj: CreateGIFObject) => {
      if (!obj.error) {
        const link = document.createElement('a');
        link.download = `${mainProduct!.key}_${subProductImgPath}_${regionPath!}.gif`;
        link.href = obj.image;
        link.click();
        setProgress(0);
      }
    });
  };

  return (
    <div>
      <Button type="primary" borderRadius="small" onClick={handleClick}>
        Download video
      </Button>
      {progress !== 0 && <label>Creating GIF... {progress}%</label>}
    </div>
  );
};

export default VideoCreation;
