import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dropdown } from '@/components/Shared';
import { DropdownElement } from '@/components/Shared/Dropdown/types/dropdown.types';
import useCurrentMeterStore, { setProperty, setDepth, setRegion } from '@/stores/current-meters-store/currentMeters';
import { CurrentMetersProperty, CurrentMetersDepth, CurrentMetersRegion } from '@/types/currentMeters';
import { ProductSidebarText } from '@/constants/textConstant';

const CurrentMetersDepthOptions: React.FC = () => {
  const { property, depth, region } = useCurrentMeterStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const date = searchParams.get('date');

  useEffect(() => {
    const urlRegion = searchParams.get('region') as CurrentMetersRegion;
    const urlProperty = searchParams.get('property') as CurrentMetersProperty;
    const urlDepth = searchParams.get('depth') as CurrentMetersDepth;
    if (urlRegion && Object.values(CurrentMetersRegion).includes(urlRegion)) setRegion(urlRegion);
    if (urlProperty && Object.values(CurrentMetersProperty).includes(urlProperty)) setProperty(urlProperty);
    if (urlDepth && Object.values(CurrentMetersDepth).includes(urlDepth)) setDepth(urlDepth);
  }, [searchParams]);

  const depthOptionsData = [
    { label: '0-4800m', id: CurrentMetersDepth.ONE },
    { label: '0-30m', id: CurrentMetersDepth.TWO },
    { label: '30-80m', id: CurrentMetersDepth.THREE },
    { label: '80-150m', id: CurrentMetersDepth.FOUR },
    { label: '150-300m', id: CurrentMetersDepth.FIVE },
    { label: '300-600m', id: CurrentMetersDepth.SIX },
    { label: '600-1200m', id: CurrentMetersDepth.SEVEN },
    { label: '1200-2200m', id: CurrentMetersDepth.EIGHT },
    { label: '2200-4800m', id: CurrentMetersDepth.NINE },
  ];

  const handleDepthOptions = (selectedElement: DropdownElement) => {
    const { id } = selectedElement;
    const shouldResetToDefaultProperty =
      id !== CurrentMetersDepth.ONE &&
      property !== CurrentMetersProperty.vmean &&
      property !== CurrentMetersProperty.vrms;

    setDepth(selectedElement.id as CurrentMetersDepth);
    setSearchParams({ property, depth: id, region, date: date ?? '' });

    if (shouldResetToDefaultProperty) {
      setProperty(CurrentMetersProperty.vmean);
    }
  };

  return (
    <div className="px-4 pb-4">
      <h3 className="py-2 text-lg font-medium text-imos-grey">{ProductSidebarText.DEPTH_LAYER}</h3>
      <Dropdown
        elements={depthOptionsData}
        selectedId={depth}
        onChange={handleDepthOptions}
        showIcons={false}
        smallDropdown
      />
    </div>
  );
};

export default CurrentMetersDepthOptions;
