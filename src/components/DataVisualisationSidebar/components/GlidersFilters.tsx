import React from 'react';
import { Button } from '@/components/Shared';
import { ProductSidebarText } from '@/constants/textConstant';
import { useGliderMission } from '@/services/hooks';
import CollapsibleSection from './CollapsibleSection';

const GlidersFilters: React.FC = () => {
  const { validParams, windows, window, setWindow } = useGliderMission();

  return (
    <>
      {validParams && windows.length > 0 && (
        <CollapsibleSection title={ProductSidebarText.TIME_WINDOW}>
          <div role="group" aria-label={ProductSidebarText.TIME_WINDOW} className="flex flex-wrap gap-2">
            {windows.map((key) => {
              const isSelected = key === window;

              return (
                <Button
                  key={key}
                  borderRadius="small"
                  type={isSelected ? 'primary' : 'secondary'}
                  aria-pressed={isSelected}
                  onClick={() => setWindow(key)}
                >
                  <span className={`text-base ${isSelected ? 'text-white' : 'text-imos-text-grey'}`}>
                    {key.replace('d', ' days')}
                  </span>
                </Button>
              );
            })}
          </div>
        </CollapsibleSection>
      )}
    </>
  );
};

export default GlidersFilters;
