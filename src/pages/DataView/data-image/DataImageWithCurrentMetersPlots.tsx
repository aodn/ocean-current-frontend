import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dropdown, Loading } from '@/components/Shared';
import { getCurrentMetersPlotsList } from '@/services/currentMeters';
import { DropdownElement } from '@/components/Shared/Dropdown/types/dropdown.types';
import { buildCurrentMetersDataImageUrl } from '@/utils/data-image-builder-utils/dataImgBuilder';
import { CurrentMetersPlotPath, CurrentMetersPlotTitle, CurrentMetersSubproductsKey } from '@/constants/currentMeters';
import { CurrentMetersDeploymentPlotNames } from '@/types/currentMeters';

type DataImageWithCurrentMetersPlotsProps = {
  subProductKey: CurrentMetersSubproductsKey;
  deploymentPlot: CurrentMetersDeploymentPlotNames;
};

const DataImageWithCurrentMetersPlots: React.FC<DataImageWithCurrentMetersPlotsProps> = ({
  subProductKey,
  deploymentPlot,
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [velocityElements, setVelocityElements] = useState<DropdownElement[]>([]);
  const [depthTimeElements, setDepthTimeElements] = useState<DropdownElement[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVelocity, setSelectedVelocity] = useState('');
  const [selectedDepthTime, setSelectedDepthTime] = useState('');
  const subProdKey = subProductKey as CurrentMetersSubproductsKey;

  const velocityList = useCallback(async () => {
    const list = await getCurrentMetersPlotsList(subProdKey, deploymentPlot, CurrentMetersPlotPath.VELOCITY_VECTOR);
    return list.map((plot) => ({ label: plot, id: plot }));
  }, [deploymentPlot, subProdKey]);

  const depthTimeList = useCallback(async () => {
    const list = await getCurrentMetersPlotsList(subProdKey, deploymentPlot, CurrentMetersPlotPath.DEPTH_TIME);
    return list.map((plot) => ({ label: plot, id: plot }));
  }, [deploymentPlot, subProdKey]);

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
          smallDropdown
        />
        {loading ? (
          <Loading />
        ) : (
          <img
            ref={imgRef}
            src={buildCurrentMetersDataImageUrl(
              subProdKey,
              deploymentPlot,
              CurrentMetersPlotPath.VELOCITY_VECTOR,
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
          smallDropdown
        />
        {loading ? (
          <Loading />
        ) : (
          <img
            ref={imgRef}
            src={buildCurrentMetersDataImageUrl(
              subProdKey,
              deploymentPlot,
              CurrentMetersPlotPath.DEPTH_TIME,
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
