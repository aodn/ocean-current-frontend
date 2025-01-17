import React, { useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/Shared';
import useCurrentMeterStore, { setProperty, setDepth, setRegion } from '@/stores/current-meters-store/currentMeters';
import { CurrentMetersProperty, CurrentMetersDepth, CurrentMetersRegion } from '@/types/currentMeters';

interface SectionData {
  title: string;
  id: string;
}

const CurrentMetersPropertyOptions: React.FC = () => {
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

  const propertyData = useMemo(() => {
    const allPropertyData: SectionData[] = [
      { title: 'vmean', id: CurrentMetersProperty.vmean },
      { title: 'vrms', id: CurrentMetersProperty.vrms },
      { title: 'M2', id: CurrentMetersProperty.M2 },
      { title: 'S2', id: CurrentMetersProperty.S2 },
      { title: 'N2', id: CurrentMetersProperty.N2 },
      { title: 'O1', id: CurrentMetersProperty.O1 },
      { title: 'K1', id: CurrentMetersProperty.K1 },
    ];

    if (depth === CurrentMetersDepth.ONE) {
      return allPropertyData;
    }
    return allPropertyData.filter(
      (prop) => prop.id === CurrentMetersProperty.vmean || prop.id === CurrentMetersProperty.vrms,
    );
  }, [depth]);

  const handlePropertyChange = (id: string) => {
    setSearchParams({ property: id, depth, region, date: date ?? '' });
    setProperty(id as CurrentMetersProperty);
  };

  return (
    <>
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
    </>
  );
};

export default CurrentMetersPropertyOptions;
