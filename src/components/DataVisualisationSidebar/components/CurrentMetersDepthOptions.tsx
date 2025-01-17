import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dropdown } from '@/components/Shared';
import { DropdownElement } from '@/components/Shared/Dropdown/types/dropdown.types';
import useCurrentMeterStore, { setDepth } from '@/stores/current-meters-store/currentMeters';
import { CurrentMetersProperty, CurrentMetersDepth } from '@/types/currentMeters';
import { ProductSidebarText } from '@/constants/textConstant';

const allDepthOptions = [
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

const CurrentMetersDepthOptions: React.FC = () => {
  const { property, depth, region } = useCurrentMeterStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const date = searchParams.get('date');

  const depthOptions = useMemo(() => {
    if (property === CurrentMetersProperty.vmean || property === CurrentMetersProperty.vrms) {
      return allDepthOptions;
    }

    return [allDepthOptions[0]];
  }, [property]);

  const handleDepthOptions = (selectedElement: DropdownElement) => {
    setDepth(selectedElement.id as CurrentMetersDepth);
    setSearchParams({ property, depth: selectedElement.id, region, date: date ?? '' });
  };

  return (
    <>
      <h3 className="py-2 text-lg font-medium text-imos-grey">{ProductSidebarText.DEPTH_LAYER}</h3>
      <Dropdown
        elements={depthOptions}
        selectedId={depth}
        onChange={handleDepthOptions}
        showIcons={false}
        smallDropdown
      />
    </>
  );
};

export default CurrentMetersDepthOptions;
