import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Dropdown } from '@/components/Shared';
import useCurrentMeterStore, { setDepth, setProperty, setRegion } from '@/stores/current-meters-store/currentMeters';
import { CurrentMetersDepth, CurrentMetersProperty, CurrentMetersRegion } from '@/types/currentMeters';
import { ProductSidebarText } from '@/constants/textConstant';
import { depthOptionsData, propertyOptionsData, regionsOptionsData } from '@/data/current-meter/sidebarOptions';

const CurrentMetersOptions: React.FC = () => {
  const { property, depth, region } = useCurrentMeterStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const date = searchParams.get('date');

  const depthOptions = useMemo(() => {
    if (property === CurrentMetersProperty.vmean || property === CurrentMetersProperty.vrms) {
      return depthOptionsData;
    }

    return [depthOptionsData[0]];
  }, [property]);

  const propertyOptions = useMemo(() => {
    if (depth === CurrentMetersDepth.ONE && !date) {
      return propertyOptionsData;
    }

    return propertyOptionsData.filter(
      (prop) => prop.id === CurrentMetersProperty.vmean || prop.id === CurrentMetersProperty.vrms,
    );
  }, [depth, date]);

  const handleRegionChange = (id: string) => {
    setRegion(id as CurrentMetersRegion);
    setSearchParams({ property, depth, region: id, date: date ?? '' });
  };

  const handleDepthChange = (id: string) => {
    setDepth(id as CurrentMetersDepth);
    setSearchParams({ property, depth: id, region, date: date ?? '' });
  };

  const handlePropertyChange = (id: string) => {
    setProperty(id as CurrentMetersProperty);
    setSearchParams({ property: id, depth, region, date: date ?? '' });
  };

  return (
    <>
      <div className="px-4 pb-4">
        <h3 className="py-2 text-lg font-medium text-imos-grey">{ProductSidebarText.REGION}</h3>
        <Dropdown
          elements={regionsOptionsData}
          selectedId={region}
          showIcons={false}
          onChange={(elem) => handleRegionChange(elem.id)}
          smallDropdown
        />
      </div>

      <div className="px-4 pb-4">
        <h3 className="py-2 text-lg font-medium text-imos-grey">{ProductSidebarText.DEPTH_LAYER}</h3>
        <Dropdown
          elements={depthOptions}
          selectedId={depth}
          onChange={(elem) => handleDepthChange(elem.id)}
          showIcons={false}
          smallDropdown
        />
      </div>

      <div className="px-4 pb-4">
        <h3 className="py-2 text-lg font-medium text-imos-grey">{ProductSidebarText.PROPERTY}</h3>
        <div className="mb-6 mt-2 flex flex-wrap justify-between gap-2">
          {propertyOptions.map(({ title, id }, index) => (
            <div key={id} className={index === propertyOptions.length - 1 ? 'w-auto' : 'flex-1'}>
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
    </>
  );
};

export default CurrentMetersOptions;
