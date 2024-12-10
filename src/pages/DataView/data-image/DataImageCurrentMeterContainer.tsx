import React from 'react';
// import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { ImageMapArea } from '@/types/dataImage';
import { CurrentMeterPlot, CurrentMeterRegion } from '@/types/currentMeters';
import { currentMeterRegionAreasMap } from '@/data/current-meter/region-list';
// import { DataImageArgoContainerProps } from './types/dataImage.types';
// import ImageWithCurrentMeterMap from './ImageWithCurrentMeterMap';
import InteractiveImageWithMap from './InteractiveImageWithMap';

interface DataImageCurrentMeterContainerProps {
  src: string;
  productId: string;
  regionCode: CurrentMeterRegion;
}

const DataImageCurrentMeterContainer: React.FC<DataImageCurrentMeterContainerProps> = ({
  src,
  productId,
  regionCode,
}) => {
  const navigate = useNavigate();
  // const regionArr: ImageMapArea[] = [
  //   {
  //     shape: 'rect',
  //     coords: [495, 174, 504, 184],
  //     href: '../NWSROW/index.html',
  //     alt: 'NWSROW',
  //     title: 'NWSROW',
  //   },
  //   {
  //     shape: 'rect',
  //     coords: [852, 498, 909, 509],
  //     href: '../NWSROW/index.html',
  //     alt: 'NWSROW',
  //     title: 'NWSROW',
  //   },
  // ];

  const regionArr = currentMeterRegionAreasMap[regionCode] as ImageMapArea[];

  // console.log('regionCode############', regionCode);
  // console.log('currentMeterREgionlist', currentMeterRegionAreasMap[regionCode]);

  const buildHref = (point: string) => {
    return `/product/current-meters?plot=${CurrentMeterPlot.One}&point=${point}`;
  };

  const originalCoords = regionArr.map((item) => ({
    shape: 'rect' as const,
    coords: item.coords,
    title: item.title,
    href: buildHref(item.title),
  }));

  const imgAlt = `${productId} data`;

  const handleAreaClick = (area: ImageMapArea) => {
    // console.log('handleAreaClick', area.title);
    navigate(buildHref(area.title));
  };

  return (
    <InteractiveImageWithMap originalAreas={originalCoords} src={src} alt={imgAlt} onAreaClick={handleAreaClick} />
  );
};

export default DataImageCurrentMeterContainer;
