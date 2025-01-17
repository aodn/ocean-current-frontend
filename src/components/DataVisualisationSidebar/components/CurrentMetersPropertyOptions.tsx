import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/Shared';
import useCurrentMeterStore, { setProperty } from '@/stores/current-meters-store/currentMeters';
import { CurrentMetersProperty, CurrentMetersDepth } from '@/types/currentMeters';

const allPropertyData = [
  { title: 'vmean', id: CurrentMetersProperty.vmean },
  { title: 'vrms', id: CurrentMetersProperty.vrms },
  { title: 'M2', id: CurrentMetersProperty.M2 },
  { title: 'S2', id: CurrentMetersProperty.S2 },
  { title: 'N2', id: CurrentMetersProperty.N2 },
  { title: 'O1', id: CurrentMetersProperty.O1 },
  { title: 'K1', id: CurrentMetersProperty.K1 },
];

const CurrentMetersPropertyOptions: React.FC = () => {
  const { property, depth, region } = useCurrentMeterStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const urlDate = searchParams.get('date');

  const propertyData = useMemo(() => {
    if (depth === CurrentMetersDepth.ONE && !urlDate) {
      return allPropertyData;
    }

    return allPropertyData.filter(
      (prop) => prop.id === CurrentMetersProperty.vmean || prop.id === CurrentMetersProperty.vrms,
    );
  }, [depth, urlDate]);

  const handlePropertyChange = (id: string) => {
    setProperty(id as CurrentMetersProperty);
    setSearchParams({ property: id, depth, region, date: urlDate ?? '' });
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
