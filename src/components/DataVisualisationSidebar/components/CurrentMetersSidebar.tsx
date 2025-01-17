import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import InfoIcon from '@/assets/icons/info-icon.svg';
import { Dropdown, Popup, TruncateText } from '@/components/Shared';
import ArrowWithTail from '@/assets/icons/ArrowWithTail';
import { DropdownElement } from '@/components/Shared/Dropdown/types/dropdown.types';
import useCurrentMeterStore, { setProperty, setDepth, setRegion } from '@/stores/current-meters-store/currentMeters';
import { CurrentMetersProperty, CurrentMetersDepth, CurrentMetersRegion } from '@/types/currentMeters';
import { productDescription } from '@/constants/productInfo';
import MiniMap from './MiniMap';
import SidebarProductDropdown from './SidebarProductDropdown';
import CurrentMetersDepthOptions from './CurrentMetersDepthOptions';
import CurrentMetersPropertyOptions from './CurrentMetersPropertyOptions';

const CurrentMetersSidebar: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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
  const prodInfo = productDescription.filter((prod) => prod.id === 'currentMeters')[0];

  const regionsOptionsData = [
    { label: 'Aust', id: CurrentMetersRegion.Aust },
    { label: 'TimorP', id: CurrentMetersRegion.TimorP },
    { label: 'Kim', id: CurrentMetersRegion.Kim },
    { label: 'Row', id: CurrentMetersRegion.Row },
    { label: 'Pil', id: CurrentMetersRegion.Pil },
    { label: 'Ning', id: CurrentMetersRegion.Ning },
    { label: 'Perth', id: CurrentMetersRegion.Perth },
    { label: 'Esp', id: CurrentMetersRegion.Esp },
    { label: 'SA', id: CurrentMetersRegion.SA },
    { label: 'Totten', id: CurrentMetersRegion.Totten },
    { label: 'SOFS', id: CurrentMetersRegion.SOFS },
    { label: 'Polynya', id: CurrentMetersRegion.Polynya },
    { label: 'ETas', id: CurrentMetersRegion.ETas },
    { label: 'BMP', id: CurrentMetersRegion.BMP },
    { label: 'Syd', id: CurrentMetersRegion.Syd },
    { label: 'Coffs', id: CurrentMetersRegion.Coffs },
    { label: 'SEQ', id: CurrentMetersRegion.SEQ },
    { label: 'SGBR', id: CurrentMetersRegion.SGBR },
    { label: 'SGBR2', id: CurrentMetersRegion.SGBR2 },
    { label: 'CGBR', id: CurrentMetersRegion.CGBR },
    { label: 'NGBR', id: CurrentMetersRegion.NGBR },
  ];

  const handlePopup = () => setIsPopupOpen(!isPopupOpen);

  const handleRegionOptions = (selectedElement: DropdownElement) => {
    const { id } = selectedElement;

    setSearchParams({ property, depth, region: id, date: date ?? '' });
    setRegion(id as CurrentMetersRegion);
  };

  return (
    <div className="rounded-md bg-white">
      <div className="mb-1">
        <SidebarProductDropdown />
      </div>
      <div className="h-60 w-full overflow-hidden">
        <MiniMap />
      </div>
      <div className="[&>*:last-child]:border-b-0 [&>*]:border-b-2 [&>*]:border-[#e5e7eb]">
        <div className="p-4">
          <div className="flex justify-between">
            <img src={InfoIcon} alt="info icon" className="mr-6 mt-1 h-6 w-6 cursor-pointer object-contain" />
            <TruncateText lines={4} text={prodInfo.summary} />
          </div>
          <div aria-hidden onClick={handlePopup} className="mt-3 flex justify-end">
            <p className="mr-2 cursor-pointer font-semibold text-imos-grey">Read More</p>
            <ArrowWithTail stroke="#787878" className="mt-2 cursor-pointer" />
          </div>
        </div>

        <Popup
          title={'IMOS current meters on coastal and deep water moorings around Australia'}
          body={prodInfo.description}
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
          <CurrentMetersDepthOptions />
        </div>
        <div className="px-4 pb-4">
          <CurrentMetersPropertyOptions />
        </div>
      </div>
    </div>
  );
};

export default CurrentMetersSidebar;
