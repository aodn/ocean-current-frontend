import React from 'react';
import { CurrentMeterPlotType } from '@/types/currentMeters';
import { buildCurrentMeterPlotImageUrl } from '@/utils/data-image-builder-utils/dataImgBuilder';

interface DataImageCurrentMeterPlotContainerProps {
  pointCode: string;
}

const DataImageCurrentMeterPlotContainer: React.FC<DataImageCurrentMeterPlotContainerProps> = ({ pointCode }) => {
  const plotImages = [
    { type: CurrentMeterPlotType.VelocityVector, title: 'Layer-average velocity vector scatter plots' },
    { type: CurrentMeterPlotType.DepthTime, title: 'Depth Time Plots' },
  ];

  const buildImgSrc = (plotType: CurrentMeterPlotType) => {
    return buildCurrentMeterPlotImageUrl(pointCode, plotType);
  };

  const handleClick = () => {
    // TODO: to be implemented
  };

  return (
    <div>
      {plotImages.map((plot) => (
        <div key={plot.type}>
          <h2 className="my-4">{plot.title}</h2>
          <img
            onClick={handleClick}
            className="max-h-[80vh] w-full select-none object-contain"
            src={buildImgSrc(plot.type)}
            alt="product"
            aria-hidden
          />
        </div>
      ))}
    </div>
  );
};

export default DataImageCurrentMeterPlotContainer;
