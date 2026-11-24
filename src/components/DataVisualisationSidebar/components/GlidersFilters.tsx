import React from 'react';
import { Button } from '@/components/Shared';
import { ProductSidebarText } from '@/constants/textConstant';
import { useGliderMission } from '@/services/hooks';
import { GLIDER_PROJECTION_HOURS, TEMPERATURE_SALINITY_TITLE } from '@/services/hooks/useGliderMission';
import { color } from '@/styles/colors';
import CollapsibleSection from './CollapsibleSection';

const GlidersFilters: React.FC = () => {
  const {
    validParams,
    mission,
    windows,
    window,
    selectedFrame,
    setWindow,
    isTemperatureSalinity,
    isProjectedTracks,
    setView,
    selectProjection,
  } = useGliderMission();
  const isProfile = !isTemperatureSalinity && !isProjectedTracks;
  const tsImage = mission?.visualisations.temperature_salinity_image;
  const hasProjections = Object.values(mission?.image_history ?? {}).some((frames) =>
    frames?.some(({ projected_tracks_url }) => projected_tracks_url),
  );

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
      {validParams && (tsImage || isProjectedTracks) && (
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
            {tsImage && (
              <Button
                borderRadius="small"
                type={isTemperatureSalinity ? 'primary' : 'secondary'}
                aria-pressed={isTemperatureSalinity}
                aria-label={TEMPERATURE_SALINITY_TITLE}
                onClick={() => setView('ts')}
              >
                T-S
              </Button>
            )}
          </div>
        </CollapsibleSection>
      )}
      {validParams && !isTemperatureSalinity && windows.length > 0 && (
        <CollapsibleSection title={ProductSidebarText.TIME_WINDOW}>
          <div role="group" aria-label={ProductSidebarText.TIME_WINDOW} className="flex flex-wrap gap-2">
            {windows.map((key) => {
              const isSelected = !isProjectedTracks && key === window;

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
      {validParams && !isTemperatureSalinity && (hasProjections || isProjectedTracks) && (
        <CollapsibleSection title={ProductSidebarText.PROJECTED_TRACKS}>
          <div role="group" aria-label={ProductSidebarText.PROJECTED_TRACKS} className="flex flex-wrap gap-2">
            {Object.entries(GLIDER_PROJECTION_HOURS).map(([key, hours]) => {
              const isSelected = isProjectedTracks && window === key;
              const available = mission?.image_history?.[key]?.some(
                (frame) => frame.date === selectedFrame?.date && frame.projected_tracks_url,
              );
              return (
                <Button
                  key={key}
                  borderRadius="small"
                  type={isSelected ? 'primary' : 'secondary'}
                  aria-pressed={isSelected}
                  disabled={!available}
                  onClick={() => selectProjection(key)}
                >
                  {hours} h
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
