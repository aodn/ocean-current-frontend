import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import InfoIcon from '@/assets/icons/info-icon.svg';
import { Button, Dropdown, Popup, TruncateText } from '@/components/Shared';
import ArrowWithTail from '@/assets/icons/ArrowWithTail';
import { currentMetersDescription, currentMetersDataModal } from '@/data/currentMetersData.tsx';
import { DropdownElement } from '@/components/Shared/Dropdown/types/dropdown.types';
import useCurrentMeterStore, { setProperty, setDepth, setRegion } from '@/stores/current-meters-store/currentMeters';
import { CurrentMeterProperty, CurrentMeterDepth, CurrentMeterRegion } from '@/types/currentMeters';
import MiniMap from './MiniMap';

interface SectionData {
  title: string;
  id: string;
}

const CurrentMetersSidebar: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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

  const propertyData = useMemo(() => {
    const allPropertyData: SectionData[] = [
      { title: 'vmean', id: CurrentMeterProperty.vmean },
      { title: 'vrms', id: CurrentMeterProperty.vrms },
      { title: 'M2', id: CurrentMeterProperty.M2 },
      { title: 'S2', id: CurrentMeterProperty.S2 },
      { title: 'N2', id: CurrentMeterProperty.N2 },
      { title: 'O1', id: CurrentMeterProperty.O1 },
      { title: 'K1', id: CurrentMeterProperty.K1 },
    ];

    if (depth === CurrentMeterDepth.One) {
      return allPropertyData;
    }
    return allPropertyData.filter(
      (prop) => prop.id === CurrentMeterProperty.vmean || prop.id === CurrentMeterProperty.vrms,
    );
  }, [depth]);

  const depthOptionsData = [
    { label: '0-4800m', id: CurrentMeterDepth.One },
    { label: '0-30m', id: CurrentMeterDepth.Two },
    { label: '80-150m', id: CurrentMeterDepth.Three },
    { label: '150-300m', id: CurrentMeterDepth.Four },
    { label: '300-600m', id: CurrentMeterDepth.Five },
    { label: '1200-2200m', id: CurrentMeterDepth.Six },
    { label: '2200-4800m', id: CurrentMeterDepth.Seven },
  ];

  const regionsOptionsData = [
    { label: 'Aust', id: CurrentMeterRegion.Aust },
    { label: 'TimorP', id: CurrentMeterRegion.TimorP },
    { label: 'Kim', id: CurrentMeterRegion.Kim },
    { label: 'Row', id: CurrentMeterRegion.Row },
    { label: 'Pil', id: CurrentMeterRegion.Pil },
    { label: 'Ning', id: CurrentMeterRegion.Ning },
    { label: 'Perth', id: CurrentMeterRegion.Perth },
    { label: 'Esp', id: CurrentMeterRegion.Esp },
    { label: 'SA', id: CurrentMeterRegion.SA },
    { label: 'Totten', id: CurrentMeterRegion.Totten },
    { label: 'SOFS', id: CurrentMeterRegion.SOFS },
    { label: 'Polynya', id: CurrentMeterRegion.Polynya },
    { label: 'ETas', id: CurrentMeterRegion.ETas },
    { label: 'BMP', id: CurrentMeterRegion.BMP },
    { label: 'Syd', id: CurrentMeterRegion.Syd },
    { label: 'Coffs', id: CurrentMeterRegion.Coffs },
    { label: 'SEQ', id: CurrentMeterRegion.SEQ },
    { label: 'SGBR', id: CurrentMeterRegion.SGBR },
    { label: 'SGBR2', id: CurrentMeterRegion.SGBR2 },
    { label: 'CGBR', id: CurrentMeterRegion.CGBR },
    { label: 'NGBR', id: CurrentMeterRegion.NGBR },
  ];

  const handlePopup = () => setIsPopupOpen(!isPopupOpen);

  const handlePropertyChange = (id: string) => {
    setSearchParams({ property: id, depth, region, date: date ?? '' });
    setProperty(id as CurrentMeterProperty);
  };

  const handleRegionOptions = (selectedElement: DropdownElement) => {
    const { id } = selectedElement;

    setSearchParams({ property, depth, region: id, date: date ?? '' });
    setRegion(id as CurrentMeterRegion);
  };

  const handleDepthOptions = (selectedElement: DropdownElement) => {
    const { id } = selectedElement;
    const shouldResetToDefaultProperty =
      id !== CurrentMeterDepth.One && property !== CurrentMeterProperty.vmean && property !== CurrentMeterProperty.vrms;

    setDepth(selectedElement.id as CurrentMeterDepth);
    setSearchParams({ property, depth: id, region, date: date ?? '' });

    if (shouldResetToDefaultProperty) {
      setProperty(CurrentMeterProperty.vmean);
    }
  };

  return (
    <div className="rounded-md bg-white">
      <div className="h-60 w-full overflow-hidden">
        <MiniMap />
      </div>
      <div className="[&>*:last-child]:border-b-0 [&>*]:border-b-2 [&>*]:border-[#e5e7eb]">
        <div className="p-4">
          <div className="flex justify-between">
            <img src={InfoIcon} alt="info icon" className="mr-6 mt-1 h-6 w-6 cursor-pointer object-contain" />
            <TruncateText lines={4} text={currentMetersDescription} />
          </div>
          <div aria-hidden onClick={handlePopup} className="mt-3 flex justify-end ">
            <p className="mr-2 cursor-pointer font-semibold text-imos-grey">Read More</p>
            <ArrowWithTail stroke="#787878" className="mt-2 cursor-pointer" />
          </div>
        </div>

        <Popup
          title={'IMOS current meters on coastal and deep water moorings around Australia'}
          body={currentMetersDataModal}
          isOpen={isPopupOpen}
          onClose={handlePopup}
        />

        <div className="px-4 pb-4">
          <h3 className="py-2 text-lg font-medium text-imos-grey">Regions</h3>
          <Dropdown
            elements={regionsOptionsData}
            selectedId={region}
            onChange={handleRegionOptions}
            showIcons={false}
            smallDropdown
          />
        </div>

        <div className="px-4 pb-4">
          <h3 className="py-2 text-lg font-medium text-imos-grey">Depth Layer</h3>
          <Dropdown
            elements={depthOptionsData}
            selectedId={depth}
            onChange={handleDepthOptions}
            showIcons={false}
            smallDropdown
          />
        </div>

        <div className="px-4 pb-2">
          <h3 className="py-2 text-lg font-medium text-imos-grey">Property</h3>

          <div className="mb-6 mt-2 flex flex-wrap justify-between gap-2">
            {propertyData.map(({ title, id }, index) => (
              <div key={id} className={index === propertyData.length - 1 ? 'w-auto' : 'flex-1'}>
                <Button
                  size="full"
                  borderRadius="small"
                  type={property === id ? 'primary' : 'secondary'}
                  onClick={() => handlePropertyChange(id)}
                >
                  {title}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentMetersSidebar;
