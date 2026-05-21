import React from 'react';
import { Button } from '@/components/Shared';
import { SubProductOptionsProps } from '../types';

const SubProductOptions: React.FC<SubProductOptionsProps> = ({
  subProducts,
  subProductKey,
  handleSubProductChange,
  disabled,
  disabledKeys,
}) => {
  return (
    <>
      {subProducts.map(({ key, title, path }, index) => {
        const isDisabled = disabled || disabledKeys?.includes(key);
        return (
          <div key={key}>
            <Button
              size={index === subProducts.length - 1 && subProducts.length % 2 !== 0 ? 'auto' : 'full'}
              borderRadius="small"
              type={key === subProductKey ? 'primary' : 'secondary'}
              onClick={() => handleSubProductChange(key, path)}
              disabled={isDisabled}
            >
              <span className={`text-base ${key === subProductKey ? 'text-white' : 'text-imos-text-grey'}`}>
                {title}
              </span>
            </Button>
          </div>
        );
      })}
    </>
  );
};

export default SubProductOptions;
