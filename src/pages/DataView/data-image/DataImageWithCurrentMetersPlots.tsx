import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Dropdown, Loading } from '@/components/Shared';
import { buildCurrentMetersDataImageUrl } from '@/utils/data-image-builder-utils/dataImgBuilder';
import { CurrentMetersPlotPath, CurrentMetersPlotTitle } from '@/constants/currentMeters';
import { CurrentMetersDeploymentPlotNames } from '@/types/currentMeters';
import { fetchCurrentMetersPlotsList } from '@/services/imageList';
import { DropdownElement } from '@/components/Shared/Dropdown/types/dropdown.types';

const filterLatestAndRemoveFileExtension = (files: string[] | undefined): DropdownElement<string>[] => {
  if (!files) return [];
  return files
    .filter((file) => !file.includes('latest'))
    .map((file) => ({ label: file.replace('.gif', ''), id: file.replace('.gif', '') }));
};

type DataImageWithCurrentMetersPlotsProps = {
  deploymentPlot: CurrentMetersDeploymentPlotNames;
};

const DataImageWithCurrentMetersPlots: React.FC<DataImageWithCurrentMetersPlotsProps> = ({ deploymentPlot }) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [selectedVelocityId, setSelectedVelocityId] = useState<string | null>(null);
  const [selectedDepthTimeId, setSelectedDepthTimeId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['current-meters-plots', deploymentPlot],
    queryFn: () => fetchCurrentMetersPlotsList(deploymentPlot),
    enabled: !!deploymentPlot,
  });

  const velocityList = data?.depthData?.find(({ depth }) => depth === CurrentMetersPlotPath.VELOCITY_VECTOR);
  const depthTimeList = data?.depthData?.find(({ depth }) => depth === CurrentMetersPlotPath.DEPTH_TIME);

  const velocityElements = useMemo(() => filterLatestAndRemoveFileExtension(velocityList?.files), [velocityList]);
  const depthTimeElements = useMemo(() => filterLatestAndRemoveFileExtension(depthTimeList?.files), [depthTimeList]);

  useEffect(() => {
    if (velocityElements && velocityElements.length > 0) {
      setSelectedVelocityId(velocityElements[0].id);
    }
    if (depthTimeElements && depthTimeElements.length > 0) {
      setSelectedDepthTimeId(depthTimeElements[0].id);
    }
  }, [depthTimeElements, velocityElements]);

  return (
    <div className="h-full bg-white px-4 py-2">
      <div className="relative mb-4 inline-block w-full">
        <h3 className="py-2 text-lg font-medium text-imos-grey">{CurrentMetersPlotTitle.VELOCITY_VECTOR_PLOTS}</h3>
        <Dropdown
          elements={velocityElements}
          selectedId={selectedVelocityId}
          onChange={(elem) => {
            setSelectedVelocityId(elem.id);
          }}
          smallDropdown
        />
        {isLoading || !selectedVelocityId || !velocityList ? (
          <Loading />
        ) : (
          <img
            ref={imgRef}
            src={buildCurrentMetersDataImageUrl(velocityList.path, selectedVelocityId)}
            alt={`Layer-average velocity vector scatter plots for deployment plot ${deploymentPlot}`}
            className="mt-2 max-h-[80vh] select-none object-contain"
          />
        )}
      </div>
      <div className="relative inline-block w-full">
        <h3 className="py-2 text-lg font-medium text-imos-grey">{CurrentMetersPlotTitle.DEPTH_TIME_PLOTS}</h3>
        <Dropdown
          elements={depthTimeElements}
          selectedId={selectedDepthTimeId}
          onChange={(elem) => {
            setSelectedDepthTimeId(elem.id);
          }}
          smallDropdown
        />
        {isLoading || !selectedDepthTimeId || !depthTimeList ? (
          <Loading />
        ) : (
          <img
            ref={imgRef}
            src={buildCurrentMetersDataImageUrl(depthTimeList.path, selectedDepthTimeId)}
            alt={`Depth-time plots for deployment plot ${deploymentPlot}`}
            className="mt-2 max-h-[80vh] select-none object-contain"
          />
        )}
      </div>
    </div>
  );
};

export default DataImageWithCurrentMetersPlots;
