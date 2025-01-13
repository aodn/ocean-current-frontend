import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dropdown } from '@/components/Shared';
import { DropdownElement } from '@/components/Shared/Dropdown/types/dropdown.types';
import useCurrentMeterStore, { setProperty, setDepth, setRegion } from '@/stores/current-meters-store/currentMeters';
import { CurrentMeterProperty, CurrentMeterDepth, CurrentMeterRegion } from '@/types/currentMeters';
import { ProductSidebarText } from '@/constants/textConstant';

const CurrentMetersDepthOptions: React.FC = () => {
  const { property, depth, region } = useCurrentMeterStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const date = searchParams.get('date');

  useEffect(() => {
    const urlRegion = searchParams.get('region') as CurrentMeterRegion;
    const urlProperty = searchParams.get('property') as CurrentMeterProperty;
    const urlDepth = searchParams.get('depth') as CurrentMeterDepth;
    if (urlRegion && Object.values(CurrentMeterRegion).includes(urlRegion)) setRegion(urlRegion);
    if (urlProperty && Object.values(CurrentMeterProperty).includes(urlProperty)) setProperty(urlProperty);
    if (urlDepth && Object.values(CurrentMeterDepth).includes(urlDepth)) setDepth(urlDepth);
  }, [searchParams]);

  const depthOptionsData = [
    { label: '0-4800m', id: CurrentMeterDepth.ONE },
    { label: '0-30m', id: CurrentMeterDepth.TWO },
    { label: '30-80m', id: CurrentMeterDepth.THREE },
    { label: '80-150m', id: CurrentMeterDepth.FOUR },
    { label: '150-300m', id: CurrentMeterDepth.FIVE },
    { label: '300-600m', id: CurrentMeterDepth.SIX },
    { label: '600-1200m', id: CurrentMeterDepth.SEVEN },
    { label: '1200-2200m', id: CurrentMeterDepth.EIGHT },
    { label: '2200-4800m', id: CurrentMeterDepth.NINE },
  ];

  const handleDepthOptions = (selectedElement: DropdownElement) => {
    const { id } = selectedElement;
    const shouldResetToDefaultProperty =
      id !== CurrentMeterDepth.ONE && property !== CurrentMeterProperty.vmean && property !== CurrentMeterProperty.vrms;

    setDepth(selectedElement.id as CurrentMeterDepth);
    setSearchParams({ property, depth: id, region, date: date ?? '' });

    if (shouldResetToDefaultProperty) {
      setProperty(CurrentMeterProperty.vmean);
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
