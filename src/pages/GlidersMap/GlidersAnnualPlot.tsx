import { useState, type MouseEvent } from 'react';
import type { GliderYearmap } from '@/types/gliders';
import { resolveGliderResourceUrl } from '@/utils/gliders-map-utils/catalogue';

interface Props {
  yearmap?: GliderYearmap;
  title: string;
  onSelect: (missions: string[]) => void;
}

const GlidersAnnualPlot = ({ yearmap, title, onSelect }: Props) => {
  const [size, setSize] = useState<{ width: number; height: number }>();
  const [expanded, setExpanded] = useState(false);
  const [failed, setFailed] = useState(false);
  const src = resolveGliderResourceUrl(yearmap?.image_url);
  const visibleAreas =
    size && yearmap
      ? yearmap.deployments
          .flatMap(({ mission_name, pixel_rect, plot_pixel_rects }) => [
            { mission_name, rect: pixel_rect, isPlot: false },
            ...(plot_pixel_rects ?? []).map((rect) => ({ mission_name, rect, isPlot: true })),
          ])
          .filter(
            ({ rect: [left, top, right, bottom] }) => left < size.width && top < size.height && right > 0 && bottom > 0,
          )
      : [];

  const selectArea = (event: MouseEvent<HTMLButtonElement>, missionName: string) => {
    if (!event.detail || !size) {
      onSelect([missionName]);
      return;
    }

    const frame = event.currentTarget.parentElement!.getBoundingClientRect();
    const x = ((event.clientX - frame.left) / frame.width) * size.width;
    const y = ((event.clientY - frame.top) / frame.height) * size.height;
    const hits = visibleAreas.filter(
      ({ rect: [left, top, right, bottom] }) => x >= left && x <= right && y >= top && y <= bottom,
    );
    onSelect([missionName, ...hits.map(({ mission_name }) => mission_name)]);
  };

  return (
    <section aria-label="Annual plots">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-imos-deep-blue text-lg font-semibold">{title}</h2>
        {size && !failed && (
          <button
            type="button"
            className="border-imos-calypso-blue/50 text-imos-deep-blue rounded-md border bg-white px-3 py-2"
            onClick={() => setExpanded((expanded) => !expanded)}
          >
            {expanded ? 'Fit figure' : 'Enlarge figure'}
          </button>
        )}
      </div>
      {!src || failed ? (
        <p role="status">
          {failed
            ? 'Unable to load the annual plot for this selection.'
            : 'No annual plot is available for this selection.'}
        </p>
      ) : (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- The enlarged figure scrolls with the keyboard.
        <div className="overflow-auto" role="region" aria-label="Annual figure" tabIndex={expanded ? 0 : undefined}>
          <div
            className={`relative mx-auto overflow-hidden ${expanded ? '' : 'max-w-full'}`}
            style={{ width: size ? size.width * (expanded ? 1.5 : 1) : undefined }}
          >
            <img
              src={src}
              alt={`${title}, with the Australia deployment map, annual time plots and legends`}
              className="block w-full"
              onLoad={({ currentTarget }) =>
                setSize({ width: currentTarget.naturalWidth, height: currentTarget.naturalHeight })
              }
              onError={() => setFailed(true)}
            />
            {size &&
              visibleAreas.map(({ mission_name, rect: [left, top, right, bottom], isPlot }) => (
                <button
                  key={`${mission_name}:${left},${top},${right},${bottom}`}
                  type="button"
                  aria-label={`Select ${isPlot ? 'plot for' : 'deployment'} ${mission_name}`}
                  className="hover:bg-imos-calypso-blue/20 focus-visible:outline-imos-deep-blue absolute cursor-pointer focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2"
                  style={{
                    left: `${(left / size.width) * 100}%`,
                    top: `${(top / size.height) * 100}%`,
                    width: `${((right - left) / size.width) * 100}%`,
                    height: `${((bottom - top) / size.height) * 100}%`,
                  }}
                  onClick={(event) => selectArea(event, mission_name)}
                />
              ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default GlidersAnnualPlot;
