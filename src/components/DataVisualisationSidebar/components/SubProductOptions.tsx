import React from 'react';
import { Button } from '@/components/Shared';
import { setProductId } from '@/stores/product-store/productStore';
import { useQueryParams } from '@/hooks';
import {
  CurrentMetersDepth,
  CurrentMetersProperty,
  CurrentMetersRegion,
  mooredInstrumentArrayPath,
} from '@/constants/currentMeters';
import { setCurrentMetersDate, setDepth, setProperty, setRegion } from '@/stores/current-meters-store/currentMeters';
import { yearOptionsData } from '@/data/current-meter/sidebarOptions';
import { SubProductOptionsProps } from '../types';

const SubProductOptions: React.FC<SubProductOptionsProps> = ({
  isCurrentMeters,
  subProducts,
  subProductKey,
  mainProductPath,
}) => {
  const { updateQueryParamsAndNavigate } = useQueryParams();

  const handleSubProductChange = (key: string, subProductPath: string) => {
    if (key === subProductKey) {
      return;
    }
    setProductId(key);
    const targetPath = `${mainProductPath}/${subProductPath}`;

    let updateParam = {};
    if (isCurrentMeters && subProductPath !== mooredInstrumentArrayPath) {
      const allTime = yearOptionsData[0].id;

      setRegion(CurrentMetersRegion.Aust);
      setDepth(CurrentMetersDepth.ONE);
      setProperty(CurrentMetersProperty.vrms);
      setCurrentMetersDate(allTime);
      updateParam = {
        region: CurrentMetersRegion.Aust,
        property: CurrentMetersProperty.vrms,
        date: allTime,
        depth: CurrentMetersDepth.ONE,
      };
    }
    updateQueryParamsAndNavigate(targetPath, updateParam);
  };

  return (
    <>
      {subProducts.map(({ key, title, path }, index) => (
        <div key={key}>
          <Button
            size={index === subProducts.length - 1 && subProducts.length % 2 !== 0 ? 'auto' : 'full'}
            borderRadius="small"
            type={key === subProductKey ? 'primary' : 'secondary'}
            onClick={() => handleSubProductChange(key, path)}
          >
            <span className={`text-base ${key === subProductKey ? 'text-white' : 'text-imos-text-grey'}`}>{title}</span>
          </Button>
        </div>
      ))}
    </>
  );
};

export default SubProductOptions;
