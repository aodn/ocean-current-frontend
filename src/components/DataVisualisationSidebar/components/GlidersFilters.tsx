import React from 'react';
import { Button } from '@/components/Shared';
import { ProductSidebarText } from '@/constants/textConstant';
import { useGliderMission } from '@/services/hooks';
import { TEMPERATURE_SALINITY_TITLE } from '@/services/hooks/useGliderMission';
import { color } from '@/styles/colors';
import CollapsibleSection from './CollapsibleSection';

const GlidersFilters: React.FC = () => {
  const { validParams, mission, windows, window, setWindow, isTemperatureSalinity, isProjectedTracks, setView } =
    useGliderMission();
  const isProfile = !isTemperatureSalinity && !isProjectedTracks;

  return (
    <>
      {validParams && mission && (
        <div role="group" aria-label="Selected mission" className="flex items-center gap-2 px-4 py-3">
          <span aria-hidden="true" className="size-4 shrink-0 rounded-sm" style={{ backgroundColor: color.primary2 }} />
          <div className="min-w-0">
            <div className="text-imos-text-grey text-sm">Selected mission</div>
            <div className="text-imos-dark-grey font-semibold wrap-anywhere">{mission.mission_name}</div>
          </div>
        </div>
      )}
      {validParams && mission?.visualisations.temperature_salinity_image && (
        <CollapsibleSection title={ProductSidebarText.VISUALISATION}>
          <div role="group" aria-label={ProductSidebarText.VISUALISATION} className="flex flex-wrap gap-2">
            <Button
              borderRadius="small"
              type={isProfile ? 'primary' : 'secondary'}
              aria-pressed={isProfile}
              onClick={() => setView('profile')}
            >
              Mission profile
            </Button>
            <Button
              borderRadius="small"
              type={isTemperatureSalinity ? 'primary' : 'secondary'}
              aria-pressed={isTemperatureSalinity}
              aria-label={TEMPERATURE_SALINITY_TITLE}
              onClick={() => setView('ts')}
            >
              T-S
            </Button>
          </div>
        </CollapsibleSection>
      )}
      {validParams && !isTemperatureSalinity && windows.length > 0 && (
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
