import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import InfoIcon from '@/assets/icons/info-icon.svg';
import { Button, Dropdown, Popup, TruncateText } from '@/components/Shared';
import ArrowWithTail from '@/assets/icons/ArrowWithTail';
import { currentMetersDescription, currentMetersDataModal } from '@/data/currentMetersData.tsx';
import { DropdownElement } from '@/components/Shared/Dropdown/types/dropdown.types';
import useCurrentMeterStore, { setProperty, setDepth, setRegion } from '@/stores/current-meters-store/currentMeters';
import { currentMeterProperty, currentMeterDepth, currentMeterRegion } from '@/types/currentMeters';

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
    const urlRegion = searchParams.get('region') as currentMeterRegion;
    const urlProperty = searchParams.get('property') as currentMeterProperty;
    const urlDepth = searchParams.get('depth') as currentMeterDepth;
    if (urlRegion && Object.values(currentMeterRegion).includes(urlRegion)) setRegion(urlRegion);
    if (urlProperty && Object.values(currentMeterProperty).includes(urlProperty)) setProperty(urlProperty);
    if (urlDepth && Object.values(currentMeterDepth).includes(urlDepth)) setDepth(urlDepth);
  }, [searchParams]);

  const propertyData = useMemo(() => {
    const allPropertyData: SectionData[] = [
      { title: 'vmean', id: currentMeterProperty.vmean },
      { title: 'vrms', id: currentMeterProperty.vrms },
      { title: 'M2', id: currentMeterProperty.M2 },
      { title: 'S2', id: currentMeterProperty.S2 },
      { title: 'N2', id: currentMeterProperty.N2 },
      { title: 'O1', id: currentMeterProperty.O1 },
      { title: 'K1', id: currentMeterProperty.K1 },
    ];

    if (depth === currentMeterDepth.One) {
      return allPropertyData;
    }
    return allPropertyData.filter(
      (prop) => prop.id === currentMeterProperty.vmean || prop.id === currentMeterProperty.vrms,
    );
  }, [depth]);

  const depthOptionsData = [
    { label: '0-4800m', id: currentMeterDepth.One },
    { label: '0-30m', id: currentMeterDepth.Two },
    { label: '80-150m', id: currentMeterDepth.Three },
    { label: '150-300m', id: currentMeterDepth.Four },
    { label: '300-600m', id: currentMeterDepth.Five },
    { label: '1200-2200m', id: currentMeterDepth.Six },
    { label: '2200-4800m', id: currentMeterDepth.Seven },
  ];

  const regionsOptionsData = [
    { label: 'Aust', id: currentMeterRegion.Aust },
    { label: 'TimorP', id: currentMeterRegion.TimorP },
    { label: 'Kim', id: currentMeterRegion.Kim },
    { label: 'Row', id: currentMeterRegion.Row },
    { label: 'Pil', id: currentMeterRegion.Pil },
    { label: 'Ning', id: currentMeterRegion.Ning },
    { label: 'Perth', id: currentMeterRegion.Perth },
    { label: 'Esp', id: currentMeterRegion.Esp },
    { label: 'SA', id: currentMeterRegion.SA },
    { label: 'Totten', id: currentMeterRegion.Totten },
    { label: 'SOFS', id: currentMeterRegion.SOFS },
    { label: 'Polynya', id: currentMeterRegion.Polynya },
    { label: 'ETas', id: currentMeterRegion.ETas },
    { label: 'BMP', id: currentMeterRegion.BMP },
    { label: 'Syd', id: currentMeterRegion.Syd },
    { label: 'Coffs', id: currentMeterRegion.Coffs },
    { label: 'SEQ', id: currentMeterRegion.SEQ },
    { label: 'SGBR', id: currentMeterRegion.SGBR },
    { label: 'SGBR2', id: currentMeterRegion.SGBR2 },
    { label: 'CGBR', id: currentMeterRegion.CGBR },
    { label: 'NGBR', id: currentMeterRegion.NGBR },
  ];

  const handlePopup = () => setIsPopupOpen(!isPopupOpen);

  const handlePropertyChange = (id: string) => {
    setSearchParams({ property: id, depth, region, date: date ?? '' });
    setProperty(id as currentMeterProperty);
  };

  const handleRegionOptions = (selectedElement: DropdownElement) => {
    const { id } = selectedElement;

    setSearchParams({ property, depth, region: id, date: date ?? '' });
    setRegion(id as currentMeterRegion);
  };

  const handleDepthOptions = (selectedElement: DropdownElement) => {
    const { id } = selectedElement;
    const shouldResetToDefaultProperty =
      id !== currentMeterDepth.One && property !== currentMeterProperty.vmean && property !== currentMeterProperty.vrms;

    setDepth(selectedElement.id as currentMeterDepth);
    setSearchParams({ property, depth: id, region, date: date ?? '' });

    if (shouldResetToDefaultProperty) {
      setProperty(currentMeterProperty.vmean);
    }
  };

  return (
    <div className="rounded-md bg-white">
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
