import { useLayoutEffect, useId, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import GliderDataModeSelect from '@/components/GliderDataModeSelect/GliderDataModeSelect';
import { Button } from '@/components/Shared';
import type { GliderYearmap } from '@/types/gliders';
import { ArrowIcon, CalendarIcon, ResetIcon } from '@/components/Shared/Icons';
import BasicMap from '@/components/Map/BasicMap';
import GlidersDeploymentLayer from '@/components/Map/layers/GlidersDeploymentLayer';
import Loading from '@/components/Shared/Loading/Loading';
import { sharedQueryConfig } from '@/configs/query';
import { resetMapStore } from '@/stores/map-store/mapStore';
import { fetchGliderYearmaps } from '@/services/gliders';
import { buildGliderDeployments, selectGliderYearmap } from '@/utils/gliders-map-utils/deployments';
import GliderTypeSelect from '@/components/GliderTypeSelect/GliderTypeSelect';

const GlidersMap = () => {
  const descriptionId = useId();
  const [params, setParams] = useSearchParams();
  const mode = params.get('mode') === 'delayed' ? 'delayed' : 'nrt';
  const [selection, setSelection] = useState<{ year: number; platform?: GliderYearmap['platform'] }>();
  useLayoutEffect(() => {
    resetMapStore();
  }, []);
  const {
    data: yearmaps,
    isPending,
    isError,
    refetch,
  } = useQuery({
    ...sharedQueryConfig,
    queryKey: ['gliders', 'yearmaps'],
    queryFn: ({ signal }) => fetchGliderYearmaps(signal),
    retry: false,
  });
  const drawableMaps = useMemo(
    () => (yearmaps ?? []).filter((map) => map.deployments.some(({ bbox }) => bbox !== null)),
    [yearmaps],
  );
  const years = [...new Set(drawableMaps.map(({ year }) => year))].sort((a, b) => b - a);
  const selectionMap = useMemo(
    () =>
      selectGliderYearmap(drawableMaps, selection?.year, selection?.platform) ??
      selectGliderYearmap(drawableMaps, selection?.year),
    [drawableMaps, selection],
  );
  const yearmap = useMemo(
    () =>
      selectGliderYearmap(
        drawableMaps.filter(({ is_nrt }) => is_nrt === (mode === 'nrt')),
        selectionMap?.year,
        selectionMap?.platform,
      ),
    [drawableMaps, selectionMap, mode],
  );
  const platforms = [
    ...new Set(drawableMaps.filter(({ year }) => year === selectionMap?.year).map(({ platform }) => platform)),
  ];
  const deployments = useMemo(() => buildGliderDeployments(yearmap?.deployments ?? []), [yearmap]);

  const selectYear = (year: number) => setSelection((prev) => ({ ...prev, year }));
  const yearIndex = years.indexOf(selectionMap?.year ?? 0);

  if (isPending) return <Loading className="min-h-125" />;
  if (isError)
    return (
      <div role="alert">
        <p>Unable to load Gliders deployments.</p>
        <button type="button" className="mt-4 rounded border px-3 py-2" onClick={() => void refetch()}>
          Try again
        </button>
      </div>
    );
  if (!selectionMap) return <p role="status">No deployment areas are available for this map.</p>;

  return (
    <section aria-label="Gliders deployment map" className="min-w-0">
      <GliderDataModeSelect
        value={mode}
        onChange={(mode) =>
          setParams(
            (prev) => {
              const next = new URLSearchParams(prev);
              next.set('mode', mode);
              return next;
            },
            { replace: true },
          )
        }
      />
      <div className="font-open-sans text-imos-dark-grey mb-2 flex w-full flex-wrap items-center gap-2 font-medium md:gap-3">
        <div className="border-imos-calypso-blue/50 flex h-11 min-w-0 grow basis-[calc(100%-4rem)] items-center rounded-md border bg-white md:grow-0 md:basis-80 md:border-none">
          <button
            type="button"
            aria-label="Previous year"
            disabled={yearIndex >= years.length - 1}
            onClick={() => selectYear(years[yearIndex + 1])}
            className="border-imos-calypso-blue/20 flex h-full w-11 shrink-0 cursor-pointer items-center justify-center border-r disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowIcon size="sm" color="imos-deep-blue" className="rotate-90" aria-hidden="true" />
          </button>
          <label className="focus-within:ring-imos-calypso-blue/50 flex h-full min-w-0 flex-1 items-center justify-center gap-3 px-3 focus-within:ring-2 focus-within:ring-inset">
            <span className="sr-only">Year</span>
            <CalendarIcon
              size="lg"
              color="imos-deep-blue"
              aria-hidden="true"
              className="pointer-events-none shrink-0"
            />
            <select
              className="h-full w-16 cursor-pointer appearance-none bg-transparent text-center text-base outline-none"
              value={selectionMap.year}
              onChange={(event) => selectYear(Number(event.target.value))}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            aria-label="Next year"
            disabled={yearIndex <= 0}
            onClick={() => selectYear(years[yearIndex - 1])}
            className="border-imos-calypso-blue/20 flex h-full w-11 shrink-0 cursor-pointer items-center justify-center border-l disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowIcon size="sm" color="imos-deep-blue" className="-rotate-90" aria-hidden="true" />
          </button>
        </div>
        <Button
          onClick={() => selectYear(years.includes(dayjs().year()) ? dayjs().year() : years[0])}
          className="flex-center border-imos-calypso-blue/50 h-11 w-12 shrink-0 rounded-md bg-white p-3! md:border-none md:p-4!"
          aria-label="Reset to current year"
          borderRadius="extraSmall"
        >
          <ResetIcon color="imos-deep-blue" size="lg" aria-hidden="true" />
        </Button>
        <GliderTypeSelect
          key={selectionMap.year}
          platforms={platforms}
          value={selectionMap.platform}
          onChange={(platform) => setSelection({ year: selectionMap.year, platform })}
        />
      </div>
      {selection?.platform && selection.platform !== selectionMap.platform && (
        <p role="status">
          {selection.platform === 'sl' ? 'Slocum' : 'Seaglider'} is unavailable for {selectionMap.year}; showing{' '}
          {selectionMap.platform === 'sl' ? 'Slocum' : 'Seaglider'}.
        </p>
      )}
      {deployments.features.length === 0 ? (
        <p role="status">No deployment areas are available for this map.</p>
      ) : (
        <>
          <p id={descriptionId} className="sr-only">
            {deployments.features.length} highlighted deployment areas on map {yearmap?.id}.
          </p>
          <ul className="sr-only" aria-label="Deployment bounds">
            {yearmap?.deployments.map(({ mission_name, bbox }) =>
              bbox ? (
                <li key={mission_name}>
                  {mission_name}: west {bbox[0]}, south {bbox[1]}, east {bbox[2]}, north {bbox[3]} degrees.
                </li>
              ) : null,
            )}
          </ul>
          <div
            className="h-125 w-full overflow-hidden rounded-md md:h-165"
            role="region"
            aria-label="Interactive Australia deployment map"
            aria-describedby={descriptionId}
          >
            <BasicMap showProductLayers={false}>
              <GlidersDeploymentLayer data={deployments} />
            </BasicMap>
          </div>
        </>
      )}
    </section>
  );
};
export default GlidersMap;
