/* eslint-disable react/prop-types */
import { useCallback, useEffect, useRef, useState } from 'react';
import { Dropdown, Loading } from '@/components/Shared';
import { getCurrentMetersPlots } from '@/services/currentMeters';
import { DropdownElement } from '@/components/Shared/Dropdown/types/dropdown.types';
import { buildCurrentMetersDataImageUrl } from '@/utils/data-image-builder-utils/dataImgBuilder';
import { CurrentMetersPlotTitle, CurrentMetersPlotType } from '@/constants/currentMeters';
import { DataImageWithCurrentMetersPlotsProps } from './types/DataImageWithCurrentMetersPlots.types';

const DataImageWithCurrentMetersPlots: React.FC<DataImageWithCurrentMetersPlotsProps> = ({
  subProduct,
  deploymentPlot,
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [velocityElements, setVelocityElements] = useState<DropdownElement[]>([]);
  const [depthTimeElements, setDepthTimeElements] = useState<DropdownElement[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVelocity, setSelectedVelocity] = useState('');
  const [selectedDepthTime, setSelectedDepthTime] = useState('');

  const velocityList = useCallback(async () => {
    const list = await getCurrentMetersPlots(subProduct, deploymentPlot ?? '', 'velocity-vector');
    return list.map((plot) => ({ label: plot, id: plot }));
  }, [deploymentPlot, subProduct]);

  const depthTimeList = useCallback(async () => {
    const list = await getCurrentMetersPlots(subProduct, deploymentPlot ?? '', 'depth-time');
    return list.map((plot) => ({ label: plot, id: plot }));
  }, [deploymentPlot, subProduct]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setVelocityElements(await velocityList());
      setDepthTimeElements(await depthTimeList());
      setLoading(false);
    })();
  }, [depthTimeList, velocityList]);

  useEffect(() => {
    if (velocityElements.length > 0) setSelectedVelocity(velocityElements[0]?.id);
    if (depthTimeElements.length > 0) setSelectedDepthTime(depthTimeElements[0]?.id);
  }, [depthTimeElements, velocityElements]);

  return (
    <div className="h-full bg-white px-4 py-2">
      <div className="relative mb-4 inline-block w-full">
        <h3 className="py-2 text-lg font-medium text-imos-grey">{CurrentMetersPlotTitle.VELOCITY_VECTOR_PLOTS}</h3>
        <Dropdown
          elements={velocityElements}
          selectedId={selectedVelocity}
          onChange={(elem) => {
            setSelectedVelocity(elem.id);
          }}
          showIcons={false}
          smallDropdown
        />
        {loading ? (
          <Loading />
        ) : (
          <img
            ref={imgRef}
            src={buildCurrentMetersDataImageUrl(
              subProduct,
              deploymentPlot ?? '',
              CurrentMetersPlotType.VELOCITY_VECTOR,
              selectedVelocity,
            )}
            alt={`Layer-average velocity vector scatter plots for deployment plot ${deploymentPlot}`}
            className="mt-2 max-h-[80vh] select-none object-contain"
          />
        )}
      </div>
      <div className="relative inline-block w-full">
        <h3 className="py-2 text-lg font-medium text-imos-grey">{CurrentMetersPlotTitle.DEPTH_TIME_PLOTS}</h3>
        <Dropdown
          elements={depthTimeElements}
          selectedId={selectedDepthTime}
          onChange={(elem) => {
            setSelectedDepthTime(elem.id);
          }}
          showIcons={false}
          smallDropdown
        />
        {loading ? (
          <Loading />
        ) : (
          <img
            ref={imgRef}
            src={buildCurrentMetersDataImageUrl(
              subProduct,
              deploymentPlot ?? '',
              CurrentMetersPlotType.DEPTH_TIME,
              selectedDepthTime,
            )}
            alt={`Depth-time plots for deployment plot ${deploymentPlot}`}
            className="mt-2 max-h-[80vh] select-none object-contain"
          />
        )}
      </div>
    </div>
  );
};

export default DataImageWithCurrentMetersPlots;
