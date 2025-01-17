import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dropdown } from '@/components/Shared';
import useCurrentMeterStore, { setRegion } from '@/stores/current-meters-store/currentMeters';
import { CurrentMetersRegion } from '@/types/currentMeters';

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

const CurrentMetersRegionOptions: React.FC = () => {
  const { property, depth, region } = useCurrentMeterStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const date = searchParams.get('date');

  const handleRegionOptions = (id: string) => {
    setRegion(id as CurrentMetersRegion);
    setSearchParams({ property, depth, region: id, date: date ?? '' });
  };

  return (
    <>
      <h3 className="py-2 text-lg font-medium text-imos-grey">Region</h3>
      <Dropdown
        elements={regionsOptionsData}
        selectedId={region}
        showIcons={false}
        onChange={(elem) => handleRegionOptions(elem.id)}
        smallDropdown
      />
    </>
  );
};

export default CurrentMetersRegionOptions;
