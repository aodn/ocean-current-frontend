import React from 'react';
import dayjs from 'dayjs';
import { useImageArgoTags } from '@/services/hooks';
import { getArgoTagFilePathByProductId } from '@/utils/argo-utils/argoTag';
import { RegionScope } from '@/constants/region';
import ImageWithMap from './ImageWithMap';
import { DataImageProps } from './types/dataImage.types';

const DataImage: React.FC<DataImageProps> = ({ src, productId, date, regionCode, regionScope }) => {
  const argoTagFilePathValue = getArgoTagFilePathByProductId(productId);

  const argoTagFilePath = regionScope === RegionScope.Local ? argoTagFilePathValue?.local : argoTagFilePathValue?.state;

  if (!argoTagFilePathValue || !argoTagFilePath) {
    throw new Error(`Argo tag file path not found for product id: ${productId}`);
  }

  const { data } = useImageArgoTags(date, argoTagFilePath, regionCode);

  const dateFormatted = dayjs(date).format('YYYYMMDD');

  const originalCoords = data.map((item) => ({
    shape: 'circle',
    coords: [item.coordX, item.coordY, 10],
    href: `/product/argo?wmoid=${item.wmoId}&cycle=${item.cycle}&depth=0&date=${dateFormatted}`,
    wmoId: item.wmoId,
    cycle: item.cycle,
  }));

  const imgAlt = `${productId} data in ${regionCode} at ${dateFormatted}`;

  return <ImageWithMap originalCoords={originalCoords} src={src} alt={imgAlt} dateString={dateFormatted} />;
};

export default DataImage;
